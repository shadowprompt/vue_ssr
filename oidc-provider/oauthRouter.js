const router = require('express').Router();
const querystring = require('querystring');
const { Provider } = require('oidc-provider');
const base64url = require('oidc-provider/lib/helpers/base64url');
const axios = require('axios')
const bodyParser = require('body-parser');
const assert = require('assert');
const {DAOZHAO_OAUTH_URL, DAOZHAO_CLIENT_ID, DAOZHAO_CLIENT_SECERT, DAOZHAO_CLIENT_REDIRECT_URIS, DAOZHAO_CLIENT_CODE_VERIFIER, DAOZHAO_CLIENT_CODE_CHALLENGE} = require('../../config/index')
const AccountService = require('./accountService');

const adapter = require('./memoryAdaper');

function setNoCache(req, res, next) {
  res.set('Pragma', 'no-cache');
  res.set('Cache-Control', 'no-cache, no-store');
  next();
}
const parse = bodyParser.urlencoded({ extended: false });

function oauthRouter(basePath, port) {
  const BASE_URL = process.env.NODE_ENV === 'production' ? DAOZHAO_OAUTH_URL : 'http://localhost:' + port;
  const configuration = {
    // ... see the available options in Configuration options section
    claims: {
      email: ['user_email'],
      profile: ['user_login', 'user_nicename', 'user_url', 'preferred_username', 'user_registered', 'display_name']
    },
    claimsSupported: ['user_login', 'user_nicename', 'user_url', 'preferred_username', 'user_registered', 'display_name', 'user_email'],
    clients: [
      {
        client_id: DAOZHAO_CLIENT_ID,
        client_secret: DAOZHAO_CLIENT_SECERT,
        redirect_uris: DAOZHAO_CLIENT_REDIRECT_URIS.map(item => BASE_URL + basePath + item),
        code_verifier: DAOZHAO_CLIENT_CODE_VERIFIER,
        code_challenge: DAOZHAO_CLIENT_CODE_CHALLENGE,
      }
    ],
    adapter,
    async findAccount(ctx, id) {
      return {
        accountId: id,
        async claims(use, scope) {
          console.log('findAccount claims -> ', use, scope, id);
          const list = await AccountService.queryAccount({
            ID: id,
          });
          console.log('findAccount list -> ', list.length);
          if (!list || !list.length) {
            return undefined;
          }
          const [user] = list;
          console.log('findAccount user -> ', user);
          return {
            sub: id,
            ...user
          };
        },
      };
    },
  };

  const oidc = new Provider(BASE_URL, configuration);

  router.get('/interaction/:uid', setNoCache, async (req, res, next) => {
    try {
      const details = await oidc.interactionDetails(req, res);
      console.log('see what else is available to you for interaction views', details);
      const {
        uid, prompt, params,
      } = details;

      const client = await oidc.Client.find(params.client_id);

      if (prompt.name === 'login') {
        return res.render('login', {
          client,
          uid,
          details: prompt.details,
          params,
          title: 'Sign-in',
          flash: undefined,
        });
      }

      return res.render('interaction', {
        client,
        uid,
        details: prompt.details,
        params,
        title: 'Authorize',
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/interaction/:uid/login', setNoCache, parse, async (req, res, next) => {
    try {
      const { uid, prompt, params } = await oidc.interactionDetails(req, res);
      assert.strictEqual(prompt.name, 'login');
      const client = await oidc.Client.find(params.client_id);
      // 加入真实的数据校验
      const accountId = await AccountService.authenticate(req.body.email, req.body.password);

      if (!accountId) {
        res.render('login', {
          client,
          uid,
          details: prompt.details,
          params: {
            ...params,
            login_hint: req.body.email,
          },
          title: 'Sign-in',
          flash: 'Invalid email or password.',
        });
        return;
      }

      const result = {
        login: { accountId },
      };

      await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      next(err);
    }
  });

  router.post('/interaction/:uid/confirm', setNoCache, parse, async (req, res, next) => {
    try {
      const interactionDetails = await oidc.interactionDetails(req, res);
      const { prompt: { name, details }, params, session: { accountId } } = interactionDetails;
      assert.strictEqual(name, 'consent');

      let { grantId } = interactionDetails;
      let grant;

      if (grantId) {
        // we'll be modifying existing grant in existing session
        grant = await oidc.Grant.find(grantId);
      } else {
        // we're establishing a new grant
        grant = new oidc.Grant({
          accountId,
          clientId: params.client_id,
        });
      }

      if (details.missingOIDCScope) {
        grant.addOIDCScope(details.missingOIDCScope.join(' '));
        // use grant.rejectOIDCScope to reject a subset or the whole thing
      }
      if (details.missingOIDCClaims) {
        grant.addOIDCClaims(details.missingOIDCClaims);
        // use grant.rejectOIDCClaims to reject a subset or the whole thing
      }
      if (details.missingResourceScopes) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [indicator, scopes] of Object.entries(details.missingResourceScopes)) {
          grant.addResourceScope(indicator, scopes.join(' '));
          // use grant.rejectResourceScope to reject a subset or the whole thing
        }
      }

      grantId = await grant.save();

      const consent = {};
      if (!interactionDetails.grantId) {
        // we don't have to pass grantId to consent, we're just modifying existing one
        consent.grantId = grantId;
      }

      const result = { consent };
      await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: true });
    } catch (err) {
      next(err);
    }
  });

  router.get('/interaction/:uid/abort', setNoCache, async (req, res, next) => {
    try {
      const result = {
        error: 'access_denied',
        error_description: 'End-User aborted interaction',
      };
      await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } catch (err) {
      next(err);
    }
  });

  router.get('/callback', (req, res) => {
    const data = {
      code: req.query.code,
      code_verifier: DAOZHAO_CLIENT_CODE_VERIFIER,
      grant_type: 'authorization_code',
      client_id: DAOZHAO_CLIENT_ID,
      redirect_uri: configuration.clients[0].redirect_uris[0],
    };
    axios.post(`${BASE_URL}${basePath}/token`, querystring.stringify(data), {
      headers: {
        authorization: `Basic ${base64url.encode(`${DAOZHAO_CLIENT_ID}:${DAOZHAO_CLIENT_SECERT}`)}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
    }).then((result) => {
      console.log(result.data);
      const accessToken = result.data.access_token;
      // 利用access_token获取profile
      axios.post(`${BASE_URL}${basePath}/me`, querystring.stringify({
        access_token: accessToken,
      })).then(result2 => {
        res.send(result2.data);
      });
    }).catch((err) => {
      console.log('callback err -> ', err.message, err.response && err.response.data && err.response.data.error);
      if (err.response && err.response.data) {
        console.log('callback err response -> ', err.response.data.error, ':', err.response.data.error_description);
      }
      res.send('error');
    });
  });

  router.use(async (...rest) => {
    // await mongodbAdapter.connect();
    return oidc.callback()(...rest)
  })

  return router;
}

module.exports = oauthRouter;

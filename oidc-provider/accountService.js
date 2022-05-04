const axios = require('axios');
const assert = require('assert');
const wordpressHashNode = require('wordpress-hash-node');

class AccountService {
  static queryAccount(fields) {
    const url = 'https://gateway.daozhao.com.cn/daozhao/searchUser';
    return axios.post(url, {
      fields,
    }).then(res => {
      return (res.data && res.data.list) || [];
    })
  }
  // This interface is required by oidc-provider
  static async findAccount(ctx, id) {
    // This would ideally be just a check whether the account is still in your storage
    // const account = db.get('users').find({ id }).value();
    const list = await this.queryAccount({
      ID: id,
    });
    console.log('findAccount list -> ', list.length);
    if (!list || !list.length) {
      return undefined;
    }
    return {
      accountId: id,
      // and this claims() method would actually query to retrieve the account claims
      async claims() {
        const [user] = list;
        console.log('findAccount user -> ', user);
        return user;
      },
    };
  }

  // This can be anything you need to authenticate a user
  static async authenticate(email, password) {
    return this.queryAccount({
      user_email: email,
    }).then((list) => {
      const [user] = list.filter(item => wordpressHashNode.CheckPassword(password, item.user_pass));
      assert(user, 'invalid credentials provided');
      // accountId需要是字符型
      return user.ID + '';
    }).catch(err => {
      console.log('authenticate error -> ', err);
    })
  }
}

module.exports = AccountService;

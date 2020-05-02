<!--<template>-->
<!--  <div class="post-content-container">-->
<!--    <section-->
<!--      class="post-detail-item anim"-->
<!--      :class="isLoading ? 'in' : ''"-->
<!--    >-->
<!--      <h1>{{ detail.post_title }}</h1>-->
<!--      <article v-html="briefContent"></article>-->
<!--      <prev-next></prev-next>-->
<!--    </section>-->
<!--  </div>-->
<!--</template>-->

<script>
import { mapState } from 'vuex';
import queryStr from '../schema/detail';
import queryPrevNextStr from '../schema/prevNext';
import queryRelatedStr from '../schema/related';
import { httpSuccess, timeStampFormat} from '../utils';
import { config } from '../config';
// import PrevNext from '../components/detail/PrevNext';

export default {
  name: 'postDetail',
  componentName: '$detail',
  components: {
    // PrevNext,
  },
  data() {
    return {
      hookArr: [],
    };
  },
  computed: {
    ...mapState(['isLoading', 'detail']),
    briefContent() {
      return this.detail.post_content;
    },
  },
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('_getDetail', {
      query: queryStr,
      variables: {
        id: route.params.id,
      },
    }).then((result) => {
      if (httpSuccess(result)) {
        const data = result.data.data.data || {};
        const postDate = data.post_date;
        const ID = data.ID;
        const [firstTag, secondTag = firstTag] = data.tags || [];
        if (postDate) {
          store.dispatch('_getPrevNext', {
            query: queryPrevNextStr,
            variables: {
              post_date: postDate * 1, // 需要变成数值型的时间戳
            }
          });
        }
        store.dispatch('_getRelated', {
          query: queryRelatedStr,
          variables: {
            id: ID,
            tags: [firstTag.term_id, secondTag.term_id],
            limit: 6,
          }
        });
      }
    });
  },
  render(h) {
    return h('div', {
      class: {
        'post-content-container': true,
      },
    }, [h('section', {
      class: {
        "post-detail-item anim": true,
        "in": this.isLoading,
      }
    }, [
      h('a', {
        domProps: {
          href: `${config.URL}/${this.detail.ID}.html`,
          className: 'post-title'
        }
      }, [h('h1', [this.detail.post_title])]),
      h('tip', {
        props: {
          data: this.detail,
        }
      }),
      h('article', {
        domProps: {
          'innerHTML': this.briefContent,
        }
      }),
      h('div', {
        class: {
          'up-bottom-marin10': true,
        }
      }, [h('post-categories', {
        props: {
          text: '分类：',
          data: this.detail.categories,
        }
      })]),
      h('div', {
        class: {
          'up-bottom-marin10': true,
        }
      }, [h('post-tags', {
        props: {
          text: '标签：',
          data: this.detail.tags,
        }
      })]),
      h('div', {
        class: {
          'up-bottom-marin10': true,
        }
      }, [
        h('span', ['更新时间：']),
        h('post-time', {
          props: {
            date: this.detail.date,
            dateUrl: this.detail.dateUrl,
          }
        })
      ]),
      ...this.hooks(h),
    ]), h('related-block')])
  },
  created() {
    this.hookArr.push('prev-next');
  },
  mounted() {
    // 确保每次打开请求时从头开始看
    const top = document.querySelector('.top-header');
    top && top.scrollIntoView(true);
  },
  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      next(); // 避免loading效果过快消失
    }, 400);
  },
  methods: {
    hooks(h) {
      return this.hookArr.map(item => h(item));
    }
  }
};
</script>

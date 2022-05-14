<template>
  <div class="card-container">
    <div class="row">
      <div class="col-md-12">
        <h3 class="title text-center">{{content.title}}</h3>
        <div class="row" :key="index" v-for="(row, index) in content.list">
          <div class="col-md-4" :key="item.href" v-for="item in row">
            <div class="card card-blog">
              <div class="block-content">
                <Ad v-if="item._isAd" :type="item.type"/>
                <template v-else>
                  <h4 class="card-title">
                    <a class="blog-item-title-link" :href="item.href" :title="item.title" rel="bookmark">
                      {{item.title}}
                    </a>
                  </h4>
                  <p class="card-description">{{item.content}}<a class="moretag" :href="item.href"> 阅读更多…</a></p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Ad from './Ad';
  export default {
    name: 'Card',
    props: {
      content: {
        required: true,
        type: [Object],
      }
    },
    components: {
      Ad,
    }
  }
</script>

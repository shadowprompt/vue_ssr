<template>
  <div class="card-container">
    <div class="row">
      <div class="col-md-12">
        <h2 class="title text-center">{{content.title}}</h2>
        <div class="row" v-for="row in content.list">
          <div class="col-md-4" v-for="item in row">
            <div class="card card-blog">
              <div class="block-content">
                <h4 class="card-title">
                  <a class="blog-item-title-link" :href="item.href" title="Javascript去除内容格式并匹配模板格式粘贴" rel="bookmark">
                    {{item.title}}
                  </a>
                </h4>
                <p class="card-description">{{item.content}}<a class="moretag" :href="item.href"> 阅读更多…</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      content: {
        required: true,
        type: [Object],
      }
    },
  }
</script>

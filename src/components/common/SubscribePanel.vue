<template>
  <section class="subscribe-container">
    <h5 class="title">订阅通知</h5>
    <div class="content">道招网更新文章时会发送通知</div>
    <div class="sub_area">
      <div :class="'sub_btn ' + subscribeStatus" @click="this.handleNotifyClick">{{subscribeStatusText}}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SubscribePanel',
  data() {
    return {
      isSubscribed: void 0,
    }
  },
  computed: {
    subscribeStatus() {
      if (this.isSubscribed === void 0) {
        return ''
      } else if (this.isSubscribed) {
        return 'subscribed';
      } else {
        return 'unsubscribed';
      }
    },
    subscribeStatusText() {
      if (this.isSubscribed) {
        return '已订阅';
      } else {
        return '订阅';
      }
    }
  },
  mounted() {
    this.$eventBus.$on('subscribeStatus', this.handleScribeStatus);
  },
  beforeMount() {
    this.$eventBus.$off('subscribeStatus', this.handleScribeStatus);
  },
  methods: {
    handleScribeStatus(value) {
      this.isSubscribed = value;
    },
    handleNotifyClick() {
      this.$eventBus.$emit('subscribe');
    },
  }
}
</script>

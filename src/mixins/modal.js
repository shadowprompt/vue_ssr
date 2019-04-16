export default {
  computed: {
    getModal() {
      const oldDom = document.querySelector('.modal');
      if(!oldDom){
        const dom = document.createElement('div');
        return dom;
      }
      return oldDom;
    },
  },
  method: {
    openModal() {

    }
  }
}

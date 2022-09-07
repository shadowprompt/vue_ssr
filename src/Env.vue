<script>
import Firebase from './Firebase';
export default {
  name: 'Env',
  render(h) {
    if (typeof window === 'undefined') {
      return h('div', ['fail'])
    } else {
      return h(Firebase, ['ok'])
    }
  }
}
</script>

<script>
import noImage from '../assets/no-image.svg';


export default {
  props: {
    path: {
      type: String,
      default: null,
    },
    asGetter: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    source() {
      return this.path
        ? `https://image.tmdb.org/t/p/w500${this.path}`
        : noImage;
    },
  },
  render(h) {
    try {
      if (this.asGetter) {
        return this.$scopedSlots.default({
          source: this.source,
        })[0];
      }
      return h('img', {
        attrs: {
          src: this.source
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
</script>

<style>
</style>
<script>
import { mapActions, mapGetters } from "vuex";
import RenderLessMixin from "../../mixins/RenderLessMixin";

export default {
  mixins: [RenderLessMixin],
  props: {
    reachedBottom: {
      type: Boolean,
      default: false
    },
    query: {
      type: String,
      default: ""
    }
  },
  watch: {
    query: {
      immediate: true,
      async handler(query) {
        await this.fetchMovies({
          query
        });
      }
    },
    async reachedBottom(reachedBottom) {
      if (!reachedBottom) {
        return;
      }
      await this.fetchMovies({
        query: this.query,
        isNextPage: true
      });
    },
    async isLoaded(isLoaded) {
      this.$emit('loaded');
    },
  },
  computed: {
    ...mapGetters('moviesSearch', ['getFetchingStatus']),
    fetchingStatus() {
      return this.getFetchingStatus(this.query);
    },
    isLoaded() {
      return this.fetchingStatus === 'success';
    },
  },
  methods: {
    ...mapActions("moviesSearch", ["fetchMovies"]),
  },
};
</script>
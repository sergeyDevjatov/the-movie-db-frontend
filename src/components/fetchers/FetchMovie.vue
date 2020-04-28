<script>
import { mapActions, mapGetters } from "vuex";
import RenderLessMixin from "../../mixins/RenderLessMixin";

export default {
  mixins: [RenderLessMixin],
  props: {
    movieId: {
      type: Number,
      default: null,
    },
  },
  watch: {
    movieId: {
      immediate: true,
      async handler(movieId) {
        if(movieId === null) {
          return;
        }
        await this.fetchMovie({
          movieId,
          isForce: true,
        });
      },
    },
  },
  methods: {
    ...mapActions("movies", ["fetchMovie"]),
  },
};
</script>
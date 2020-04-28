<script>
import { mapActions } from 'vuex';
import RenderLessMixin from '../../mixins/RenderLessMixin';

export default {
  mixins: [RenderLessMixin],
  async mounted() {
    await this.fetchGenres();
  },
  methods: {
    ...mapActions('genres', ['fetchGenres'])
  },
};
</script>
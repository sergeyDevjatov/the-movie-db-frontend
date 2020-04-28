<script>
import { mapGetters } from 'vuex';

import RenderLessMixin from '../../mixins/RenderLessMixin';


export default {
    mixins: [
        RenderLessMixin,
    ],
    props: {
        query: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapGetters('moviesSearch', [
            'getFoundMovieIds',
        ]),
        movieIds() {
            return this.getFoundMovieIds(this.query);
        },
        scope() {
            return {
                movieIds: this.movieIds,
            };
        },
    },
}
</script>
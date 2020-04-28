<script>
import { mapGetters } from 'vuex';

import RenderLessMixin from '../../mixins/RenderLessMixin';


export default {
    mixins: [
        RenderLessMixin,
    ],
    props: {
        movieId: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapGetters('movies', [
            'getMovie',
        ]),
        movie() {
            return this.getMovie(this.movieId);
        },
        scope() {
            return {
                movie: this.movie,
            };
        },
    },
}
</script>
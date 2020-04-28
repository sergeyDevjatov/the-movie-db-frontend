<script>
import { mapGetters } from 'vuex';

import RenderLessMixin from '../../mixins/RenderLessMixin';


export default {
    mixins: [
        RenderLessMixin,
    ],
    props: {
        genreId: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapGetters('genres', [
            'getGenre',
        ]),
        genre() {
            return this.getGenre(this.genreId);
        },
        scope() {
            return {
                genre: this.genre,
            };
        },
    },
}
</script>
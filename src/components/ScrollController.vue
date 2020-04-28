<script>
import RenderLessMixin from '../mixins/RenderLessMixin';


export default {
    mixins: [
        RenderLessMixin,
    ],
    data() {
        return {
            reachedBottom: false,
        };
    },
    computed: {
        scope() {
            return {
                reachedBottom: this.reachedBottom,
                loadedHandler: this.loadedHandler,
            };
        },
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler);
    },
    methods: {
        async scrollHandler() {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            this.reachedBottom = false;

            await this.$nextTick();

            this.reachedBottom = scrollHeight - (scrollTop + clientHeight) < 500; 
        },
        loadedHandler() {
            this.scrollHandler();
        },
    },
}
</script>
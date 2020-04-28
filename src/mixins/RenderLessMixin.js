export default {
    computed: {
        scope() {
            return null;
        },
    },
    render() {
        try {
            if(this.scope) {
                return this.$scopedSlots.default(this.scope)[0];
            }
            return this.$slots.default[0];
        } catch (error) {
            console.error(error);
            return null;
        }
    },
}
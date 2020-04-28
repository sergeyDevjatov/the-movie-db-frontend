<template>
  <scroll-controller>
    <template #default="{ reachedBottom }">
      <fetch-movies
        :reached-bottom="reachedBottom"
        :query="query"
      >
        <movies-grid
          :query="query"
          class="grid"
        />
      </fetch-movies>
    </template>
  </scroll-controller>
</template>

<script>
import MoviesGrid from '@/components/movies-grid/MoviesGrid.vue';
import FetchMovies from '@/components/fetchers/FetchMovies.vue';
import ScrollController from '@/components/ScrollController.vue';
import { mapActions, mapGetters } from 'vuex';


export default {
  components: {
    MoviesGrid,
    FetchMovies,
    ScrollController,
  },
  computed: {
    ...mapGetters('moviesSearch', ['lastQuery']),
    query() {
      return this.$route.query.query;
    },
  },
  methods: {
    ...mapActions('moviesSearch', ['updateLastQuery']),
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(vm.lastQuery) {

        next({
          ...to,
          query: {
            query: vm.lastQuery,
          },
        });

        vm.updateLastQuery({
          query: null,
        });
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    this.updateLastQuery({
      query: this.query,
    });
    next();
  },
}
</script>

<style scoped>
.grid {
  max-width: 1000px;
  margin: auto;
  padding: 10px;
}
</style>

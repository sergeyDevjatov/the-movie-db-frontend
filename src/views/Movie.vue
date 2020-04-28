<template>
  <fetch-movie
    :movie-id="movieId"
  >
    <movie-information
      :movie-id="movieId" 
    />
  </fetch-movie>
</template>

<script>
import FetchMovie from '@/components/fetchers/FetchMovie.vue';
import MovieInformation from '@/components/movie-information/MovieInformation.vue';


export default {
  components: {
    FetchMovie,
    MovieInformation,
  },
  computed: {
    movieId() {
      const movieId = Number.parseInt(this.$route.params.movieId);
      return (!isNaN(movieId) && isFinite(movieId))
        ? movieId
        : null;
    },
  },
}
</script>

<style scoped>
</style>

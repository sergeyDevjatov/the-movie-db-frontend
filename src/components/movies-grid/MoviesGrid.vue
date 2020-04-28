<template>
  <get-movie-ids
    :query="query"
  >
    <template #default="{ movieIds }">
      <div class="grid">
        <movies-grid-card
          v-for="movieId in movieIds"
          :key="movieId"
          :movie-id="movieId"
        />
      </div>
    </template>
  </get-movie-ids>
</template>

<script>
import MoviesGridCard from './MoviesGridCard';
import GetMovieIds from '../getters/GetMovieIds';


export default {
  components: {
    MoviesGridCard,
    GetMovieIds,
  },
  props: {
    query: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
    grid-template-columns: 1fr;
  grid-gap: 5px;
}

@media screen and (min-width: 420px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 650px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 1050px) {
  .grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

</style>
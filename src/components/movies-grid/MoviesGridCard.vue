<template>
  <get-movie :movie-id="movieId">
    <template #default="{ movie }">
      <router-link :to="link">
        <article class="card">
          <movie-poster class="picture" :path="movie.poster_path || movie.backdrop_path"/>
          <div class="content base">
            <h3 class="title">{{shortTitle(movie.title)}}</h3>
          </div>
          <div class="content additional">
            <div class="genres">
              <template v-for="genreId in movie.genre_ids">
                <get-genre :key="genreId" :genre-id="genreId">
                  <template #default="{ genre }">
                    <div class="genre">{{genre}}</div>
                  </template>
                </get-genre>
              </template>
            </div>
          </div>
        </article>
      </router-link>
    </template>
  </get-movie>
</template>

<script>
import GetMovie from "../getters/GetMovie";
import GetGenre from "../getters/GetGenre";
import MoviePoster from "../MoviePoster";

export default {
  components: {
    GetGenre,
    GetMovie,
    MoviePoster
  },
  props: {
    movieId: {
      type: Number,
      required: true
    }
  },
  computed: {
    link() {
      return {
        name: 'movie',
        params: {
          movieId: this.movieId
        },
      };
    }
  },
  methods: {
    shortTitle(title) {
      const maxSize = 40;
      return title.length > maxSize
        ? title.slice(0, maxSize - 3) + "..."
        : title;
    }
  }
};
</script>

<style scoped>
.card {
  position: relative;
}

.card::after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.base {
  opacity: 1;
  transition: opacity 0.3s;
}

.additional {
  opacity: 0;
  transition: opacity 0.3s;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
}

.card:hover .additional {
  opacity: 1;
}

.card:hover .base {
  opacity: 0;
}

.title {
  font-weight: 600;
  color: #ffffff;
  text-shadow: 1px 1px 1px #000;
  margin: 0;
  text-align: right;
}

.genre {
  font-weight: 500;
  color: #ffffff;
}

.genres {
  display: flex;
  flex-flow: column nowrap;
  margin-top: auto;
  align-items: flex-start;
  margin-top: auto;
}

@media screen and (max-width: 500px) {
  .base {
    background: rgba(0, 0, 0, 0.3);
    opacity: 1;
  }
  .additional {
    background: none;
  }
  .base,
  .additional,
  .card:hover .base,
  .card:hover .additional {
    opacity: 1;
  }
}
</style>
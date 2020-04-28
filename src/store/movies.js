import api from '../api/api';


export default {
  namespaced: true,
  state: {
    moviesById: {},
    fetchingStatusesById: {},
  },
  mutations: {
    setMoviesById(state, {
      moviesById,
    }) {
      state.moviesById = moviesById;
    },
    setFetchingStatusesById(state, {
      fetchingStatusesById,
    }) {
      state.fetchingStatusesById = fetchingStatusesById;
    },
  },
  actions: {
    addMovies({ state, commit }, {
      movies,
    }) {
      const moviesById = { ...state.moviesById };

      for (let movie of movies) {
        moviesById[movie.id] = {...(moviesById[movie.id] ?? {}), ...movie};
      }

      commit('setMoviesById', {
        moviesById,
      });
    },
    async fetchMovie({ dispatch, getters }, {
      movieId,
      isForce,
    }) {
      if(!isForce && getters['getMovie'](movieId) !== null) {
        return;
      }
      const updateStatus = (status) => dispatch('updateFetchingStatus', {
        movieId,
        status,
      });

      try {
        updateStatus('fetching');

        const response = await api.getMovie({
          id: movieId,
        });

        dispatch('addMovies', {
          movies: [response.data],
        });

        updateStatus('success');
      } catch (error) {
        updateStatus('error');
      }
    },
    updateFetchingStatus({ state, commit }, {
      id,
      status,
    }) {
      commit('setFetchingStatusesById', {
        fetchingStatusesById: {
          ...state.fetchingStatusesById,
          [id]: status,
        },
      });
    },
  },
  getters: {
    getMovie: state => id => state.moviesById[id] ?? null,
    getFetchingStatus: state => id => state.fetchingStatusesById[id] ?? null,
  },
};

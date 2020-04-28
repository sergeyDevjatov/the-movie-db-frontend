import api from '../api/api';

function normalizeQuery(query) {
  return (query && query.trim()) ?? '';
}

export default {
  namespaced: true,
  state: {
    foundMovieIdsByQuery: {
    },
    fetchingStatusesByQuery: {
    },
    paginationByQuery: {
    },
    lastQuery: null,
  },
  mutations: {
    setFoundMovieIdsByQuery(state, {
      foundMovieIdsByQuery,
    }) {
      state.foundMovieIdsByQuery = foundMovieIdsByQuery;
    },
    setFetchingStatusesByQuery(state, {
      fetchingStatusesByQuery,
    }) {
      state.fetchingStatusesByQuery = fetchingStatusesByQuery;
    },
    setPaginationByQuery(state, {
      paginationByQuery,
    }) {
      state.paginationByQuery = paginationByQuery;
    },
    setLastQuery(state, {
      lastQuery,
    }) {
      state.lastQuery = lastQuery;
    },
  },
  actions: {
    async fetchMovies({ commit, getters, dispatch }, {
      query,
      isNextPage,
    }) {
      const updateFetchingStatus = (fetchingStatus) => 
        dispatch('updateFetchingStatus', {
          query,
          fetchingStatus,
        });

      const _query =  normalizeQuery(query);

      const fetchingStatus = getters['getFetchingStatus'](_query);

      if(fetchingStatus === 'fetching') {
        return;
      }

      const lastLoadedPage = isNextPage && getters['getLastLoadedPage'](_query) || 0;
      const page = lastLoadedPage + 1;

      try {
        updateFetchingStatus('fetching');

        const requestMethod = _query
          ? api.searchMovies
          : api.discoverMovies;

        const requestData = {
          page,
          ..._query
            ? { query: _query }
            : {}
        };

        const response = await requestMethod(requestData);
        const gotMovies = response.data.results;

        dispatch('movies/addMovies', {
          movies: gotMovies,
        }, { root: true });

        const updateMovieIdsActionName = isNextPage
          ? 'addMovieIds'
          : 'updateMovieIds';

        dispatch(updateMovieIdsActionName, {
          query: _query,
          movieIds: gotMovies.map(({ id }) => id),
        });

        dispatch('updatePagination', {
          query: _query,
          pagination: {
            lastLoadedPage: response.data.page,
            totalPagesCount: response.data.total_pages,
          },
        });

        updateFetchingStatus('success');
      } catch (error) {
        updateFetchingStatus('error');
      }
    },
    updateMovieIds({ state, commit }, {
      query,
      movieIds,
    }) {
      commit('setFoundMovieIdsByQuery', {
        foundMovieIdsByQuery: {
          ...state.foundMovieIdsByQuery,
          [query]: movieIds,
        },
      });
    },
    addMovieIds({ state, dispatch }, {
      query,
      movieIds,
    }) {
      dispatch('updateMovieIds', {
        query,
        movieIds: (state.foundMovieIdsByQuery[query] ?? []).concat(movieIds),
      });
    },
    updateFetchingStatus({ state, commit }, {
      query,
      fetchingStatus,
    }) {
      const _query =  normalizeQuery(query);

      commit('setFetchingStatusesByQuery', {
        fetchingStatusesByQuery: {
          ...state.fetchingStatusesByQuery,
          [_query]: fetchingStatus,
        },
      });
    },
    updatePagination({ state, commit }, {
      query,
      pagination,
    }) {
      const _query =  normalizeQuery(query);

      commit('setPaginationByQuery', {
        paginationByQuery: {
          ...state.paginationByQuery,
          [_query]: {
            ...(state.paginationByQuery[_query] ?? {}),
            ...pagination,
          },
        },
      });
    },
    updateLastQuery({ commit }, {
      query,
    }) {
      commit('setLastQuery', {
        lastQuery: query,
      });
    },
  },
  getters: {
    lastQuery: state => state.lastQuery,
    getFoundMovieIds: state => query =>
      state.foundMovieIdsByQuery[query] ?? [],
    getFetchingStatus: state => query =>
      state.fetchingStatusesByQuery[query] ?? null,
    getPagination: state => query =>
      state.paginationByQuery[query] ?? null,
    getLastLoadedPage: (_, getters) => query =>
      getters['getPagination'](query)?.lastLoadedPage ?? null,
    getTotalPagesCount: (_, getters) => query =>
      getters['getPagination'](query)?.totalPagesCount ?? null,
  },
}

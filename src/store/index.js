import Vue from 'vue';
import Vuex from 'vuex';

import genres from './genres';
import movies from './movies';
import moviesSearch from './moviesSearch';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    genres,
    movies,
    moviesSearch,
  },
})

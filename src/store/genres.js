import api from '../api/api';


export default {
    namespaced: true,
    state: {
        genres: {},
    },
    mutations: {
        setGenres(state, {
            genres,
        }) {
            state.genres = genres;
        },
    },
    actions: {
        async fetchGenres({ commit }) {
            try {
                const { data: { genres: gotGenres } } = await api.getGenres();

                const genres = {};

                for(let genre of gotGenres) {
                    genres[genre.id] = genre.name;
                }

                commit('setGenres', {
                    genres,
                });
            } catch (error) {

            }
        },
    },
    getters: {
        getGenre: state => genreId =>
            state.genres[genreId] ?? null,
    },
}
import instance from './instance';


export default {
    discoverMovies({ page }) {
        return instance.get('/discover/movie', {
            params: {
                page: page ?? 1,
            },
        });
    },
    searchMovies({ query, page }) {
        return instance.get('/search/movie', {
            params: {
                query,
                page: page ?? 1,
            },
        });
    },
    getMovie({ id }) {
        return instance.get('/movie/' + id);
    },
    getGenres() {
        return instance.get('/genre/movie/list');
    },
}
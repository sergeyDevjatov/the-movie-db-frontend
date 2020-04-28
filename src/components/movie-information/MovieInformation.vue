<template>
    <get-movie
        :movie-id="movieId"
    >
        <template #default="{ movie }">
            <div
                v-if="movie"
                class="movie"
            >
                <movie-poster
                    :path="movie.backdrop_path"
                    as-getter
                >
                    <template #default="{ source }">
                        <div
                            :style="{'--heading-background-url': `url(${source})`}"
                            class="heading"
                        >
                            <div class="heading-content">
                                <h1 class="title">{{movie.title}}</h1>
                                <div
                                    v-if="movie.tagline"
                                    class="tagline-container"
                                >
                                    <p class="tagline">{{movie.tagline}}</p>
                                </div>
                                <span
                                    v-if="movie.adult"
                                    class="adult"
                                >
                                    18+
                                </span>
                            </div>
                        </div>
                    </template>
                </movie-poster>
                <div class="poster-and-information">
                    <movie-poster
                        :path="movie.poster_path"
                        class="poster"
                    />
                    <div class="information">
                        <div class="overview information-row">
                            {{movie.overview}}
                        </div>
                        <div
                            v-if="movie.genres"
                            class="information-row"
                        >
                            <h3 class="information-row-title">Genres:</h3>
                            <div class="information-row-value">
                                {{movie.genres.map(({ name }) => name).join(', ')}}
                            </div>
                        </div>
                        <div
                            v-if="movie.vote_average"
                            class="information-row"
                        >
                            <h3 class="information-row-title">Rating:</h3>
                            <span class="information-row-value">
                                {{movie.vote_average}}
                            </span>
                        </div>
                        <div
                            v-if="movie.release_date"
                            class="information-row"
                        >
                            <h3 class="information-row-title">{{releasedLabel(movie.release_date)}}:</h3>
                            <span class="information-row-value">
                                {{formatReleaseDate(movie.release_date)}}
                            </span>
                        </div>
                        <div
                            v-if="movie.production_companies && movie.production_companies.length"
                            class="information-row"
                        >
                            <h3 class="information-row-title">Companies:</h3>
                            <div class="information-row-value">
                                {{movie.production_companies.map(({ name }) => name).join(', ')}}
                            </div>
                        </div>
                        <div
                            v-if="movie.production_countries && movie.production_countries.length"
                            class="information-row"
                        >
                            <h3 class="information-row-title">Countries:</h3>
                            <div class="information-row-value">
                                {{movie.production_countries.map(({ name }) => name).join(', ')}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </get-movie>
</template>

<script>
import moment from 'moment';

import GetMovie from '../getters/GetMovie';
import MoviePoster from '../MoviePoster';


export default {
    components: {
        GetMovie,
        MoviePoster,
    },
    props: {
        movieId: {
            type: Number,
            required: true,
        },
    },
    methods: {
        releasedLabel(date) {
            return moment(date, 'YYYY-MM-DD').diff(moment()) > 0
                ? 'Will be released'
                : 'Released';
        },
        formatReleaseDate(date) {
            return moment(date, 'YYYY-MM-DD').format('LL');
        },
    },
}
</script>

<style scoped>
.movie {
    margin-bottom: 50px;
}

.heading {
    position: relative;
    color: #ffffff;
    display: flex;
    flex-flow: row nowrap;
    background-size: cover;
    background-position: top center;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.4) 60%),
        var(--heading-background-url);
    min-height: 200px;
}

.heading-content {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    max-width: 1000px;
    width: 100%;
    padding: 10px;
}

.poster-and-information {
    display: flex;
    max-width: 1000px;
    margin: 30px auto 0;
    padding: 0 20px;
}

.title {
    text-align: left;
    margin: 0;
}

.tagline-container {
    margin: 80px 0 0 0;
}

.adult {
    position: absolute;
    right: 10px;
    top: 10px;
    border: 2px solid #222222;
    color: #222222;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
    border-radius: 100%;
    width: 2em;
    height: 2em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
}

.tagline {
    max-width: 400px;
    text-align: right;
    font-style: italic;
    font-family: serif;
    margin-left: auto;
    font-size: 18px;
}

.overview {
    font-size: 18px;
    text-align: left;
    margin-bottom: 10px;
}

.poster + .information {
    margin-left: 15px;
}

.information-row {
    display: block;
    text-align: left;
}

.information-row-title {
    margin: 0 5px 0 0;
}

.information-row-title {
    display: inline-block;
}

.information-row-value {
    display: inline;
}

.poster {
    width: 200px;

    align-self: flex-start;
}

@media screen and (max-width: 550px) {
    .poster-and-information {
        flex-flow: column nowrap;
    }
    .poster {
        align-self: stretch;
    }
    .poster + .information {
        margin-left: 0;
        margin-top: 15px;
    }
}
</style>
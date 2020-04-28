<template>
  <div id="app">
    <main-header />
    <fetch-genres>
      <router-view/>
    </fetch-genres>
  </div>
</template>

<script>
import MainHeader from './components/main-header/MainHeader';
import FetchGenres from './components/fetchers/FetchGenres';


export default {
  components: {
    MainHeader,
    FetchGenres,
  },
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222222;
}

html, body {
  margin: 0;
}
</style>

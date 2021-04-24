<template>
  <div class="search__module">
    <label class="search__module__input">
      <input type="text" @submit="searchForMovies"/>
    </label>
    <div class="search__module__results">
      <MovieList v-if="hasSearchResults" :movies="getSearchResults">
        <button class="btn btn-primary" @click="addMovieToFavourites">Add</button>
      </MovieList>
    </div>
  </div>
</template>

<script>
import MovieList from './MovieList'
import { mapGetters } from 'vuex'

export default {
  name: 'SearchModule',
  components: { MovieList },
  computed: {
    ...mapGetters([
      'hasSearchResults',
      'getSearchResults'
    ])
  },
  methods: {
    searchForMovies (query) {
      this.$store.commit('setMovieQuery', { query })
      this.$store.dispatch('')
    },
    addMovieToFavourites (movie) {
      this.$store.commit('addMovieToFavourites', { movie })
    }
  }
}
</script>

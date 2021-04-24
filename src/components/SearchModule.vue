<template>
  <div class="search__module">
    <div class="search__module-header">
      <label
        for="search-input"
        class="search__module-header-label"
      >
        Movie Search
      </label>
      <input
        type="text"
        id="search-input"
        class="search__module-header-input"
        v-model="searchQuery"
        placeholder="Search movies here..."
        @keyup.enter="searchForMovies"/>
    </div>
    <div class="search__module-results">
      <div class="search__module-results-loading" v-if="isLoading">
        <div class="lds-dual-ring"/>
      </div>
      <div class="search__module-results-error" v-if="!isLoading && hasSearchError">
        <p class="search__module-results-error-message">Error while loading items</p>
        <button class="btn btn-error search__module-results-error-btn" @click="dismissMovieLoadError">Ok</button>
      </div>
      <div class="search__module-results-movie-list" v-if="!isLoading && !hasSearchError && hasSearchResults">
        <MovieList :movies="getSearchResults" @emitMovie="addMovieToFavourites">
          <button class="btn btn-primary search__module-results-movie-list-btn">Add</button>
        </MovieList>
      </div>
    </div>
  </div>
</template>

<script>
import MovieList from './MovieList'
import { mapGetters } from 'vuex'

export default {
  name: 'SearchModule',
  components: { MovieList },
  data: () => ({
    searchQuery: ''
  }),
  computed: {
    ...mapGetters([
      'hasSearchResults',
      'getSearchResults',
      'isLoading',
      'hasSearchError'
    ])
  },
  methods: {
    searchForMovies () {
      this.$store.commit('setMovieQuery', { query: this.searchQuery })
      this.$store.dispatch('searchForMovies')
    },
    addMovieToFavourites (movie) {
      this.$store.commit('addMovieToFavourites', { movie })
    },
    dismissMovieLoadError () {
      this.searchQuery = ''
      this.$store.commit('hideMovieLoadError')
    }
  }
}
</script>

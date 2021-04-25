<template>
  <div class="search__movies">
    <div class="search__movies-header">
      <label
        for="search-input"
        class="search__movies-header-label"
      >
        Movie Search
      </label>
      <input
        type="text"
        id="search-input"
        class="search__movies-header-input"
        v-model="searchQuery"
        placeholder="Search movies here..."
        @keyup.enter="searchForMovies"/>
    </div>
    <div class="search__movies-results">
      <div class="search__movies-results-loading" v-if="isLoading">
        <div class="lds-dual-ring"/>
      </div>
      <div class="search__movies-results-error" v-if="!isLoading && hasSearchError">
        <MoviesError/>
      </div>
      <div class="search__movies-results-movie-list" v-if="!isLoading && !hasSearchError && hasSearchResults">
        <Movie
          v-for="movie of getSearchResults"
          v-bind:key="movie.id"
          :movie="movie"
          @emitMovie="addMovieToFavourites">
            <button class="btn btn-primary search__movies-results-movie-list-btn">Add</button>
        </Movie>
    </div>
    </div>
  </div>
</template>

<script>
import Movie from './Movie'
import { mapGetters } from 'vuex'
import MoviesError from './MoviesError'

export default {
  name: 'SearchMovies',
  components: {
    Movie,
    MoviesError
  },
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
    }
  }
}
</script>

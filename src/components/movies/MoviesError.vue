<template>
  <div class="movies-error">
    <p class="search__module-results-error-message">Error while loading items</p>
    <button class="btn btn-error search__module-results-error-btn" @click="dismissMovieLoadError">Ok</button>
  </div>
</template>

<script>
export default {
  name: 'MoviesError',
  methods: {
    dismissMovieLoadError () {
      this.searchQuery = ''
      this.$store.movie.commit('hideMovieLoadError')
    }
  }
}
</script>

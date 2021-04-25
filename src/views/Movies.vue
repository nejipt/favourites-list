<template>
  <div class="movies">
    <SearchMovies/>
    <FavouriteMovies/>
  </div>
</template>

<script>
import FavouriteMovies from '../components/movies/FavouriteMovies'
import SearchMovies from '../components/movies/SearchMovies'

export default {
  name: 'Movies',
  components: {
    FavouriteMovies,
    SearchMovies
  },
  mounted () {
    this.$store.commit('setFavouriteMoviesFromLocalStorage')
  }
}
</script>

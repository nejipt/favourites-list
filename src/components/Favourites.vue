<template>
  <div class="favourite__movies">
    <MovieList v-if="hasFavouriteMovies" :movies="getFavouriteMovies">
      <button class="btn btn-danger" @click="removeMovieFromFavourites">Delete</button>
    </MovieList>
  </div>
</template>

<script>
import MovieList from './MovieList'
import { mapGetters } from 'vuex'

export default {
  name: 'Favourites',
  components: { MovieList },
  computed: {
    ...mapGetters([
      'hasFavouriteMovies',
      'getFavouriteMovies'
    ])
  },
  methods: {
    removeMovieFromFavourites (movie) {
      this.$store.commit('removeMovieFromFavourites', { movie })
    }
  }
}
</script>

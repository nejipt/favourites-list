<template>
  <div class="favourite__movies">
    <div class="favourite__movies-header">
      <label
        class="favourite__movies-header-label"
      >
        Favourites
      </label>
    </div>
    <div class="favourite__movies-movie-list">
      <MovieList
        v-if="hasFavouriteMovies"
        :movies="getFavouriteMovies"
        @emitMovie="removeMovieFromFavourites"
      >
        <button class="btn btn-danger favourite__movies-movie-list-btn">Delete</button>
      </MovieList>
    </div>
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

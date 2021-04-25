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
      <Movie
        v-for="movie of getFavouriteMovies"
        v-bind:key="movie.id"
        :movie="movie"
        @emitMovie="removeMovieFromFavourites">
          <button class="btn btn-danger favourite__movies-movie-list-btn">Delete</button>
      </Movie>
    </div>
  </div>
</template>

<script>
import Movie from './Movie'
import { mapGetters } from 'vuex'

export default {
  name: 'FavouriteMovies',
  components: { Movie },
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

<template>
  <div class="movie">
    <div class="movie-poster">
      <img class="movie-poster-image" :src="moviePoster" alt="Movie Poster"/>
    </div>
    <div class="movie-data">
      <p><strong>Name:</strong> {{movie.title}}</p>
      <p><strong>Year:</strong> {{movie.year}}</p>
    </div>
    <div class="movie-button" @click="emitMovie">
      <slot/>
    </div>
  </div>
</template>

<script>
import { Movie } from '../../lib/util/movie'

export default {
  props: {
    movie: {
      type: Movie,
      required: true
    }
  },
  name: 'Movie',
  computed: {
    moviePoster () {
      return this.movie.poster || 'assets/default-movie-icon.png'
    }
  },
  methods: {
    emitMovie () {
      this.$emit('emitMovie', this.movie)
    }
  }
}
</script>

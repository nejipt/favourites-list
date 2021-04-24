<template>
  <div class="movie-list">
    <Movie
      v-for="movie of movies"
      v-bind:key="movie.id"
      :movie="movie"
      @emitMovie="emitMovie">
        <slot/>
    </Movie>
  </div>
</template>

<script>
import Movie from './Movie'

export default {
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  name: 'MovieList',
  components: { Movie },
  methods: {
    emitMovie (movie) {
      this.$emit('emitMovie', movie)
    }
  }
}
</script>

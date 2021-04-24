<template>
  <ul>
    <Movie
      is="li"
      v-for="movie of movies"
      v-bind:key="movie.id"
      movie="movie">
        <slot/>
    </Movie>
  </ul>
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
  }
}
</script>

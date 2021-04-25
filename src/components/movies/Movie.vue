<template>
  <div class="movie">
    <div class="movie-poster">
      <img class="movie-poster-image" :src="moviePoster" alt="Movie Poster"/>
    </div>
    <div class="movie-data">
      <p><strong>Name:</strong> {{movie.Title}}</p>
      <p><strong>Year:</strong> {{movie.Year}}</p>
    </div>
    <div class="movie-button" @click="emitMovie">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  name: 'Movie',
  computed: {
    moviePoster () {
      return this.movie.Poster || 'assets/default-movie-icon.png'
    }
  },
  methods: {
    emitMovie () {
      this.$emit('emitMovie', this.movie)
    }
  }
}
</script>

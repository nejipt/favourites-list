<template>
  <div class="movie">
    <div class="movie__image">
      <img :src="movie.img" alt="Movie Poster"/>
    </div>
    <div class="movie__data">
      <p>Some data</p>
    </div>
    <div class="movie__button" @click="emitMovie">
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
  methods: {
    emitMovie () {
      this.$emit('click', this.movie)
    }
  }
}
</script>

import Vue from 'vue'
import Vuex from 'vuex'
import { getMoviesFromQuery } from '../api/omdb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favouriteMovies: [],
    searchResults: []
  },
  getters: {
    hasFavouriteMovies (state) {
      return !!state.favouriteMovies.length
    },
    getFavouriteMovies (state) {
      return state.favouriteMovies
    },
    hasSearchResults (state) {
      return !!state.searchResults.length
    },
    getSearchResults (state) {
      return state.searchResults
    }
  },
  mutations: {
    setMovieQuery (state, payload) {
      state.movieQuery = payload.query
    },
    setSearchResults (state, payload) {
      state.searchResults = payload.searchResults
    },
    addMovieToFavourites (state, payload) {
      const isMovieInFavourites = state.favouriteMovies.find(movie => movie.id === payload.movie.id)

      if (isMovieInFavourites) {
        return
      }

      state.favouriteMovies.push(payload.movie)
    },
    removeMovieFromFavourites (state, payload) {
      const movieIndex = state.favouriteMovies.findIndex(movie => movie.id === payload.movie.id)

      if (movieIndex !== -1) {
        return
      }

      state.favouriteMovies.splice(movieIndex, 1)
    }
  },
  actions: {
    async searchForMovies (context) {
      const searchResults = await getMoviesFromQuery({ query: context.state.movieQuery })
      context.commit('setSearchResults', { searchResults })
    }
  }
})

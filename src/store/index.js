import Vue from 'vue'
import Vuex from 'vuex'
import { getMoviesFromQuery } from '../api/omdb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favouriteMovies: [],
    searchResults: [],
    loading: false,
    error: null
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
    },
    isLoading (state) {
      return state.loading
    },
    hasSearchError (state) {
      return state.error
    }
  },
  mutations: {
    setMovieQuery (state, payload) {
      state.movieQuery = payload.query
    },
    setSearchResults (state, payload) {
      state.searchResults = payload.searchResults
    },
    setFavouriteMoviesFromLocalStorage (state) {
      const hasFavouriteMovies = localStorage.getItem('favouriteMovies')

      if (hasFavouriteMovies) {
        state.favouriteMovies = JSON.parse(hasFavouriteMovies)
      }
    },
    addMovieToFavourites (state, payload) {
      const isMovieInFavourites = state.favouriteMovies.find(movie => movie.imdbID === payload.movie.imdbID)

      if (isMovieInFavourites) {
        return
      }

      state.favouriteMovies.push(payload.movie)
      localStorage.favouriteMovies = JSON.stringify(state.favouriteMovies)
    },
    removeMovieFromFavourites (state, payload) {
      state.favouriteMovies = state.favouriteMovies.filter(movie => movie.imdbID !== payload.movie.imdbID)
      localStorage.favouriteMovies = JSON.stringify(state.favouriteMovies)
    },
    startLoadingSearchResults (state) {
      state.loading = true
    },
    finishedLoadingSearchResults (state) {
      state.loading = false
    },
    showMovieLoadError (state, payload) {
      state.searchResults = []
      state.error = payload.error
    },
    hideMovieLoadError (state) {
      state.error = null
    }
  },
  actions: {
    async searchForMovies (context) {
      context.commit('startLoadingSearchResults')
      try {
        const searchResults = await getMoviesFromQuery({ query: context.state.movieQuery })
        context.commit('setSearchResults', { searchResults })
      } catch (error) {
        context.commit('showMovieLoadError', { error })
      } finally {
        // force loading time for testing how it looks
        // setTimeout(() => {
        //   context.commit('finishedLoadingSearchResults')
        // }, 2000)

        context.commit('finishedLoadingSearchResults')
      }
    }
  }
})

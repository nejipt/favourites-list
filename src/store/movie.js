import { getMovies } from '../api/movie'

export default {
  state: {
    movieQuery: '',
    favouriteMovies: [],
    movieSearchResults: [],
    movieLoading: false,
    movieError: null
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
    setMovieSearchResults (state, payload) {
      state.searchResults = payload.movieResults
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
        const movieSearchResults = await getMovies({ query: context.state.movieQuery })
        context.commit('setSearchResults', { movieSearchResults })
      } catch (error) {
        context.commit('showMovieLoadError', { error })
      } finally {
        await context.dispatch('forceLoading')
        context.commit('finishedLoadingSearchResults')
      }
    },
    async forceLoading (context) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
}

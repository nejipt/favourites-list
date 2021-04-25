import Vue from 'vue'
import Vuex from 'vuex'
import { getMovies, getMovie } from '../api/movie'
import { getRecipes } from '../api/recipe'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // movie
    movieQuery: '',
    favouriteMovies: [],
    movieSearchResults: [],
    movieLoading: false,
    movieError: null,
    // recipe
    recipeQuery: '',
    favouriteRecipes: [],
    recipeSearchResults: [],
    recipeLoading: false,
    recipeError: null
  },
  getters: {
    // movie
    hasFavouriteMovies (state) {
      return !!state.favouriteMovies.length
    },
    getFavouriteMovies (state) {
      return state.favouriteMovies
    },
    hasSearchResults (state) {
      return !!state.movieSearchResults.length
    },
    getSearchResults (state) {
      return state.movieSearchResults
    },
    isLoading (state) {
      return state.movieLoading
    },
    hasSearchError (state) {
      return state.movieError
    },
    // recipe
    hasFavouriteRecipes (state) {
      return !!state.favouriteRecipes.length
    },
    getFavouriteRecipes (state) {
      return state.favouriteRecipes
    },
    hasRecipesResults (state) {
      return !!state.recipeSearchResults.length
    },
    getRecipesResults (state) {
      return state.recipeSearchResults
    },
    isLoadingRecipes (state) {
      return state.recipeLoading
    },
    hasRecipesLoadError (state) {
      return state.recipeError
    }
  },
  mutations: {
    // movie
    setMovieQuery (state, payload) {
      state.movieQuery = payload.query
    },
    setMovieSearchResults (state, payload) {
      state.movieSearchResults = payload.movieSearchResults
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
    startMovieLoading (state) {
      state.movieLoading = true
    },
    finishMovieLoading (state) {
      state.movieLoading = false
    },
    showMovieLoadError (state, payload) {
      state.searchResults = []
      state.movieError = payload.error
    },
    hideMovieLoadError (state) {
      state.movieError = null
    },
    // recipe
    setRecipeQuery (state, payload) {
      state.recipeQuery = payload.query
    },
    setRecipeSearchResults (state, payload) {
      state.recipeSearchResults = payload.recipeSearchResults
    },
    setFavouriteRecipesFromLocalStorage (state) {
      const hasFavouriteRecipes = localStorage.getItem('favouriteRecipes')

      if (hasFavouriteRecipes) {
        state.favouriteMovies = JSON.parse(hasFavouriteRecipes)
      }
    },
    addRecipeToFavourites (state, payload) {
      const isRecipeInFavourites = state.favouriteRecipes.find(recipe => recipe.id === payload.recipe.id)

      if (isRecipeInFavourites) {
        return
      }

      state.favouriteRecipes.push(payload.recipe)
      localStorage.favouriteRecipes = JSON.stringify(state.favouriteRecipes)
    },
    removeRecipeFromFavourites (state, payload) {
      state.favouriteRecipes = state.favouriteRecipes.filter(recipe => recipe.id !== payload.recipe.id)
      localStorage.favouriteRecipes = JSON.stringify(state.favouriteRecipes)
    },
    startRecipeLoading (state) {
      state.recipeLoading = true
    },
    finishRecipeLoading (state) {
      state.recipeLoading = false
    },
    showRecipeLoadError (state, payload) {
      state.recipeSearchResults = []
      state.recipeError = payload.error
    },
    hideRecipeLoadError (state) {
      state.recipeError = null
    }
  },
  actions: {
    // movie
    async searchForMovies (context) {
      context.commit('startMovieLoading')
      try {
        const movieSearchResults = await getMovies(context.state.movieQuery)
        context.commit('setMovieSearchResults', { movieSearchResults })
      } catch (error) {
        context.commit('showMovieLoadError', { error })
      } finally {
        // await context.dispatch('forceLoading')
        context.commit('finishMovieLoading')
      }
    },
    async getMovieDetail (context) {
      context.commit('startMovieLoading')
      try {
        await getMovie(context.state.id)
      } catch (error) {
        context.commit('showMovieLoadError', { error })
      } finally {
        // await context.dispatch('forceLoading')
        context.commit('finishMovieLoading')
      }
    },
    // recipe
    async searchForRecipes (context) {
      context.commit('startRecipeLoading')
      try {
        const recipeSearchResults = await getRecipes({ query: context.state.movieQuery })
        context.commit('setRecipeSearchResults', { recipeSearchResults })
      } catch (error) {
        context.commit('showRecipeLoadError', { error })
      } finally {
        // await context.dispatch('forceLoading')
        context.commit('finishRecipeLoading')
      }
    },
    // abstract/test
    async forceLoading (context) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
})

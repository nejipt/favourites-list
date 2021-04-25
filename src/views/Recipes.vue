<template>
  <div class="recipes">
    <SearchRecipes/>
    <FavouriteRecipes/>
  </div>
</template>

<script>
import SearchRecipes from '../components/recipes/SearchRecipes'
import FavouriteRecipes from '../components/recipes/FavouriteRecipes'
export default {
  name: 'Recipes',
  components: {
    FavouriteRecipes,
    SearchRecipes
  },
  mounted () {
    this.$store.commit('setFavouriteRecipesFromLocalStorage')
  }
}
</script>

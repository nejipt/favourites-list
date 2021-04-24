<template>
  <div class="home">
    <Favourites />
    <SearchModule/>
  </div>
</template>

<script>
import Favourites from '../components/Favourites'
import SearchModule from '../components/SearchModule'

export default {
  name: 'Home',
  components: {
    Favourites,
    SearchModule
  }
}
</script>

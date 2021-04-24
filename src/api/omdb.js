const API_KEY = 'bf01e6e2'

async function getMoviesFromQuery ({ query }) {
  const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)

  const results = response.json()

  return results
}

export {
  getMoviesFromQuery
}

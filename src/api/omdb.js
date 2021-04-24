const API_KEY = 'bf01e6e2'

async function getMoviesFromQuery ({ query }) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)

  const results = await response.json()

  if (results.Response !== 'True') {
    throw new Error()
  }

  return results.Search
}

export {
  getMoviesFromQuery
}

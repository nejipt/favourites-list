import {
  OmdbResponse,
  OmdbMovieDetailResponse,
  Movie,
  MovieDetail
} from '@/lib/util/movie'
import { API_KEY } from '@/config/movie'

async function getMovies (query: string) {
  const _response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
  const response = new OmdbResponse(await _response.json())

  if (!response.isValid()) {
    throw new Error()
  }

  return response.Search.map(movie => new Movie(movie))
}

async function getMovie (id: string) {
  const _response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
  const response = await new OmdbMovieDetailResponse(_response.json())

  if (!response.isValid()) {
    throw new Error()
  }

  return new MovieDetail(response)
}

export {
  getMovies,
  getMovie
}

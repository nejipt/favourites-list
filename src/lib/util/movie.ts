class OmdbResponseMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string

  constructor (movie: any) {
    this.Title = movie.Title
    this.Year = movie.Year
    this.imdbID = movie.imdbID
    this.Type = movie.Type
    this.Poster = movie.Poster
  }
}

class OmdbResponse {
  Search: Array <OmdbResponseMovie>
  totalResults: string
  Response: string

  constructor (movieResponse: any) {
    this.Search = movieResponse.Search.map((movie: any) => new OmdbResponseMovie(movie))
    this.totalResults = movieResponse.totalResults
    this.Response = movieResponse.Response
  }

  isValid () {
    return this.Response === 'True'
  }

  getMovies () {
    return this.Search.map(movie => new Movie(movie))
  }
}

class Movie {
  title: string
  year: string
  imdbID: string
  movieType: string
  poster: string

  constructor (movie: OmdbResponseMovie) {
    this.title = movie.Title
    this.year = movie.Year
    this.imdbID = movie.imdbID
    this.movieType = movie.Type
    this.poster = movie.Poster
  }
}

class OmdbMovieDetailResponse {
  Title: string
  Year: string
  Released: string
  Runtime: string
  Genre: string
  Plot: string
  Actors: string
  imdbID: string
  Poster: string
  Response: string

  constructor (movie: any) {
    this.Title = movie.Title
    this.Year = movie.Year
    this.Released = movie.Released
    this.Runtime = movie.Runtime
    this.Genre = movie.Genre
    this.Plot = movie.Plot
    this.Actors = movie.Actors
    this.imdbID = movie.imdbID
    this.Poster = movie.Poster
    this.Response = movie.Response
  }

  isValid () {
    return this.Response === 'True'
  }
}

class MovieDetail {
  title: string
  year: string
  released: string
  runtime: string
  genres: Array<string>
  plot: string
  actors: Array<string>
  imdbID: string
  poster: string

  constructor (movie: OmdbMovieDetailResponse) {
    this.title = movie.Title
    this.year = movie.Year
    this.released = movie.Released
    this.runtime = movie.Runtime
    this.genres = movie.Genre.split(', ')
    this.plot = movie.Plot
    this.actors = movie.Actors.split(', ')
    this.imdbID = movie.imdbID
    this.poster = movie.Poster
  }
}

export {
  OmdbResponse,
  OmdbMovieDetailResponse,
  Movie,
  MovieDetail
}

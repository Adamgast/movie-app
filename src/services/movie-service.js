import { format } from 'date-fns';

export class MovieService {
  constructor() {
    this.apiBase = 'https://api.themoviedb.org/3';
    this.apiKey = '7030d2ef4bb1e1e9360e47576e4403e4';
  }

  getMovies = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }
      const result = await response.json();
      const arrMovies = await result.results.map(this.transformMovie);
      return [...arrMovies, { page: result.page, totalPages: result.total_pages, totalResults: result.total_results }];
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  getAllMovies = (value, page) => {
    const url = `${this.apiBase}/search/movie?query=${value}&page=${page}&api_key=${this.apiKey}`;
    return this.getMovies(url);
  };

  getAllRatedMovies = (sessionId, page) => {
    const url = `${this.apiBase}/guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&page=${page}&sort_by=created_at.asc`;
    return this.getMovies(url);
  };

  getSessionId = async () => {
    const url = `${this.apiBase}/authentication/guest_session/new?api_key=${this.apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }
      const result = await response.json();
      return result.guest_session_id;
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  getGenres = async () => {
    const url = `${this.apiBase}/genre/movie/list?api_key=${this.apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }
      const result = await response.json();
      return result.genres;
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  addRatingMovie = async (idMovie, rating, sessionId) => {
    const url = `${this.apiBase}/movie/${idMovie}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json;charset=utf-8',
          accept: 'application/json',
        },
        body: JSON.stringify(rating),
      });
      if (!response.ok) throw new Error(`Could not fetch ${url}, received ${response.status}`);
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  // eslint-disable-next-line class-methods-use-this
  transformMovie = (movie) => {
    const validDate = movie.release_date ? format(new Date(movie.release_date), 'MMMM dd, yyyy') : null;
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      poster: movie.poster_path || '',
      dateRelease: validDate || 'date unknown',
      voteAvg: movie.vote_average,
      genres: movie.genre_ids,
      rating: movie.rating || 0,
    };
  };
}

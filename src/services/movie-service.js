import { format } from 'date-fns';

export class MovieService {
  apiBase = 'https://api.themoviedb.org/3';

  apiKey = '&api_key=90ddc7432dbec5d72a749569921057d9';

  async getResource(url) {
    try {
      const responce = await fetch(`${this.apiBase}${url}${this.apiKey}`);
      if (!responce.ok) {
        throw new Error(`Could not fetch ${url}, received ${responce.status}`);
      }
      const result = await responce.json();
      return result;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async getAllMovies() {
    const res = await this.getResource('/search/movie?query=return');
    return res.results.map(this.transformMovie);
  }

  // eslint-disable-next-line class-methods-use-this
  transformMovie(movie) {
    const validDate = movie.release_date ? format(new Date(movie.release_date), 'MMMM dd, yyyy') : null;
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      poster: movie.poster_path,
      dateRelease: validDate,
      voteAvg: movie.vote_average,
      genre: movie.genre_ids,
    };
  }
}

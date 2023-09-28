import { Component } from 'react';

import { MovieService } from '../../services/movie-service';
import { MovieCard } from '../movie-card/movie-card';

import './movie-list.css';

export class MovieList extends Component {
  movieService = new MovieService();

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.onMoviesLoaded();
  }

  onMoviesLoaded() {
    this.movieService.getAllMovies().then((movies) => this.setState({ movies }));
  }

  render() {
    const { movies } = this.state;
    const items = movies.map((movie) => {
      const { id } = movie;
      return (
        <li key={id} className="movie-item">
          <MovieCard movie={movie} />
        </li>
      );
    });
    return <ul className="movie-list">{items}</ul>;
  }
}

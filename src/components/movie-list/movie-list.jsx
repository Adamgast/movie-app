import React, { Component } from 'react';
import { Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import { MovieService } from '../../services/movie-service';
import { MovieCardDesctop } from '../movie-card-desctop/movie-card-desctop';
import { MovieCardMobile } from '../movie-card-mobile/movie-card-mobile';

import './movie-list.css';

function trimText(size, fullText) {
  if (fullText.length >= size) {
    const cutText = fullText.slice(0, size);
    return `${cutText.slice(0, cutText.lastIndexOf(' '))}...`;
  }
  return fullText;
}

export class MovieList extends Component {
  movieService = new MovieService();

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      error: false,
      widthScreen: window.innerWidth,
    };
  }

  componentDidMount() {
    this.onMoviesLoaded();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleError = () => {
    this.setState({ error: true, loading: false });
  };

  handleResize = () => {
    this.setState({ widthScreen: window.innerWidth });
  };

  onMoviesLoaded = () => {
    this.movieService
      .getAllMovies()
      .then((movies) => this.setState({ movies, loading: false }))
      .catch(this.handleError);
  };

  render() {
    const { movies, widthScreen, loading, error } = this.state;

    const spinner = loading ? <Spin size="large" /> : null;
    const errorMessage = error ? (
      <Alert message="Error" description="We could not find the resource you requested." type="error" showIcon />
    ) : null;
    const content = !(loading && error) ? <MovieListView movies={movies} widthScreen={widthScreen} /> : null;

    return (
      <ul className={`movie-list ${loading || errorMessage ? 'center' : ''}`}>
        <Online>
          {errorMessage}
          {spinner}
          {content}
        </Online>
        <Offline>
          <Alert message="Warning" description="No internet connection." type="warning" showIcon />
        </Offline>
      </ul>
    );
  }
}

function MovieListView({ movies, widthScreen }) {
  const items = movies.map((movie) => {
    const { id, description, ...movieProps } = movie;
    return (
      <li key={id} className="movie-item">
        {widthScreen > 910 ? (
          <MovieCardDesctop trimText={trimText(150, description)} movie={movieProps} />
        ) : (
          <MovieCardMobile trimText={trimText(190, description)} movie={movieProps} />
        )}
      </li>
    );
  });
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{items}</>;
}

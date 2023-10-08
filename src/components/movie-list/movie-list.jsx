import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

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
  constructor(props) {
    super(props);
    this.state = {
      widthScreen: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ widthScreen: window.innerWidth });
  };

  render() {
    const { widthScreen } = this.state;
    const { movies, loading, error, noResult } = this.props;

    const spinner = loading ? <Spin size="large" /> : null;

    const noResultMessage =
      noResult && !loading ? (
        <Alert message="Information" description="Sorry, movies was not found." type="info" showIcon />
      ) : null;

    const errorMessage = error ? (
      <Alert message="Error" description="We could not find the resource you requested." type="error" showIcon />
    ) : null;

    const content = !(loading || error || noResult) ? (
      <MovieListView movies={movies} widthScreen={widthScreen} />
    ) : null;

    return (
      <>
        {errorMessage}
        {noResultMessage}
        <ul className={`movie-list ${loading ? 'center' : ''}`}>
          {spinner}
          {content}
        </ul>
      </>
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

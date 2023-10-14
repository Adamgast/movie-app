/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Spin, Alert } from 'antd';
import PropTypes from 'prop-types';

import { MovieCardDesctop } from '../movie-card-desctop/movie-card-desctop';
import { MovieCardMobile } from '../movie-card-mobile/movie-card-mobile';
import './movie-list.css';

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

  trimText = (size, fullText) => {
    if (fullText.length >= size) {
      const cutText = fullText.slice(0, size);
      return `${cutText.slice(0, cutText.lastIndexOf(' '))}...`;
    }
    return fullText;
  };

  colorOfRate = (ratingAvg) => {
    let className = '';
    if (ratingAvg >= 0 && ratingAvg < 3) {
      className += 'low';
    } else if (ratingAvg >= 3 && ratingAvg < 5) {
      className += 'middle';
    } else if (ratingAvg >= 5 && ratingAvg < 7) {
      className += 'high';
    } else {
      className += 'up-high';
    }
    return className;
  };

  validImg = (poster) => {
    const stubImg =
      'https://png.pngtree.com/element_our/20190603/ourlarge/pngtree-watch-movie-popcorn-illustration-image_1458704.jpg';
    if (poster) {
      return `https://image.tmdb.org/t/p/original${poster}`;
    }
    return stubImg;
  };

  render() {
    const { widthScreen } = this.state;
    const { movies, loading, error, noResult, tabName, sessionId } = this.props;

    const spinner = loading ? <Spin size="large" /> : null;

    let noResultMessage;
    if (tabName === 'search') {
      if (noResult && !loading) {
        noResultMessage = (
          <Alert message="Information" description="Sorry, movies was not found." type="info" showIcon />
        );
      }
    } else if (tabName === 'rated') {
      if (noResult && !loading) {
        noResultMessage = (
          <Alert message="Information" description="You don't have movies you rated." type="info" showIcon />
        );
      }
    }

    const errorMessage = error ? (
      <Alert message="Error" description="We could not find the resource you requested." type="error" showIcon />
    ) : null;

    let content;
    if (!(loading || error || noResult)) {
      content = movies.map((movie) => {
        const { id, description, ...movieProps } = movie;
        return (
          <li key={id} className="movie-item">
            {widthScreen > 499.98 ? (
              <MovieCardDesctop
                trimText={this.trimText(195, description)}
                colorOfRate={this.colorOfRate}
                validImg={this.validImg}
                movie={movieProps}
                idMovie={id}
                sessionId={sessionId}
              />
            ) : (
              <MovieCardMobile
                trimText={this.trimText(200, description)}
                colorOfRate={this.colorOfRate}
                validImg={this.validImg}
                movie={movieProps}
                idMovie={id}
                sessionId={sessionId}
              />
            )}
          </li>
        );
      });
    } else {
      content = null;
    }

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

MovieList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  movies: PropTypes.array.isRequired,
  tabName: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  noResult: PropTypes.bool.isRequired,
};

import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';

import { MovieService } from '../../services/movie-service';
import { MovieList } from '../movie-list/movie-list';
import { Search } from '../search/search';
import { PaginationBlock } from '../pagination/pagination';

import './app.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieService();
    this.state = {
      movies: [],
      searchValue: '',
      pagination: {
        page: 1,
        totalPages: 0,
      },
      loading: false,
      error: false,
      noResult: false,
    };
  }

  updateMovies = (searchValue, page = 1) => {
    this.setState({ searchValue, loading: true, error: false });
    this.movieService.getAllMovies(searchValue, page).then(this.loadedMovies).catch(this.handleError);
  };

  loadedMovies = (result) => {
    const pagination = result.slice(-1)[0];
    const movies = result.slice(0, -1);

    if (movies.length === 0) {
      this.setState({ loading: false, noResult: true });
    } else {
      this.setState({ movies, pagination, loading: false, noResult: false });
    }
  };

  handleError = () => {
    this.setState({ error: true, loading: false });
  };

  render() {
    const { movies, loading, error, pagination, searchValue, noResult } = this.state;

    return (
      <div className="movie-container">
        <Search updateMovies={this.updateMovies} />
        <Online>
          <MovieList movies={movies} loading={loading} error={error} noResult={noResult} />
          <PaginationBlock
            page={pagination.page}
            totalPages={pagination.totalPages}
            searchValue={searchValue}
            onPagination={this.updateMovies}
            movies={movies}
            noResult={noResult}
          />
        </Online>
        <Offline>
          <Alert message="Warning" description="No internet connection." type="warning" showIcon />
        </Offline>
      </div>
    );
  }
}

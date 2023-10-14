import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

import { MovieList } from '../movie-list/movie-list';
import { Search } from '../search/search';
import { PaginationBlock } from '../pagination/pagination';

export class SearchTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchValue: '',
      pagination: {
        page: 1,
        totalPages: 0,
        totalResults: 0,
      },
      loading: false,
      error: false,
      noResult: false,
    };
  }

  updateMovies = (searchValue, page = 1) => {
    const { getAllMovies } = this.props;
    this.setState({ searchValue, loading: true, error: false });
    getAllMovies(searchValue, page).then(this.loadedMovies).catch(this.handleError);
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
    const { tabName, sessionId } = this.props;
    return (
      <>
        <Search updateMovies={this.updateMovies} />
        <Online>
          <MovieList
            movies={movies}
            loading={loading}
            error={error}
            noResult={noResult}
            tabName={tabName}
            sessionId={sessionId}
          />
          <PaginationBlock
            page={pagination.page}
            totalPages={pagination.totalPages}
            totalResults={pagination.totalResults}
            searchValue={searchValue}
            onPagination={this.updateMovies}
            noResult={noResult}
          />
        </Online>
        <Offline>
          <Alert message="Warning" description="No internet connection." type="warning" showIcon />
        </Offline>
      </>
    );
  }
}

SearchTab.propTypes = {
  getAllMovies: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
};

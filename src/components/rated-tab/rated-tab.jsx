import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';

import { MovieList } from '../movie-list/movie-list';
import { PaginationBlock } from '../pagination/pagination';

export class RatedTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesRated: [],
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

  componentDidMount() {
    const { pagination } = this.state;
    const { sessionId } = this.props;
    this.updateMovies(sessionId, pagination.page);
  }

  componentDidUpdate(prevProps) {
    const { pagination } = this.state;
    const { tabName, sessionId } = this.props;
    if (prevProps.tabName !== tabName) {
      this.updateMovies(sessionId, pagination.page);
    }
  }

  updateMovies = (sessionId, page = 1) => {
    const { getAllRatedMovies } = this.props;
    this.setState({ loading: true, error: false });
    getAllRatedMovies(sessionId, page).then(this.loadedRatedMovies).catch(this.handleError);
  };

  loadedRatedMovies = (result) => {
    const pagination = result.slice(-1)[0];
    const moviesRated = result.slice(0, -1);
    if (moviesRated.length === 0) {
      this.setState({ loading: false, noResult: true });
    } else {
      this.setState({ moviesRated, pagination, loading: false, noResult: false });
    }
  };

  handleError = () => {
    this.setState({ error: true, loading: false });
  };

  render() {
    const { moviesRated, loading, error, pagination, noResult } = this.state;
    const { tabName, sessionId } = this.props;

    return (
      <>
        <Online>
          <MovieList
            movies={moviesRated}
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
            sessionId={sessionId}
            tabName={tabName}
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

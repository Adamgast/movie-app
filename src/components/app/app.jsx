import { Component } from 'react';
import { Alert, Tabs } from 'antd';

import { GenresProvider } from '../genres-context/genres-context';
import { MovieServiceProvider, MovieServiceConsumer } from '../movie-service-context/movie-service-context';
import { MovieService } from '../../services/movie-service';
import { RatedTab } from '../rated-tab/rated-tab';
import { SearchTab } from '../search-tab/search-tab';

import './app.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.movieService = new MovieService();
    this.state = {
      tabName: 'search',
      sessionId: '',
      allGenres: [],
      error: false,
    };
  }

  componentDidMount() {
    this.getSessionId();
    this.getGenres();
  }

  getGenres = () => {
    this.movieService
      .getGenres()
      .then((allGenres) => this.setState({ allGenres, error: false }))
      .catch(() => this.setState({ error: true }));
  };

  getSessionId = () => {
    if (localStorage.getItem('sessionId')) {
      this.setState({ sessionId: localStorage.getItem('sessionId'), error: false });
    } else {
      this.movieService
        .getSessionId()
        .then((sessionId) => {
          localStorage.setItem('sessionId', sessionId);
          this.setState({ sessionId: localStorage.getItem('sessionId'), error: false });
        })
        .catch(() => this.setState({ error: true }));
    }
  };

  handleChangeTab = (tabName) => {
    this.setState({ tabName });
  };

  render() {
    const { sessionId, tabName, allGenres, error } = this.state;
    const errorMessage = error ? (
      <Alert message="Error" description="Sorry, no access to server." type="error" showIcon />
    ) : null;
    const contentTabs = [
      {
        key: 'search',
        label: 'Search',
        children: (
          <MovieServiceConsumer>
            {({ getAllMovies }) => <SearchTab getAllMovies={getAllMovies} tabName={tabName} sessionId={sessionId} />}
          </MovieServiceConsumer>
        ),
      },
      {
        key: 'rated',
        label: 'Rated',
        children: (
          <MovieServiceConsumer>
            {({ getAllRatedMovies }) => (
              <RatedTab getAllRatedMovies={getAllRatedMovies} tabName={tabName} sessionId={sessionId} />
            )}
          </MovieServiceConsumer>
        ),
      },
    ];

    return (
      <div className="movie-container">
        <MovieServiceProvider value={this.movieService}>
          <GenresProvider value={allGenres}>
            <Tabs centered defaultActiveKey={tabName} items={contentTabs} onChange={this.handleChangeTab} />
            {errorMessage}
          </GenresProvider>
        </MovieServiceProvider>
      </div>
    );
  }
}

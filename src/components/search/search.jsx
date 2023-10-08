import { Component } from 'react';
import { debounce } from 'lodash';

import './search.css';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  handleChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handleKeyUp = debounce((e) => {
    const { updateMovies } = this.props;
    // if (e.target.value.trim() === '') return;
    updateMovies(e.target.value);
  }, 500);

  render() {
    const { searchValue } = this.state;

    return (
      <input
        className="movie-search"
        type="text"
        placeholder="Type to search..."
        value={searchValue}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
      />
    );
  }
}

/* eslint-disable react/destructuring-assignment */
import { Rate } from 'antd';
import { Component } from 'react';

export class RatingStars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countStars: this.props.stars,
    };
  }

  handleChange = (rating) => {
    const { idMovie, addRatingMovie, sessionId } = this.props;
    addRatingMovie(idMovie, { value: rating }, sessionId);
    this.setState({ countStars: rating });
  };

  render() {
    const { countStars } = this.state;
    return <Rate count={10} onChange={this.handleChange} value={countStars} style={{ fontSize: 15 }} />;
  }
}

/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';

import { RatingStars } from '../rating-stars/rating-stars';
import { MovieServiceConsumer } from '../movie-service-context/movie-service-context';
import { Genres } from '../genres/genres';
import './movie-card-mobile.css';

export function MovieCardMobile({ movie, trimText, idMovie, sessionId, colorOfRate, validImg }) {
  const { title, poster, dateRelease, genres, voteAvg, rating } = movie;
  return (
    <article className="movie-card-mobile">
      <div className="movie-mobile-top">
        <div className="movie-mobile-poster">
          <img src={validImg(poster)} alt="poster" />
        </div>
        <div className="movie-mobile-body">
          <div className={`movie-mobile-rate ${colorOfRate(voteAvg)}`}>{voteAvg.toFixed(1)}</div>
          <h3 className="movie-mobile-title">{title}</h3>
          <div className="movie-mobile-date">{dateRelease}</div>
          <div className="movie-mobile-genres">
            <Genres genreIds={genres} />
          </div>
        </div>
      </div>
      <div className="movie-mobile-bottom">
        <div className="movie-mobile-description">{trimText}</div>
        <MovieServiceConsumer>
          {({ addRatingMovie }) => (
            <RatingStars stars={rating} addRatingMovie={addRatingMovie} idMovie={idMovie} sessionId={sessionId} />
          )}
        </MovieServiceConsumer>
      </div>
    </article>
  );
}

MovieCardMobile.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    dateRelease: PropTypes.string.isRequired,
    voteAvg: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  sessionId: PropTypes.string.isRequired,
  idMovie: PropTypes.number.isRequired,
  trimText: PropTypes.string.isRequired,
  colorOfRate: PropTypes.func.isRequired,
  validImg: PropTypes.func.isRequired,
};

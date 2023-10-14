/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';

import { RatingStars } from '../rating-stars/rating-stars';
import { MovieServiceConsumer } from '../movie-service-context/movie-service-context';
import { Genres } from '../genres/genres';
import './movie-card-desctop.css';

export function MovieCardDesctop({ movie, trimText, idMovie, sessionId, colorOfRate, validImg }) {
  const { title, poster, genres, dateRelease, voteAvg, rating } = movie;

  return (
    <article className="movie-card-desctop">
      <div className="movie-desctop-poster">
        <img src={validImg(poster)} alt="poster" />
      </div>
      <div className="movie-desctop-body">
        <div className={`movie-desctop-rate ${colorOfRate(voteAvg)}`}>{voteAvg.toFixed(1)}</div>
        <h3 className="movie-desctop-title">{title}</h3>
        <div className="movie-desctop-date">{dateRelease}</div>
        <div className="movie-desctop-genres">
          <Genres genreIds={genres} />
        </div>
        <div className="movie-desctop-description">{trimText}</div>
        <MovieServiceConsumer>
          {({ addRatingMovie }) => (
            <RatingStars stars={rating} addRatingMovie={addRatingMovie} idMovie={idMovie} sessionId={sessionId} />
          )}
        </MovieServiceConsumer>
      </div>
    </article>
  );
}

MovieCardDesctop.propTypes = {
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

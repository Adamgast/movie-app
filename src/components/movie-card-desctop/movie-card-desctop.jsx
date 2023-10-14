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

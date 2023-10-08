import './movie-card-desctop.css';

export function MovieCardDesctop({ movie, trimText }) {
  const { title, poster, dateRelease, voteAvg } = movie;
  return (
    <article className="movie-card-desctop">
      <div className="movie-desctop-poster">
        <img src={`https://image.tmdb.org/t/p/original${poster}`} alt={`poster ${title}`} />
      </div>
      <div className="movie-desctop-body">
        <div className="movie-desctop-rate">{voteAvg.toFixed(1)}</div>
        <h3 className="movie-desctop-title">{title}</h3>
        <div className="movie-desctop-date">{dateRelease}</div>
        <div className="movie-desctop-genres">
          <span>Action</span>
          <span>Drama</span>
        </div>
        <div className="movie-desctop-description">{trimText}</div>
      </div>
    </article>
  );
}

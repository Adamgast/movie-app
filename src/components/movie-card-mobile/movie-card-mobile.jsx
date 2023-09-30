import './movie-card-mobile.css';

export function MovieCardMobile({ movie, trimText }) {
  const { title, poster, dateRelease } = movie;
  return (
    <article className="movie-card-mobile">
      <div className="movie-mobile-top">
        <div className="movie-mobile-poster">
          <img src={`https://image.tmdb.org/t/p/original${poster}`} alt={`poster ${title}`} />
        </div>
        <div className="movie-mobile-body">
          <h3 className="movie-mobile-title">{title}</h3>
          <div className="movie-mobile-date">{dateRelease}</div>
          <div className="movie-mobile-genres">
            <span>Action</span>
            <span>Drama</span>
          </div>
        </div>
      </div>
      <div className="movie-mobile-bottom">
        <div className="movie-mobile-description">{trimText}</div>
      </div>
    </article>
  );
}

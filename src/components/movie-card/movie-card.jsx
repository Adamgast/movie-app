import './movie-card.css';

export function MovieCard({ movie }) {
  const { title, description, poster, dateRelease } = movie;
  return (
    <article className="movie-card">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/original${poster}`} alt={`poster ${title}`} />
      </div>
      <div className="movie-body">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-date">{dateRelease}</div>
        <div className="movie-genres">
          <span>Action</span>
          <span>Drama</span>
        </div>
        <div className="movie-description">{description}</div>
      </div>
    </article>
  );
}

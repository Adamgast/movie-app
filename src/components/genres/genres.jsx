import PropTypes from 'prop-types';

import { GenresConsumer } from '../genres-context/genres-context';

export function Genres({ genreIds }) {
  return (
    <GenresConsumer>
      {(allGenres) => {
        const genres = genreIds.map((id) => {
          const getGenre = allGenres.find((item) => id === item.id);
          return getGenre;
        });
        return genres.slice(0, 3).map(({ id, name }) => <span key={id}>{name}</span>);
      }}
    </GenresConsumer>
  );
}

Genres.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  genreIds: PropTypes.array.isRequired,
};

/* eslint-disable react/require-default-props */
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import './pagination.css';

export function PaginationBlock({
  searchValue,
  sessionId,
  tabName,
  page,
  totalPages,
  onPagination,
  noResult,
  totalResults,
}) {
  const handleChange = (pageNum) => {
    if (tabName === 'rated') {
      onPagination(sessionId, pageNum);
    } else {
      onPagination(searchValue, pageNum);
    }
  };

  return totalResults > 20 && !noResult ? (
    <div className="pagination">
      <Pagination pageSize={1} onChange={handleChange} showSizeChanger={false} total={totalPages} current={page} />
    </div>
  ) : null;
}

PaginationBlock.propTypes = {
  searchValue: PropTypes.string,
  tabName: PropTypes.string,
  sessionId: PropTypes.string,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  noResult: PropTypes.bool.isRequired,
  onPagination: PropTypes.func.isRequired,
};

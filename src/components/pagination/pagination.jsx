import { Pagination } from 'antd';

import './pagination.css';

export function PaginationBlock({ searchValue, page, totalPages, onPagination, noResult, movies }) {
  const handleChange = (pageNum) => {
    onPagination(searchValue, pageNum);
  };

  return movies.length > 0 && !noResult ? (
    <div className="pagination">
      <Pagination pageSize={1} onChange={handleChange} showSizeChanger={false} total={totalPages} current={page} />
    </div>
  ) : null;
}

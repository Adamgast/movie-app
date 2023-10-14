import { Pagination } from 'antd';

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

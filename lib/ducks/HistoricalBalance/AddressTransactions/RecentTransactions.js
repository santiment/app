import React, { useRef, useMemo, useState } from 'react';
import { COLUMNS } from './columns';
import { useRecentTransactions } from '../hooks';
import PagedTable, { buildPageSizes } from '../../_Table/Paged';
import { getItemKey } from './defaults';
import styles from './index.module.css';
const PAGE_SIZES = buildPageSizes([20, 50]);

const RecentTransactions = ({
  settings
}) => {
  const pagesItems = useRef([]).current;
  const [page, setPage] = useState(0);
  const {
    transactions,
    isLoading
  } = useRecentTransactions(settings, page + 1);
  const nextTransactions = useRecentTransactions(settings, page + 2, isLoading).transactions;
  const items = useMemo(() => {
    pagesItems[page] = transactions;
    pagesItems[page + 1] = nextTransactions;
    return pagesItems.flat();
  }, [transactions, nextTransactions]);
  return /*#__PURE__*/React.createElement(PagedTable, {
    className: styles.table,
    columns: COLUMNS,
    pageSizes: PAGE_SIZES,
    minRows: 10,
    items: items,
    itemProps: settings,
    isLoading: isLoading,
    onPageChange: setPage,
    getItemKey: getItemKey
  });
};

export default RecentTransactions;
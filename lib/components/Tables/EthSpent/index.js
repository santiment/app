import React, { useMemo } from 'react';
import Loader from '@santiment-network/ui/Loader/Loader';
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader';
import { COLUMNS, DEFAULT_SORTING } from './columns';
import GetAssets from '../../../ducks/Watchlists/Widgets/Table/GetAssets';
import Table from '../../../ducks/Table';
import styles from './index.module.css';

const EthSpentTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  return /*#__PURE__*/React.createElement(GetAssets, {
    sortBy: "eth_balance",
    type: "erc20",
    render: ({
      items = [],
      isLoading: loading = true,
      loadingAll
    }) => {
      return /*#__PURE__*/React.createElement(PanelWithHeader, {
        header: /*#__PURE__*/React.createElement("div", {
          className: styles.header
        }, "Ethereum spent overview ", loadingAll && /*#__PURE__*/React.createElement(Loader, {
          className: styles.headerLoader
        })),
        className: styles.wrapper,
        contentClassName: styles.panel
      }, /*#__PURE__*/React.createElement(Table, {
        data: items,
        columns: columns,
        options: {
          loadingSettings: {
            repeatLoading: 6,
            isLoading: loading && items.length === 0
          },
          sortingSettings: {
            defaultSorting: DEFAULT_SORTING,
            allowSort: true
          },
          stickySettings: {
            isStickyHeader: true
          },
          paginationSettings: {
            pageSizeOptions: [10, 25, 50]
          }
        },
        className: styles.tableWrapper,
        classes: {
          table: styles.table,
          bodyRow: styles.tableRow
        }
      }));
    }
  });
};

export default EthSpentTable;
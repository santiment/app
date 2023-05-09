import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import NftTable from '../../../../ducks/Table';
import { dateDifferenceInWords } from '../../../../utils/dates';
import { useNftQuery, useNftCountQuery } from './hooks';
import { capitalizeStr } from '../../../../utils/utils';
import { HOME_INDEX, PAGE_INDEX, DEFAULT_SORTING, PAGE_SIZE_OPTIONS, Activity, Marketplace, getTwitterAccount, Transaction, TRXhash } from './utils';
import styles from './index.module.css';

const Table = ({
  isHome = true
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(isHome ? 6 : 30);
  const [orderBy, setOrderBy] = useState('DATETIME');
  const [direction, setDirection] = useState('DESC');
  const {
    data,
    loading
  } = useNftQuery(pageIndex, pageSize, orderBy, direction);
  const {
    maxAmount
  } = useNftCountQuery();
  const index = isHome ? HOME_INDEX : PAGE_INDEX;
  const columns = index.map(idx => ({
    Header: idx,
    accessor: idx,
    collapse: false,
    disableSortBy: isHome ? true : !['Price', 'When'].includes(idx),
    Cell: ({
      row
    }) => {
      switch (idx) {
        case '#':
          return parseInt(row.id) + 1 + pageSize * pageIndex;

        case 'Twitter NFT Influencer':
          const account = getTwitterAccount(row.original);
          if (!account) return null;
          return /*#__PURE__*/React.createElement("a", {
            href: account.Twitter,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "@", account.Name);

        case 'Activity':
          return /*#__PURE__*/React.createElement(Activity, {
            original: row.original
          });

        case 'NFT collection name':
          return /*#__PURE__*/React.createElement(Link, {
            className: styles.transaction,
            to: `/charts?settings=%7B%22address%22%3A%22${row.original.nft.contractAddress}%22%7D&widgets=%5B%7B%22widget%22%3A%22ChartWidget%22%2C%22wm%22%3A%5B%22nft_social_volume%22%5D%2C%22wax%22%3A%5B0%5D%2C%22wc%22%3A%5B%22%23FFCB47%22%5D%2C%22ws%22%3A%7B%220%22%3A%7B%22interval%22%3A%221d%22%7D%7D%7D%2C%7B%22widget%22%3A%22ChartWidget%22%2C%22wm%22%3A%5B%22contract_transactions_count%22%2C%22contract_interacting_addresses_count%22%5D%2C%22wax%22%3A%5B0%2C1%5D%2C%22wc%22%3A%5B%22%23F47BF7%22%2C%22%23FF5B5B%22%5D%7D%5D`
          }, row.original.nft.name && /*#__PURE__*/React.createElement("span", {
            className: styles.mr
          }, capitalizeStr(row.original.nft.name)), /*#__PURE__*/React.createElement(TRXhash, {
            hash: row.original.nft.contractAddress,
            asLink: false
          }));

        case 'Transaction':
          return /*#__PURE__*/React.createElement(Transaction, {
            from: row.original.fromAddress.address,
            to: row.original.toAddress.address
          });

        case 'TRX hash':
          return /*#__PURE__*/React.createElement(TRXhash, {
            hash: row.original.trxHash
          });

        case 'When':
          return dateDifferenceInWords({
            from: new Date(row.original.datetime)
          });

        case 'Price':
          return `${parseFloat(row.original.amount.toFixed(3))} ${row.original.currencyProject && row.original.currencyProject.ticker}`;

        case 'Quantity':
          return row.original.quantity;

        case 'Marketplace':
          return /*#__PURE__*/React.createElement(Marketplace, {
            marketplace: row.original.marketplace
          });

        default:
          return null;
      }
    }
  }));

  const fetchData = ({
    pageSize,
    sortBy
  }) => {
    if (sortBy) {
      const {
        id,
        desc
      } = sortBy[0];

      if (['Price', 'When'].includes(id)) {
        setOrderBy(id === 'When' ? 'DATETIME' : 'AMOUNT');
        setDirection(desc ? 'DESC' : 'ASC');
      }
    }

    if (!isHome) {
      setPageSize(pageSize);
    }
  };

  return /*#__PURE__*/React.createElement(NftTable, {
    className: cx(styles.table, !isHome && styles.tablePage),
    data: data,
    columns: columns,
    fetchData: fetchData,
    options: {
      loadingSettings: {
        isLoading: loading
      },
      sortingSettings: {
        defaultSorting: DEFAULT_SORTING,
        allowSort: true
      },
      paginationSettings: !isHome && {
        pageSize,
        pageIndex,
        onChangePage: setPageIndex,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        controlledPageCount: Math.ceil(maxAmount / pageSize),
        manualPagination: true
      }
    }
  });
};

export default Table;
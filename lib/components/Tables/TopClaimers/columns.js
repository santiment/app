function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Loader from '@santiment-network/ui/Loader/Loader';
import WalletLink from '../../WalletLink/WalletLink';
import { formatNumber } from '../../../utils/formatting';
import styles from './index.module.css';
const settings = {
  assets: ['uniswap'],
  priceMetrics: ['uniswap']
};

const TrxAddressCell = ({
  value,
  row: {
    original: {
      labels
    }
  }
}) => {
  const transformedLabels = labels.map(label => ({
    name: label
  }));
  return /*#__PURE__*/React.createElement(WalletLink, _extends({
    address: value
  }, settings, {
    labels: transformedLabels
  }));
};

function CellWithLoader({
  value = ''
}) {
  if (value === '') {
    return /*#__PURE__*/React.createElement(Loader, {
      className: styles.loader
    });
  } else {
    return formatNumber(value);
  }
}

export const DEFAULT_SORTING = [{
  id: 'value',
  desc: true
}];
export const COLUMNS = [{
  Header: 'Address',
  accessor: 'address',
  Cell: TrxAddressCell,
  disableSortBy: true
}, {
  Header: 'Claimed in interval',
  accessor: 'value',
  Cell: ({
    value
  }) => formatNumber(value)
}, {
  Header: 'Current balance',
  accessor: 'balance',
  Cell: CellWithLoader
}, {
  Header: 'Transaction Volume In',
  accessor: 'volumeInflow',
  Cell: CellWithLoader
}, {
  Header: 'Transaction Volume Out',
  accessor: 'volumeOutflow',
  Cell: CellWithLoader
}];
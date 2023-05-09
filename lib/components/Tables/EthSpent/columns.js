function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { millify } from '../../../utils/formatting';
import WalletLink from '../../WalletLink/WalletLink';
import Project from '../Cells/Project';
const ETHEREUM = 'ethereum';

const TrxAddressCell = ({
  wallet,
  assets
}) => /*#__PURE__*/React.createElement(WalletLink, _extends({}, wallet, {
  assets: assets
}));

const EthCell = ({
  value,
  sign = 'Ξ'
}) => value ? /*#__PURE__*/React.createElement("div", null, `${sign}${millify(value, 2)}`) : /*#__PURE__*/React.createElement("div", null, "No data");

export const DEFAULT_SORTING = [{
  id: 'ethSpent',
  desc: true
}];
export const COLUMNS = [{
  Header: 'Project',
  accessor: 'project',
  disableSortBy: true,
  Cell: ({
    row: {
      original
    }
  }) => /*#__PURE__*/React.createElement(Project, _extends({}, original, {
    to: `/projects/${original.slug}`
  }))
}, {
  Header: 'Funds Collected',
  accessor: 'fundsRaisedUsdIcoEndPrice',
  Cell: ({
    value
  }) => EthCell({
    value,
    sign: '$'
  })
}, {
  Header: 'ETH spent, 30d',
  accessor: 'ethSpent',
  Cell: EthCell
}, {
  Header: 'ETH balance',
  accessor: 'ethBalance',
  Cell: EthCell
}, {
  Header: 'Wallets',
  accessor: 'ethAddresses',
  disableSortBy: true,
  Cell: ({
    value = {},
    row: {
      original
    }
  }) => /*#__PURE__*/React.createElement(React.Fragment, null, value.length > 0 ? value.map((wallet, index) => /*#__PURE__*/React.createElement(TrxAddressCell, {
    key: index,
    wallet: wallet,
    assets: original.slug === ETHEREUM ? [original.slug] : [original.slug, ETHEREUM]
  })) : 'No data')
}];
const _excluded = ["value", "row"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { formatNumber } from '../../../../utils/formatting';
import { percentageFormatter, usdFormatter } from '../../../dataHub/metrics/formatters';
import WalletLink from '../../../../components/WalletLink/WalletLink';

const AddressCell = _ref => {
  let {
    value,
    row: {
      original
    }
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(WalletLink, {
    address: value,
    labels: original.labels
  });
};

export const COLUMNS = [{
  Header: 'Address',
  accessor: 'address',
  disableSortBy: true,
  Cell: AddressCell
}, {
  Header: 'Value',
  accessor: 'value',
  Cell: ({
    value
  }) => formatNumber(value),
  disableSortBy: true
}, {
  Header: 'Value USD',
  accessor: 'valueUsd',
  Cell: ({
    value
  }) => usdFormatter(value),
  disableSortBy: true
}, {
  Header: 'Part Of Total',
  accessor: 'partOfTotal',
  Cell: ({
    value
  }) => percentageFormatter(100 * value, {
    fractionDigits: 100 * value > 0.01 ? 2 : 6
  }),
  disableSortBy: true
}];
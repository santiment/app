import React from 'react';
import { millify, upperCaseFirstLetter } from '../../../utils/formatting';
import { getDateFormats } from '../../../utils/dates';
import ValueChange from '../../ValueChange/ValueChange';
export const DEFAULT_SORTING = [{
  id: 'balance',
  desc: true
}];
export const COLUMNS = [{
  Header: 'Exchange',
  accessor: 'owner',
  disableSortBy: true,
  Cell: ({
    value = ''
  }) => upperCaseFirstLetter(value)
}, {
  Header: 'Balance',
  accessor: 'balance',
  Cell: ({
    value
  }) => millify(value)
}, {
  Header: 'Change, 1d',
  accessor: 'balanceChange1d',
  Cell: ({
    value
  }) => /*#__PURE__*/React.createElement(ValueChange, {
    render: millify,
    change: value
  }),
  sortType: 'floatNumeric'
}, {
  Header: 'Change, 7d',
  accessor: 'balanceChange7d',
  Cell: ({
    value
  }) => /*#__PURE__*/React.createElement(ValueChange, {
    render: millify,
    change: value
  }),
  sortType: 'floatNumeric'
}, {
  Header: 'Change, 30d',
  accessor: 'balanceChange30d',
  Cell: ({
    value
  }) => /*#__PURE__*/React.createElement(ValueChange, {
    render: millify,
    change: value
  }),
  sortType: 'floatNumeric'
}, {
  Header: '1st transfer at',
  accessor: 'datetimeOfFirstTransfer',
  Cell: ({
    value = ''
  }) => {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    const {
      YYYY,
      MMM,
      DD
    } = getDateFormats(date);
    return `${MMM} ${DD}, ${YYYY}`;
  },
  sortType: 'datetime'
}, {
  Header: 'Since 1st transfer',
  accessor: 'daysSinceFirstTransfer',
  Cell: ({
    value = ''
  }) => value === null ? '' : `${value} day${value === 1 ? '' : 's'}`
}];
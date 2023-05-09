import React from 'react';
import WalletLink from '../../WalletLink/WalletLink';
import { formatNumber } from '../../../utils/formatting';
import { mapToTxLink } from '../../../utils/utils';
import styles from '../../WalletLink/WalletLink.module.css';

const AddressCell = ({
  value
}) => /*#__PURE__*/React.createElement(WalletLink, value);

export const TxLinkTo = ({
  value,
  formatter
}) => /*#__PURE__*/React.createElement("a", {
  className: styles.link,
  href: mapToTxLink(value),
  target: "_blank",
  rel: "noopener noreferrer"
}, formatter ? formatter(value) : value);

const TrxCell = ({
  value
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.trx
}, /*#__PURE__*/React.createElement(TxLinkTo, {
  value: value
}));

export const DEFAULT_SORTING = [{
  id: 'datetime',
  desc: true
}];
export const COLUMNS = [{
  Header: 'Time',
  accessor: 'datetime',
  sortType: 'datetime'
}, {
  Header: 'Value',
  accessor: 'trxValue',
  Cell: ({
    value
  }) => formatNumber(value),
  sortType: 'floatNumeric'
}, {
  Header: 'From',
  accessor: 'fromAddress',
  Cell: AddressCell,
  disableSortBy: true
}, {
  Header: 'To',
  accessor: 'toAddress',
  Cell: AddressCell,
  disableSortBy: true
}, {
  Header: 'TxHash',
  accessor: 'trxHash',
  Cell: TrxCell,
  disableSortBy: true
}];
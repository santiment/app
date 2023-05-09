import React, { Fragment } from 'react';
import cx from 'classnames';
import { formatCryptoCurrency, formatNumber, millify } from '../../../utils/formatting';
import WalletLink from '../../../components/WalletLink/WalletLink';
import SmoothDropdown from '../../../components/SmoothDropdown/SmoothDropdown';
import './FinancialsBlock.css';
export const collectedField = (currency, amount) => {
  if (currency === 'USD') {
    return formatNumber(amount, {
      currency: 'USD'
    });
  }

  return formatCryptoCurrency(currency, formatNumber(amount));
};

const FinancialsBlock = ({
  fundsRaisedIcos,
  ethSpent = null,
  ethBalance = null,
  btcBalance = null,
  ethAddresses = [],
  slug,
  isERC20
}) => /*#__PURE__*/React.createElement("div", {
  className: "panel-container"
}, fundsRaisedIcos && fundsRaisedIcos.length !== 0 && /*#__PURE__*/React.createElement("div", {
  className: "row-info"
}, /*#__PURE__*/React.createElement("div", null, "Collected"), /*#__PURE__*/React.createElement("div", {
  className: "value"
}, fundsRaisedIcos ? fundsRaisedIcos.map((amountIco, index) => {
  return /*#__PURE__*/React.createElement("div", {
    key: index
  }, collectedField(amountIco.currencyCode, amountIco.amount));
}) : '-')), ethAddresses && ethAddresses.length > 0 && /*#__PURE__*/React.createElement(Fragment, null, ethBalance !== undefined && /*#__PURE__*/React.createElement("div", {
  className: cx({
    'row-info wallets': true,
    'info-disabled': ethAddresses.length === 0
  })
}, /*#__PURE__*/React.createElement("div", null, "Wallet Balances")), /*#__PURE__*/React.createElement(SmoothDropdown, {
  verticalOffset: 0,
  verticalMotion: true
}, ethAddresses && ethAddresses.length > 0 && /*#__PURE__*/React.createElement("div", {
  className: "row-info wallets-balance"
}, ethAddresses.map((wallet, index) => /*#__PURE__*/React.createElement("div", {
  key: index
}, /*#__PURE__*/React.createElement("div", {
  className: "wallets-addresses"
}, /*#__PURE__*/React.createElement(WalletLink, {
  address: wallet.address,
  assets: [slug, 'ethereum']
}), /*#__PURE__*/React.createElement("span", null, "ETH ", millify(wallet.balance, 2))))))), ethBalance !== undefined && /*#__PURE__*/React.createElement("div", {
  className: cx({
    'row-info': true,
    'info-disabled': ethAddresses.length === 0
  })
}, /*#__PURE__*/React.createElement("div", null, "Total Balance"), `ETH ${millify(ethBalance, 2)}`), ethSpent !== undefined && /*#__PURE__*/React.createElement("div", {
  className: cx({
    'row-info': true,
    'info-disabled': ethBalance === undefined
  })
}, /*#__PURE__*/React.createElement("div", null, "ETH Spent 30d"), /*#__PURE__*/React.createElement("div", {
  style: {
    textAlign: 'right'
  }
}, `ETH ${millify(ethSpent, 2)}`))));

export default FinancialsBlock;
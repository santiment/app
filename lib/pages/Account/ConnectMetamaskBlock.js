import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import * as actions from '../../actions/types';
import Label from '@santiment-network/ui/Label';
import { hasMetamask } from '../../web3Helpers';
import styles from './AccountPage.module.css';

const getMetamaskBtnText = (address, connecting) => {
  if (!hasMetamask()) {
    return "Can't detect Metamask";
  }

  if (address) {
    return 'Disconnect';
  }

  return connecting ? 'Connecting' : 'Connect';
};

const ConnectMetamaskBlock = ({
  address,
  connectNewWallet,
  removeConnectedWallet,
  isConnectWalletPending
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.metamask, 'row justify')
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.setting__left
  }, /*#__PURE__*/React.createElement(Label, {
    className: styles.label
  }, "Metamask"), address ? /*#__PURE__*/React.createElement("div", {
    className: cx(styles.metasmask_address, 'c-waterloo mrg-m mrg--b')
  }, address) : /*#__PURE__*/React.createElement("div", {
    className: "c-waterloo mrg-m mrg--b"
  }, "You will get the ability to deposit tokens to your Sanbase account.", /*#__PURE__*/React.createElement("br", null), "Please follow futher instructions.")), /*#__PURE__*/React.createElement("button", {
    className: address ? 'btn-0' : 'btn-1',
    disabled: !hasMetamask(),
    onClick: address ? removeConnectedWallet : connectNewWallet
  }, getMetamaskBtnText(address, isConnectWalletPending)));
};

const mapStateToProps = ({
  user: {
    data: {
      ethAccounts = []
    }
  },
  accountUi: {
    isConnectWalletPending,
    isConnectWalletFailed
  }
}) => ({
  address: ethAccounts.length > 0 && ethAccounts[0].address,
  isConnectWalletPending,
  isConnectWalletFailed
});

const mapDispatchToProps = dispatch => ({
  removeConnectedWallet: () => dispatch({
    type: actions.SETTINGS_REMOVE_CONNECTED_WALLET
  }),
  connectNewWallet: () => dispatch({
    type: actions.SETTINGS_CONNECT_NEW_WALLET
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectMetamaskBlock);
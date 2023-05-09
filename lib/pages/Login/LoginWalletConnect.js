import React from 'react';
import cx from 'classnames';
import { track } from 'san-webkit/lib/analytics';
import { mutateWalletConnectLogin } from 'san-webkit/lib/api/login';
import wcSrc from 'san-webkit/lib/ui/LoginPrompt/WalletConnect/wallet-connect.svg';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import styles from './index.module.css';

const mutateLogin = (connector, address) => mutateWalletConnectLogin('id', connector, address);

const LoginWalletConnectBtn = ({
  signUp,
  className
}) => {
  function onClick() {
    track.event('sign_up', {
      method: 'walletconnect'
    });
    const connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org',
      // Required
      qrcodeModal: QRCodeModal
    });

    if (!connector.connected) {
      connector.createSession();
    }

    connector.on('connect', (error, payload) => {
      if (error) throw error;
      const {
        accounts
      } = payload.params[0];
      mutateLogin(connector, accounts[0]).then(() => {
        window.location.reload(); // HACK: refactor later to mutate store
      });
    });
  }

  return /*#__PURE__*/React.createElement("button", {
    className: cx(styles.btn, styles.btn_email, styles.btn_google, className),
    onClick: onClick
  }, /*#__PURE__*/React.createElement("img", {
    src: wcSrc,
    alt: "wallet connect",
    style: {
      width: 24
    },
    className: "mrg-s mrg--r"
  }), "Sign ", signUp ? 'up' : 'in', " with WalletConnect");
};

export default LoginWalletConnectBtn;
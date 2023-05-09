import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { trackLoginStart, LoginType } from 'webkit/analytics/events/general';
import { trackSignupStart } from 'webkit/analytics/events/onboarding';
import Icon from '@santiment-network/ui/Icon';
import { hasMetamask as detectMetamask } from '../../web3Helpers';
import { showNotification } from '../../actions/rootActions';
import { USER_ETH_LOGIN } from '../../actions/types';
import styles from './index.module.css';
const hasMetamask = detectMetamask();

const LoginMetamaskBtn = ({
  loginError,
  showErrorNotification,
  requestAuth,
  signUp,
  className
}) => {
  if (!hasMetamask) {
    return /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: "https://metamask.io/#how-it-works",
      className: cx(styles.button, 'btn-2 row v-center', className)
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "metamask",
      className: cx(styles.metamaskIcon, 'mrg-m mrg--r')
    }), signUp ? 'Sign up' : 'Log in', " with Metamask");
  }

  if (loginError) {
    showErrorNotification();
  }

  function askAuth(consent) {
    requestAuth(consent);

    if (signUp) {
      trackSignupStart(LoginType.METAMASK);
    } else {
      trackLoginStart(LoginType.METAMASK);
    }
  }

  return /*#__PURE__*/React.createElement("button", {
    className: cx(styles.button, 'btn-2 row v-center', className),
    onClick: askAuth
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "metamask",
    className: cx(styles.metamaskIcon, 'mrg-m mrg--r')
  }), signUp ? 'Sign up' : 'Log in', " with Metamask");
};

const mapStateToProps = ({
  user
}) => ({
  loginError: user.error
});

const mapDispatchToProps = dispatch => ({
  requestAuth: consent => {
    dispatch({
      type: USER_ETH_LOGIN,
      payload: {
        consent: ''
      }
    });
  },
  showErrorNotification: () => {
    dispatch(showNotification({
      variant: 'error',
      title: `Error occured during login process`,
      description: 'Please, try again later or use another login option',
      dismissAfter: 8000
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginMetamaskBtn);
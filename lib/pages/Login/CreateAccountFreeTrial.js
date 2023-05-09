function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import cx from 'classnames';
import Panel from '@santiment-network/ui/Panel';
import withSizes from 'react-sizes';
import LoginEmailForm, { EmailForm } from './LoginEmailForm';
import LoginGoogleBtn from './LoginGoogleBtn';
import OrUseDivider from './OrUseDivider';
import MobileWrapper from './Mobile/MobileWrapper';
import LoginMetamaskBtn from './LoginMetamaskBtn';
import LogitTwitterBtn from './LoginTwitterBtn';
import { PATHS } from '../../paths';
import { mapSizesToProps } from '../../utils/withSizes';
import externalStyles from './index.module.css';
import styles from './CreateAccountFreeTrial.module.css';

const SignupDescription = ({
  loading,
  loginEmail,
  setEmail,
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(externalStyles.loginBlock, 'body-2', className)
}, /*#__PURE__*/React.createElement("h2", {
  className: cx(externalStyles.title, 'h4 txt-m')
}, /*#__PURE__*/React.createElement("div", null, "Welcome to Sanbase")), /*#__PURE__*/React.createElement(LoginMetamaskBtn, {
  signUp: true,
  className: "mrg-xl mrg--t"
}), /*#__PURE__*/React.createElement(LoginGoogleBtn, {
  signUp: true
}), /*#__PURE__*/React.createElement(LogitTwitterBtn, {
  signUp: true
}), /*#__PURE__*/React.createElement(OrUseDivider, null), /*#__PURE__*/React.createElement(EmailForm, {
  signUp: true,
  loading: loading,
  loginEmail: loginEmail,
  setEmail: setEmail,
  className: styles.email
}), /*#__PURE__*/React.createElement("div", {
  className: "txt-center"
}, /*#__PURE__*/React.createElement("div", {
  className: externalStyles.new
}, "Have an account?", ' ', /*#__PURE__*/React.createElement(Link, {
  to: PATHS.LOGIN,
  className: "btn-0"
}, "Log in"))));

export const PrepareState = props => {
  const {
    isDesktop,
    loading,
    loginEmail,
    setEmail
  } = props;

  if (isDesktop) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.container
    }, /*#__PURE__*/React.createElement(SignupDescription, {
      loading: loading,
      loginEmail: loginEmail,
      setEmail: setEmail
    }));
  }

  return /*#__PURE__*/React.createElement(MobileWrapper, {
    withHeader: true
  }, /*#__PURE__*/React.createElement(SignupDescription, {
    loading: loading,
    loginEmail: loginEmail,
    setEmail: setEmail
  }));
};

const CreateAccountFreeTrial = props => {
  if (props.isLoggedIn) {
    return /*#__PURE__*/React.createElement(Redirect, {
      to: "/"
    });
  }

  let child = /*#__PURE__*/React.createElement(LoginEmailForm, _extends({
    signUp: true,
    prepareState: PrepareState
  }, props));
  return props.isDesktop ? /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.wrapper)
  }, /*#__PURE__*/React.createElement(Panel, {
    padding: true,
    className: externalStyles.panel
  }, child)) : child;
};

export default withSizes(mapSizesToProps)(CreateAccountFreeTrial);
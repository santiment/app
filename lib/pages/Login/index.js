function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import withSizes from 'react-sizes';
import { parse } from 'query-string';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Panel from '@santiment-network/ui/Panel/Panel';
import OrUseDivider from './OrUseDivider';
import LoginMetamaskBtn from './LoginMetamaskBtn';
import LoginEmailForm, { EmailForm } from './LoginEmailForm';
import LoginGoogleBtn from './LoginGoogleBtn';
import LogitTwitterBtn from './LoginTwitterBtn';
import { PATHS } from '../../paths';
import MobileWrapper from './Mobile/MobileWrapper';
import { mapSizesToProps } from '../../utils/withSizes';
import styles from './index.module.css';
export const LoginDescription = ({
  loading,
  loginEmail,
  setEmail,
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.loginBlock, 'body-2', className)
}, /*#__PURE__*/React.createElement("h3", {
  className: cx(styles.title, 'h4 txt-m')
}, "Welcome back"), /*#__PURE__*/React.createElement("div", {
  className: "column hv-center"
}, /*#__PURE__*/React.createElement(LoginMetamaskBtn, {
  className: "mrg-xl mrg--t"
}), /*#__PURE__*/React.createElement(LoginGoogleBtn, null), /*#__PURE__*/React.createElement(LogitTwitterBtn, null), /*#__PURE__*/React.createElement(OrUseDivider, null), /*#__PURE__*/React.createElement(EmailForm, {
  loading: loading,
  loginEmail: loginEmail,
  setEmail: setEmail,
  label: "Log in",
  className: styles.emailFormInput
}), /*#__PURE__*/React.createElement("div", {
  className: styles.new
}, "New to Santiment?", ' ', /*#__PURE__*/React.createElement(Link, {
  to: PATHS.CREATE_ACCOUNT,
  className: "btn-0"
}, "Create an account"))));

const LoginOptions = props => {
  const {
    isDesktop,
    loading,
    loginEmail,
    setEmail
  } = props;

  if (isDesktop) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.container
    }, /*#__PURE__*/React.createElement(LoginDescription, {
      loading: loading,
      loginEmail: loginEmail,
      setEmail: setEmail
    }));
  }

  return /*#__PURE__*/React.createElement(MobileWrapper, {
    withHeader: true
  }, /*#__PURE__*/React.createElement(LoginDescription, {
    loading: loading,
    loginEmail: loginEmail,
    setEmail: setEmail
  }));
};

const Login = ({
  isLoggedIn,
  isDesktop,
  token,
  location: {
    search = ''
  },
  history
}) => {
  if (isLoggedIn) {
    const {
      consent
    } = parse(search);

    if (consent) {
      const redirectTo = `/consent?consent=${consent}&token=${token}`;
      return /*#__PURE__*/React.createElement(Redirect, {
        to: redirectTo
      });
    } else {
      history.goBack();
    }
  }

  const child = /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: PATHS.LOGIN_VIA_EMAIL,
    render: props => /*#__PURE__*/React.createElement(LoginEmailForm, props)
  }), /*#__PURE__*/React.createElement(Route, {
    path: PATHS.LOGIN,
    render: props => /*#__PURE__*/React.createElement(LoginEmailForm, _extends({
      prepareState: LoginOptions,
      isDesktop: isDesktop
    }, props))
  }));

  if (!isDesktop) {
    return child;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.wrapper)
  }, /*#__PURE__*/React.createElement(Panel, {
    className: styles.panel
  }, child));
};

export default withSizes(mapSizesToProps)(Login);
const _excluded = ["isLoggedIn", "isLoading"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import Switch, { Case } from '../Switch';
import { LoginDescription } from '../../pages/Login/index';
import LoginEmailForm from '../../pages/Login/LoginEmailForm';
import { PrepareState } from '../../pages/Login/CreateAccountFreeTrial';
import styles from './SignUp.module.css';
export const DialogSignUp = ({
  defaultRoute,
  trigger
}) => {
  const [parent, setParent] = useState();
  const [route, setRoute] = useState(defaultRoute);
  const wrapperRef = useRef();
  useEffect(() => {
    setParent(wrapperRef.current);
  }, []);
  useEffect(() => {
    if (!parent) return;
    const timer = setTimeout(() => parent.querySelectorAll('a').forEach(link => link.onclick = onLinkClick));
    return () => clearTimeout(timer);
  }, [parent, route]);

  function onLinkClick(e) {
    e.preventDefault();
    setRoute(e.currentTarget.getAttribute('href'));
  }

  return /*#__PURE__*/React.createElement(Modal, {
    defaultOpen: true,
    classes: styles,
    trigger: trigger,
    modalProps: {
      ref: wrapperRef
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    case: route
  }, /*#__PURE__*/React.createElement(Case, {
    of: "/login"
  }, /*#__PURE__*/React.createElement(LoginDescription, null)), /*#__PURE__*/React.createElement(Case, {
    of: "/login/email"
  }, /*#__PURE__*/React.createElement(LoginEmailForm, {
    isDesktop: true,
    showBack: false
  })), /*#__PURE__*/React.createElement(Case, {
    of: "/sign-up"
  }, /*#__PURE__*/React.createElement(LoginEmailForm, {
    signUp: true,
    isDesktop: true,
    prepareState: PrepareState,
    showBack: false
  }))));
};
DialogSignUp.defaultProps = {
  defaultRoute: '/sign-up'
};

const mapStateToProps = ({
  user: {
    isLoading,
    data
  }
}) => ({
  isLoading,
  isLoggedIn: !!data.id
});

export default connect(mapStateToProps)(_ref => {
  let {
    isLoggedIn,
    isLoading
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return isLoading || isLoggedIn ? null : /*#__PURE__*/React.createElement(DialogSignUp, props);
});
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { checkHasPremium, checkIsLoggedIn } from './../../pages/UserSelectors';

const ShowIf = ({
  beta,
  loggedIn,
  premium,
  isBeta,
  isLoggedIn,
  isPremium,
  children,
  condition
}) => {
  if (beta && isBeta) {
    return /*#__PURE__*/React.createElement(Fragment, null, children);
  }

  if (premium && isPremium) {
    return /*#__PURE__*/React.createElement(Fragment, null, children);
  }

  if (loggedIn && isLoggedIn) {
    return /*#__PURE__*/React.createElement(Fragment, null, children);
  }

  if (condition) {
    return /*#__PURE__*/React.createElement(Fragment, null, children);
  }

  return '';
};

const mapStateToProps = (state, props) => {
  return {
    isBeta: props.beta !== void 0 ? state.rootUi.isBetaModeEnabled : undefined,
    isPremium: props.premium !== void 0 ? checkHasPremium(state) : undefined,
    isLoggedIn: props.loggedIn !== void 0 ? checkIsLoggedIn(state) : undefined
  };
};

export default connect(mapStateToProps)(ShowIf);
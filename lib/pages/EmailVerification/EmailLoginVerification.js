import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import * as qs from 'query-string';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import * as actions from './../../actions/types';
import PageLoader from '../../components/Loader/PageLoader';
import MobileWrapper from '../Login/Mobile/MobileWrapper';
import styles from './Verification.module.css';
export const EmailLoginVerification = ({
  isSuccess,
  isError,
  isDesktop
}) => {
  if (isSuccess) {
    return /*#__PURE__*/React.createElement(Redirect, {
      to: "/"
    });
  }

  let child;
  const className = cx(styles.wrapper, !isDesktop && styles.mobile);

  if (isError) {
    child = /*#__PURE__*/React.createElement("div", {
      className: className
    }, /*#__PURE__*/React.createElement("h2", null, "Login failed"), /*#__PURE__*/React.createElement("p", null, "Maybe you are trying to log in with an old email link. Please, make sure, that you are using the latest link"), /*#__PURE__*/React.createElement("div", null, "Back to", ' ', /*#__PURE__*/React.createElement(Link, {
      to: "/login",
      className: styles.link
    }, "log in options")));
  } else {
    child = /*#__PURE__*/React.createElement("div", {
      className: className
    }, /*#__PURE__*/React.createElement(PageLoader, {
      text: "Verification",
      className: styles.loader
    }));
  }

  return isDesktop ? child : /*#__PURE__*/React.createElement(MobileWrapper, {
    withHeader: true
  }, child);
};

const mapStateToProps = ({
  rootUi
}) => {
  return {
    isError: rootUi.loginError,
    isSuccess: rootUi.loginSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emailLogin: payload => {
      dispatch({
        type: actions.USER_EMAIL_LOGIN,
        payload
      });
    }
  };
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), lifecycle({
  componentDidMount() {
    const payload = qs.parse(this.props.location.search);
    this.props.emailLogin(payload);
  }

}));
export default enhance(EmailLoginVerification);
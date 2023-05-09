import React from 'react';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import Button from '@santiment-network/ui/Button';
import styles from './UnAuth.module.css';

const UnAuth = ({
  history
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    className: styles.title
  }, "Create an account to get your Sanbase experience."), /*#__PURE__*/React.createElement("p", {
    className: styles.info
  }, "By having a Sanbase account, you can see more data and alerts about crypto projects. You can vote and comment on all you favorite alerts and more."), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "fill",
    accent: "positive",
    className: styles.btn,
    onClick: () => history.push(`/login?redirect_to=${history.location.pathname}`)
  }, "Create account"), /*#__PURE__*/React.createElement(Button, {
    accent: "positive",
    border: true,
    onClick: () => history.push(`/login?redirect_to=${history.location.pathname}`),
    className: cx(styles.btn, styles.loginBtn)
  }, "Log in")));
};

export default withRouter(UnAuth);
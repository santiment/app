import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import styles from './index.module.css';

const LoginEmailBtn = () => {
  return /*#__PURE__*/React.createElement(Link, {
    to: "/login/email",
    className: cx(styles.btn, styles.btn_email)
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "envelope",
    className: styles.btn__icon
  }), "Log in with Email");
};

export default LoginEmailBtn;
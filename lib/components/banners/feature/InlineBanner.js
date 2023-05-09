import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Button from '@santiment-network/ui/Button';
import styles from './InlineBanner.module.css';

const FeatureAnonBanner = ({
  className,
  title,
  description
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title), /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description)), /*#__PURE__*/React.createElement("div", {
    className: styles.buttons
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "fill",
    accent: "positive",
    as: Link,
    to: "/login",
    className: styles.btn
  }, "Log in"), /*#__PURE__*/React.createElement(Button, {
    variant: "flat",
    as: Link,
    to: "/sign-up",
    border: true,
    className: styles.btn
  }, "Create an account")));
};

export default FeatureAnonBanner;
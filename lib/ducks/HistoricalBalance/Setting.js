import React from 'react';
import cx from 'classnames';
import styles from './index.module.css';

const Setting = ({
  className,
  title,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.setting, className)
}, /*#__PURE__*/React.createElement("label", null, title), children);

export default Setting;
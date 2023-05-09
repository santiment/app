import React from 'react';
import cx from 'classnames';
import styles from './index.module.css';

const OrUseDivider = () => /*#__PURE__*/React.createElement("div", {
  className: styles.divider
}, /*#__PURE__*/React.createElement("span", {
  className: cx(styles.use, 'body-3')
}, "or use"));

export default OrUseDivider;
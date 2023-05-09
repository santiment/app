import React from 'react';
import cx from 'classnames';
import styles from './Widget.module.css';

const Widget = ({
  className,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.widget, className)
}, children);

export default Widget;
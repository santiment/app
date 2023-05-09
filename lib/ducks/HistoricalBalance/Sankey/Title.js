import React from 'react';
import cx from 'classnames';
import styles from './index.module.css';

const Title = ({
  children,
  className
}) => /*#__PURE__*/React.createElement("h3", {
  className: cx(styles.title, className)
}, children);

export default Title;
import React from 'react';
import cx from 'classnames';
import styles from './Block.module.css';

const Block = ({
  label,
  children,
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, className)
}, /*#__PURE__*/React.createElement("div", {
  className: styles.label
}, label), children);

export default Block;
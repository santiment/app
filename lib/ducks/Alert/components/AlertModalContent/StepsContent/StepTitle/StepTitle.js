import React from 'react';
import cx from 'classnames';
import styles from './StepTitle.module.css';

const StepTitle = ({
  title,
  description,
  disabled,
  className,
  size
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, disabled && styles.disabled, className)
}, /*#__PURE__*/React.createElement("div", {
  className: styles.titleWrapper
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.title, size === 's' && styles.smallTitle)
}, title), description && /*#__PURE__*/React.createElement("div", {
  className: styles.description
}, description)));

export default StepTitle;
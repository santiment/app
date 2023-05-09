import React from 'react';
import cx from 'classnames';
import styles from './index.module.css';

const Section = ({
  title,
  children,
  Icon,
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.section, className)
}, /*#__PURE__*/React.createElement("h3", {
  className: styles.title
}, /*#__PURE__*/React.createElement(Icon, null), title), children);

export default Section;
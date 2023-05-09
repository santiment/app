import React from 'react';
import styles from './index.module.css';

const Section = ({
  title,
  children,
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: className
}, /*#__PURE__*/React.createElement("h3", {
  className: styles.section
}, title), children);

export default Section;
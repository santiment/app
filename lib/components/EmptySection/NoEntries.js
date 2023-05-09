import React from 'react';
import cx from 'classnames';
import EmptySection from './EmptySection';
import styles from './NoEntries.module.css';

const NoEntries = ({
  title,
  desc,
  children,
  maxWidth
}) => /*#__PURE__*/React.createElement(EmptySection, null, /*#__PURE__*/React.createElement("div", {
  className: styles.description,
  style: {
    maxWidth
  }
}, title && /*#__PURE__*/React.createElement("div", {
  className: cx('body-1 txt-b mrg--b mrg-s', styles.title)
}, title), desc && /*#__PURE__*/React.createElement("div", {
  className: "body-2 mrg--b mrg-l"
}, desc), children));

export default NoEntries;
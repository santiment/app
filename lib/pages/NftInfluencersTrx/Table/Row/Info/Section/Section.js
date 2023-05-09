import React from 'react';
import cx from 'classnames';

const Section = ({
  title,
  className,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: cx('column justify', className)
}, /*#__PURE__*/React.createElement("div", {
  className: "txt-m c-casper"
}, title), children);

export default Section;
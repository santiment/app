function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import styles from './Header.module.css';

const Header = _ref => {
  let props = _extends({}, _ref);

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("h2", {
    className: styles.title
  }, "Apply metrics to the chart(s)"), /*#__PURE__*/React.createElement("h3", {
    className: styles.subtitle
  }, "Select metrics from the left sidebar and pick where you woud like to place them"));
};

export default Header;
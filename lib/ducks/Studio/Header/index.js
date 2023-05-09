function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef } from 'react';
import Settings from './Settings';
import styles from './index.module.css';
export const Header = props => /*#__PURE__*/React.createElement(Settings, _extends({}, props, {
  className: styles.settings
}));
export default (props => {
  const headerRef = useRef(null);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper,
    ref: headerRef
  }, /*#__PURE__*/React.createElement(Header, _extends({}, props, {
    headerRef: headerRef
  })));
});
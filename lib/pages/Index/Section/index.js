const _excluded = ["className", "As"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import styles from './index.module.css';
export const Section = ({
  title,
  children,
  className,
  id
}) => /*#__PURE__*/React.createElement("section", {
  className: cx(styles.wrapper, className),
  id: id || ''
}, title && /*#__PURE__*/React.createElement("h2", {
  className: styles.title
}, title), children);
export const Container = ({
  className,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.container, className)
}, children);
export const Row = _ref => {
  let {
    className,
    As
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(As, _extends({}, props, {
    className: cx(styles.row, className)
  }));
};
Row.defaultProps = {
  As: 'div'
};
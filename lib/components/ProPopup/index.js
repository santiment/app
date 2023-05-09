const _excluded = ["title", "description", "features", "isOpen"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@santiment-network/ui/Button';
import Dialog from '@santiment-network/ui/Dialog';
import styles from './index.module.css';
const EMPTY_ARRAY = [];

const ProPopup = _ref => {
  let {
    title,
    description,
    features,
    isOpen = false
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Dialog, _extends({
    size: "m",
    title: title,
    open: isOpen,
    classes: styles
  }, props), /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description), /*#__PURE__*/React.createElement("div", {
    className: styles.features
  }, features.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    className: styles.feature,
    key: idx
  }, item))), /*#__PURE__*/React.createElement(Button, {
    as: Link,
    to: "/pricing",
    variant: "fill",
    accent: "orange",
    className: styles.btn,
    onClick: props.onClose
  }, "Go Pro")));
};

ProPopup.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  features: PropTypes.array
};
ProPopup.defaultProps = {
  title: '',
  description: '',
  features: EMPTY_ARRAY
};
export default ProPopup;
const _excluded = ["className", "metricValues", "containerRef", "onDialogClose"],
      _excluded2 = ["title", "project", "suggesters"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import { useSuggestions } from './suggestions/hooks';
import LoginPopup from '../../../components/banners/feature/PopupBanner';
import AlertModal from '../../Alert/AlertModal';
import styles from './index.module.css';

const Alert = ({
  alert,
  render,
  createAlert
}) => {
  function onClick() {
    createAlert(alert);
  }

  return /*#__PURE__*/React.createElement(LoginPopup, null, /*#__PURE__*/React.createElement("div", {
    className: styles.alert,
    onClick: onClick
  }, render));
};

function getHeader(title, project) {
  let header = title;

  if (project) {
    header += ` (${project.ticker})`;
  }

  return header;
}

export default (_ref => {
  let {
    className,
    metricValues,
    containerRef,
    onDialogClose
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const suggestions = useSuggestions(metricValues);
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, "Create alert if:", /*#__PURE__*/React.createElement(AlertModal, {
    trigger: /*#__PURE__*/React.createElement("span", {
      className: styles.manual
    }, "Create alert manually")
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.suggestions
  }, suggestions.map(_ref2 => {
    let {
      title,
      project,
      suggesters
    } = _ref2,
        values = _objectWithoutProperties(_ref2, _excluded2);

    const header = getHeader(title, project);
    return /*#__PURE__*/React.createElement("div", {
      key: header,
      className: styles.suggestion
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, header), suggesters.map((suggest, i) => /*#__PURE__*/React.createElement(Alert, _extends({
      key: i
    }, rest, suggest(_objectSpread(_objectSpread(_objectSpread({}, rest), values), project))))));
  })));
});
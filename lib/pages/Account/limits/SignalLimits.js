function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useCallback } from 'react';
import Input from '@santiment-network/ui/Input';
import { updateUserSettingsCache, useUpdateUserSettings } from '../../../stores/user/settings';
import externalStyles from './../AccountPage.module.css';
import styles from './SignalLimits.module.css';
const VALIDATION_PROPS = {
  min: 0,
  type: 'number'
};

const SignalLimits = ({
  alertsPerDayLimit
}) => {
  const {
    email = 0,
    telegram = 0
  } = alertsPerDayLimit;
  const [updateUserSettings] = useUpdateUserSettings();
  const onChange = useCallback((key, value) => {
    if (value) {
      const updates = {
        alertsPerDayLimit: _objectSpread(_objectSpread({}, alertsPerDayLimit), {}, {
          [key]: value
        })
      };
      updateUserSettings(updates);
      updateUserSettingsCache(updates);
    }
  }, [alertsPerDayLimit]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.limits
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Daily limits:"), /*#__PURE__*/React.createElement("div", {
    className: styles.limitBlock
  }, /*#__PURE__*/React.createElement("div", {
    className: externalStyles.setting__left
  }, "Email notifications"), /*#__PURE__*/React.createElement("div", {
    className: externalStyles.setting__right
  }, /*#__PURE__*/React.createElement(Input, _extends({
    value: email
  }, VALIDATION_PROPS, {
    className: styles.input,
    onChange: ({
      target: {
        value
      }
    }) => onChange('email', value)
  })))), /*#__PURE__*/React.createElement("div", {
    className: styles.limitBlock
  }, /*#__PURE__*/React.createElement("div", {
    className: externalStyles.setting__left
  }, "Telegram notifications"), /*#__PURE__*/React.createElement("div", {
    className: externalStyles.setting__right
  }, /*#__PURE__*/React.createElement(Input, _extends({
    value: telegram
  }, VALIDATION_PROPS, {
    className: styles.input,
    onChange: ({
      target: {
        value
      }
    }) => onChange('telegram', value)
  })))));
};

export default SignalLimits;
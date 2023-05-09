const _excluded = ["settings"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import Input from '@santiment-network/ui/Input';
import styles from './Settings.module.css';

const getDefaultValue = (metric, settings, metricSettingsMap) => {
  const {
    defaultValue,
    key
  } = settings;

  if (metricSettingsMap) {
    const savedSettings = metricSettingsMap.get(metric);

    if (savedSettings) {
      const {
        [key]: value
      } = savedSettings;

      if (value) {
        return value;
      }
    }
  }

  return defaultValue;
}; // TODO: If query throws an error, metric will be disabled and settings will be collapsed [@vanguard | May 6, 2020]


const Setting = ({
  settings,
  metric,
  setMetricSettingMap,
  metricSettingsMap
}) => {
  const {
    key,
    label,
    constraints,
    component: Component,
    preTransformer
  } = settings;

  const stateUpdater = () => getDefaultValue(metric, settings, metricSettingsMap);

  const [value, setValue] = useState(stateUpdater);
  const [lastValidValue, setLastValidValue] = useState(stateUpdater);
  const [error, setError] = useState();
  useEffect(() => {
    if (!error) {
      if (Component) {
        if (value) {
          updateMetricSettings(value);
        }
      } else {
        if (+value) {
          updateMetricSettings(+value);
        }
      }
    }
  }, [value]);

  function onChange(data) {
    if (!Component) {
      const {
        currentTarget
      } = data;
      const {
        min,
        max
      } = constraints;
      const newValue = currentTarget.value;
      const isInvalid = newValue < min || newValue > max;
      currentTarget.setCustomValidity(isInvalid ? `${label} value should be between ${min} and ${max}` : '');
      currentTarget.reportValidity();
      setError(isInvalid);
      setValue(newValue);
    } else {
      setValue(preTransformer(data));
    }
  }

  function onBlur({
    currentTarget
  }) {
    if (!+currentTarget.value) {
      currentTarget.setCustomValidity('');
      setValue(lastValidValue);
    }
  }

  function updateMetricSettings(value) {
    setLastValidValue(value);
    setMetricSettingMap(state => {
      const prevSettings = state.get(metric) || {};
      const newState = new Map(state);
      newState.set(metric, _extends(prevSettings, {
        [key]: value
      }));
      return newState;
    });
  }

  if (Component) {
    return /*#__PURE__*/React.createElement("label", {
      className: styles.setting
    }, /*#__PURE__*/React.createElement(Component, {
      className: styles.input,
      onChange: onChange,
      value: value
    }), label);
  }

  return /*#__PURE__*/React.createElement("label", {
    className: styles.setting
  }, /*#__PURE__*/React.createElement(Input, {
    className: styles.input,
    type: "number",
    value: value,
    onChange: onChange,
    onBlur: onBlur
  }), label);
};

function onAdjustmentClick(e) {
  e.stopPropagation();
}

const Settings = _ref => {
  let {
    settings
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", {
    className: styles.settings,
    onClick: onAdjustmentClick
  }, settings.map(settings => /*#__PURE__*/React.createElement(Setting, _extends({
    key: settings.key,
    settings: settings
  }, props))));
};

export default Settings;
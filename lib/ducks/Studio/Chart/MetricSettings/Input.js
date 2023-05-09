const _excluded = ["defaultValue", "onChange"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';

const Input = _ref => {
  let {
    defaultValue,
    onChange
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [value, setValue] = useState(defaultValue);
  const [lastValidValue, setLastValidValue] = useState(defaultValue);
  const inputRef = useRef();
  useEffect(resize, [value]);
  useEffect(() => setValue(defaultValue), [defaultValue]);

  function resize() {
    inputRef.current.style.width = value.toString().length + 1 + 'ch';
  }

  function onInputChange({
    target: {
      value
    }
  }) {
    setValue(value);

    if (value) {
      setLastValidValue(value);
    }

    onChange(+value);
  }

  function onFocus() {
    if (!+value) {
      setValue('');
    }
  }

  function onBlur() {
    if (!+value) {
      setValue(lastValidValue);
    }
  }

  return /*#__PURE__*/React.createElement("input", _extends({
    className: styles.input,
    onChange: onInputChange,
    onFocus: onFocus,
    onBlur: onBlur,
    ref: inputRef
  }, props, {
    value: value
  }));
};

Input.defaultProps = {
  defaultValue: 0
};
export default Input;
const _excluded = ["name", "type", "step", "prefix", "placeholder", "disabled", "onChange", "min", "max", "validator", "validate", "el"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Input from '@santiment-network/ui/Input';
import { Field, ErrorMessage } from 'formik';
import styles from './FormikInput.module.css';

const FormikInput = _ref => {
  let {
    name,
    type,
    step = 'any',
    prefix,
    placeholder,
    disabled = false,
    onChange,
    min,
    max,
    validator,
    validate,
    el: El = Input
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Field, {
    name: name,
    validate: validate,
    render: ({
      field,
      form
    }) => {
      const showPrefix = prefix && !!field.value;
      return /*#__PURE__*/React.createElement("div", {
        className: styles.field
      }, showPrefix && /*#__PURE__*/React.createElement("span", {
        className: styles.prefix
      }, prefix), /*#__PURE__*/React.createElement(El, _extends({
        className: cx(styles.input, showPrefix && styles.inputWithPrefix),
        id: name,
        type: type,
        name: name,
        step: step,
        min: min,
        max: max,
        placeholder: placeholder,
        disabled: disabled,
        noValidate: true,
        isError: validator ? !validator(field.value) : form.errors[name],
        onChange: value => {
          const oldValue = value.target.value;
          const newValue = type === 'number' && oldValue.length > 0 ? parseFloat(oldValue) : oldValue;
          form.setFieldValue(name, newValue);
          form.setFieldTouched(name, true);
          onChange && onChange(newValue);
        },
        value: field.value
      }, rest)), /*#__PURE__*/React.createElement(ErrorMessage, {
        name: name
      }, msg => /*#__PURE__*/React.createElement("div", {
        className: "error error-message"
      }, msg)));
    }
  });
};

export default FormikInput;
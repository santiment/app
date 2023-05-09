const _excluded = ["isClearable", "name", "multi", "isCreatable", "onChange", "validator", "notificationText", "showErrorNotification"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { connect } from 'react-redux';
import Select from '@santiment-network/ui/Select/Select';
import { Field } from 'formik';
import { Creatable } from 'react-select-virtualized';
import { showNotification } from '../../actions/rootActions';
import './FormikSelect.scss';

const FormikSelect = _ref => {
  let {
    isClearable = true,
    name,
    multi = false,
    isCreatable = false,
    onChange,
    validator,
    notificationText,
    showErrorNotification
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Field, {
    name: name,
    render: ({
      field,
      form
    }) => {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Select, _extends({
        maxHeight: 330,
        clearable: isClearable,
        selectComponent: isCreatable ? Creatable : undefined,
        multi: multi,
        classNamePrefix: "react-select",
        minimumInput: 1,
        onChange: value => {
          const isValid = !validator || validator(value);
          const newValue = isValid ? value : field.value;
          form.setFieldValue(name, newValue);
          onChange && onChange(newValue);

          if (!isValid && notificationText) {
            showErrorNotification(notificationText);
          }
        },
        value: field.value
      }, rest)), form.errors[name] && /*#__PURE__*/React.createElement("div", {
        className: "error error-message"
      }, form.errors[name]));
    }
  });
};

const mapDispatchToProps = dispatch => ({
  showErrorNotification: text => {
    dispatch(showNotification({
      variant: 'error',
      title: text
    }));
  }
});

export default connect(null, mapDispatchToProps)(FormikSelect);
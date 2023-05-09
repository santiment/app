import React from 'react';
import cx from 'classnames';
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes';
import { Field } from 'formik';
import FormikLabel from './FormikLabel';
import styles from './FormikCheckbox.module.css';

const FormikCheckbox = props => {
  const {
    name
  } = props;
  return /*#__PURE__*/React.createElement(Field, {
    name: name,
    render: ({
      field,
      form
    }) => {
      return /*#__PURE__*/React.createElement(CheckboxWrapper, props);
    }
  });
};

export const CheckboxWrapper = ({
  name,
  isActive,
  onClick,
  disabled,
  required,
  label,
  className,
  classes = {}
}) => {
  const clickHandler = !disabled ? onClick : null;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(Checkbox, {
    className: styles.checkbox,
    disabled: disabled,
    isActive: isActive,
    name: name,
    onClick: clickHandler
  }), /*#__PURE__*/React.createElement(FormikLabel, {
    text: label,
    className: cx(styles.checkboxLabel, required && styles.required, classes.toggleLabel),
    onClick: clickHandler
  }));
};
export default FormikCheckbox;
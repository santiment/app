import React from 'react';
import cx from 'classnames';
import styles from './FormikRadio.module.css';

const FormikRadio = ({
  item,
  isSelected,
  onClick,
  classes = {}
}) => {
  const {
    label
  } = item;
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.radio, classes.radioContainer, isSelected && styles.selected),
    onClick: () => onClick(item)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.btn, classes.radio)
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.radioLabel
  }, label));
};

export default FormikRadio;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useField } from 'formik';
import StepTitle from '../StepTitle/StepTitle';
import BlockInput from './BlockInput/BlockInput';
import { clipText } from '../../../../utils';
import styles from './NameAndDescription.module.css';

const NameAndDescription = () => {
  const [titleField] = useField('title');
  const [descriptionField] = useField('description');
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StepTitle, {
    title: "Name & Description",
    className: styles.title
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BlockInput, _extends({
    label: "Alert name"
  }, titleField, {
    value: clipText(titleField.value, 70),
    blockClassname: styles.titleBlock
  })), /*#__PURE__*/React.createElement(BlockInput, _extends({
    label: "Description"
  }, descriptionField, {
    blockClassname: styles.descriptionBlock
  })))));
};

export default NameAndDescription;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Toggle from '@santiment-network/ui/Toggle';
import Icon from '@santiment-network/ui/Icon';
import styles from './PrivacySelector.module.css';
import { useField } from 'formik';

const IconNotActive = props => /*#__PURE__*/React.createElement(Icon, _extends({}, props, {
  type: "eye-disabled"
}));

const IconActive = props => /*#__PURE__*/React.createElement(Icon, _extends({}, props, {
  type: "eye"
}));

const PrivacySelector = () => {
  const [, {
    value
  }, {
    setValue
  }] = useField('isPublic');
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, value ? 'Public' : 'Private', /*#__PURE__*/React.createElement(Toggle, {
    isActive: value,
    IconActive: IconActive,
    IconNotActive: IconNotActive,
    onClick: () => setValue(!value)
  }));
};

export default PrivacySelector;
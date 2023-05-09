const _excluded = ["triggerButtonProps", "disabled"],
      _excluded2 = ["variant", "border", "classes", "label"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Button from '@santiment-network/ui/Button';

const AlertTriggerButton = _ref => {
  let {
    triggerButtonProps,
    disabled
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const {
    variant,
    border,
    classes,
    label
  } = triggerButtonProps,
        restTriggerButtonProps = _objectWithoutProperties(triggerButtonProps, _excluded2);

  return /*#__PURE__*/React.createElement(Button, _extends({
    variant: variant,
    border: border,
    disabled: disabled,
    accent: "positive",
    className: classes
  }, restTriggerButtonProps, rest), label);
};

AlertTriggerButton.defaultProps = {
  triggerButtonProps: {
    label: 'Create alert',
    variant: 'fill',
    border: false
  }
};
export default AlertTriggerButton;
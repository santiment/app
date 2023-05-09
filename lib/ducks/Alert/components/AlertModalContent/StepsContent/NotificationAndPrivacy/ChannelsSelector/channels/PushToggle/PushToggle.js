import React from 'react';
import { Link } from 'react-router-dom';
import SourceToggle from '../SourceToggle';

const PushToggle = ({
  disabled,
  isActive,
  onChange
}) => /*#__PURE__*/React.createElement(SourceToggle, {
  disabled: disabled,
  isActive: isActive,
  onChange: onChange,
  label: /*#__PURE__*/React.createElement("div", {
    className: "row v-center nowrap"
  }, "Push", disabled && /*#__PURE__*/React.createElement(Link, {
    to: "/account#notifications",
    className: "btn c-green mrg-xs mrg--l"
  }, "Enable notifications"))
}, "Get fast notifications");

export default PushToggle;
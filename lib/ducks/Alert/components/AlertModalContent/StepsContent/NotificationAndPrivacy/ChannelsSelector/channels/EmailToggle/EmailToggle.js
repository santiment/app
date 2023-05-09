import React from 'react';
import { Link } from 'react-router-dom';
import SourceToggle from '../SourceToggle';

const EmailToggle = ({
  disabled,
  email,
  isActive,
  onChange
}) => /*#__PURE__*/React.createElement(SourceToggle, {
  label: /*#__PURE__*/React.createElement("div", {
    className: "row v-center nowrap"
  }, "Email", disabled && /*#__PURE__*/React.createElement(Link, {
    to: "/account#notifications",
    className: "btn c-green mrg-xs mrg--l"
  }, "Enable notifications")),
  disabled: disabled,
  onChange: onChange,
  isActive: isActive
}, email);

export default EmailToggle;
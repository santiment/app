import React from 'react';
import { Link } from 'react-router-dom';
import SourceToggle from '../SourceToggle';

const TelegramToggle = ({
  disabled,
  isActive,
  onChange
}) => {
  return /*#__PURE__*/React.createElement(SourceToggle, {
    disabled: disabled,
    isActive: isActive,
    onChange: onChange,
    label: /*#__PURE__*/React.createElement("div", {
      className: "row v-center nowrap"
    }, "Telegram", disabled && /*#__PURE__*/React.createElement(Link, {
      to: "/account#notifications",
      className: "btn c-green mrg-xs mrg--l"
    }, "Enable notifications"))
  }, "You will receive notifications to the connected telegram account");
};

export default TelegramToggle;
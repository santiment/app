function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cx from 'classnames';
import Toggle from '@santiment-network/ui/Toggle';
import Button from '@santiment-network/ui/Button';
import { saveToggle } from '../../../utils/localStorage';
import styles from './SocialDominanceToggle.module.css';

const SocialDominanceToggle = ({
  className,
  options = {},
  setOptions
}) => {
  const isActive = options.isSocialDominanceActive;

  function toggle() {
    setOptions(state => _objectSpread(_objectSpread({}, state), {}, {
      isSocialDominanceActive: saveToggle('isSocialDominanceActive', !state.isSocialDominanceActive)
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "flat",
    onClick: toggle,
    className: styles.button
  }, /*#__PURE__*/React.createElement(Toggle, {
    className: styles.toggle,
    isActive: isActive
  }), "Social Dominance"));
};

export default SocialDominanceToggle;
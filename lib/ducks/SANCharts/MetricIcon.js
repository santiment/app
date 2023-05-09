const _excluded = ["node", "color"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Label from '@santiment-network/ui/Label';
import Icon from '@santiment-network/ui/Icon';
import { BARS } from '../Chart/nodes';
const CASPER = '#9faac4';
export default (_ref => {
  let {
    node,
    color = CASPER
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  if (!node) {
    return /*#__PURE__*/React.createElement(Label, _extends({
      variant: "circle",
      accent: "persimmon"
    }, rest));
  }

  const props = BARS.has(node) ? {
    type: 'chart-bars',
    fill: color
  } : {
    type: 'chart-line',
    fill: color,
    stroke: color
  };
  return /*#__PURE__*/React.createElement(Icon, _extends({}, rest, props));
});
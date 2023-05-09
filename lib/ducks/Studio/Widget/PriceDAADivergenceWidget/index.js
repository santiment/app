function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import Widget from '../Widget';
import ChartWidget, { Chart } from '../ChartWidget';
import { Metric } from '../../../dataHub/metrics';
import styles from './index.module.css';
export const buildTitle = title => ({
  onDeleteChartClick,
  settings
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.title
}, title, " (", settings.ticker, ")", onDeleteChartClick && /*#__PURE__*/React.createElement(Icon, {
  type: "close-small",
  onClick: onDeleteChartClick,
  className: styles.delete
}));
const Title = buildTitle('Price DAA Divergence');

const PriceDAADivergenceWidget = props => /*#__PURE__*/React.createElement(Widget, null, /*#__PURE__*/React.createElement(Chart, _extends({
  TopLeftComponent: Title
}, props)));

export const priceDAADivergenceBuilder = (widget, metrics) => props => ChartWidget.new(_objectSpread(_objectSpread({
  isBlocked: true
}, props), {}, {
  metrics
}), widget);
PriceDAADivergenceWidget.new = priceDAADivergenceBuilder(PriceDAADivergenceWidget, [Metric.price_usd, Metric.price_daa_divergence]);
export default PriceDAADivergenceWidget;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import MetricHighLow from '../MetricHighLow';
import { formatNumber } from '../../utils/formatting';

const priceFormatter = value => formatNumber(value, {
  currency: 'USD'
});

const PriceChangesWidget = props => /*#__PURE__*/React.createElement(MetricHighLow, _extends({}, props, {
  metric: "price_usd",
  formatter: priceFormatter,
  label: "Price"
}));

export default PriceChangesWidget;
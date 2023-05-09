function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PriceDAADivergenceWidget, { priceDAADivergenceBuilder, buildTitle } from './index';
import { Metric } from '../../../dataHub/metrics';
const Title = buildTitle('Adjusted Price DAA Divergence');

const AdjustedPriceDAADivergenceWidget = props => /*#__PURE__*/React.createElement(PriceDAADivergenceWidget, _extends({}, props, {
  TopLeftComponent: Title
}));

AdjustedPriceDAADivergenceWidget.new = priceDAADivergenceBuilder(AdjustedPriceDAADivergenceWidget, [Metric.price_usd, Metric.adjusted_price_daa_divergence]);
export default AdjustedPriceDAADivergenceWidget;
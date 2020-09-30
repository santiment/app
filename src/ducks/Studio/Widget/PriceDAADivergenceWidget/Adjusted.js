import React from 'react'
import PriceDAADivergenceWidget, {
  priceDAADivergenceBuilder,
  buildTitle
} from './index'
import { Metric } from '../../../dataHub/metrics'

const Title = buildTitle('Adjusted Price DAA Divergence')

const AdjustedPriceDAADivergenceWidget = props => (
  <PriceDAADivergenceWidget {...props} TopLeftComponent={Title} />
)

AdjustedPriceDAADivergenceWidget.new = priceDAADivergenceBuilder(
  AdjustedPriceDAADivergenceWidget,
  [Metric.price_usd, Metric.adjusted_price_daa_divergence]
)

export default AdjustedPriceDAADivergenceWidget

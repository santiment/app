import React from 'react'
import MetricHighLow from '../MetricHighLow'
import { formatNumber } from '../../utils/formatting'

const priceFormatter = value => formatNumber(value, { currency: 'USD' })

const PriceChangesWidget = props => (
  <MetricHighLow
    {...props}
    metric='price_usd'
    formatter={priceFormatter}
    label='Price'
  />
)

export default PriceChangesWidget

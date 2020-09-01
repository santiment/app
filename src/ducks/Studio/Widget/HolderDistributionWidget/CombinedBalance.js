import React from 'react'
import HolderDistributionWidget from './index'
import ChartWidget from '../ChartWidget'
import { HOLDER_DISTRIBUTION_COMBINED_BALANCE_PERCENT_METRICS } from '../../Chart/Sidepanel/HolderDistribution/metrics'
import { TabCombinedBalanceMetrics } from '../../Chart/Sidepanel/HolderDistribution/Tabs'

const HolderDistributionCombinedBalanceWidget = ({ ...props }) => {
  return (
    <HolderDistributionWidget
      TabMetrics={TabCombinedBalanceMetrics}
      sidepanelHeader={`${
        props.settings.ticker
      } Holder Distribution Combined Balance`}
      {...props}
    />
  )
}

HolderDistributionCombinedBalanceWidget.new = props =>
  ChartWidget.new(
    {
      metrics: HOLDER_DISTRIBUTION_COMBINED_BALANCE_PERCENT_METRICS,
      mergedMetrics: [],
      ...props
    },
    HolderDistributionCombinedBalanceWidget
  )

export default HolderDistributionCombinedBalanceWidget

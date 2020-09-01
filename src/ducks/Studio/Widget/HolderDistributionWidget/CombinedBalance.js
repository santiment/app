import React from 'react'
import HolderDistributionWidget from './index'
import ChartWidget from '../ChartWidget'
import { HOLDER_DISTRIBUTION_PERCENT_METRICS } from '../../Chart/Sidepanel/HolderDistribution/metrics'
import { TabCombinedBalanceMetrics } from '../../Chart/Sidepanel/HolderDistribution/Tabs'

const HolderDistributionCombinedBalanceWidget = ({ ...props }) => (
  <HolderDistributionWidget
    TabMetrics={TabCombinedBalanceMetrics}
    sidepanelHeader={`${
      props.settings.ticker
    } Holders Distribution Combined Balance`}
    {...props}
  />
)

HolderDistributionCombinedBalanceWidget.new = props =>
  ChartWidget.new(
    {
      metrics: HOLDER_DISTRIBUTION_PERCENT_METRICS,
      mergedMetrics: [],
      ...props
    },
    HolderDistributionCombinedBalanceWidget
  )

export default HolderDistributionCombinedBalanceWidget

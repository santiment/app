import React from 'react'
import HolderDistributionWidget, { holderDistributionBuilder } from './index'
import { HOLDER_DISTRIBUTION_PERCENT_METRICS } from '../../Chart/Sidepanel/HolderDistribution/metrics'
import { TabCombinedBalanceMetrics } from '../../Chart/Sidepanel/HolderDistribution/Tabs'

const HolderDistributionCombinedBalanceWidget = ({ ...props }) => (
  <HolderDistributionWidget
    isWithTabs
    TabMetrics={TabCombinedBalanceMetrics}
    sidepanelHeader={`${
      props.settings.ticker
    } Holders Distribution Combined Balance`}
    {...props}
  />
)

HolderDistributionCombinedBalanceWidget.new = holderDistributionBuilder(
  HolderDistributionCombinedBalanceWidget,
  HOLDER_DISTRIBUTION_PERCENT_METRICS
)

export default HolderDistributionCombinedBalanceWidget

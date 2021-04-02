import React from 'react'
import HolderDistributionWidget, {
  holderDistributionBuilder,
  HoldersDistributionTitle
} from './index'
import { HOLDERS_DISTRIBUTION_LABELED_METRICS } from '../../Chart/Sidepanel/HolderDistribution/metrics'
import { TabLabeledHoldersMetrics } from '../../Chart/Sidepanel/HolderDistribution/Tabs'

const HolderDistributionLabeledWidget = props => {
  function onChangeLabels (labels) {
    const { widget, rerenderWidgets } = props

    widget.MetricSettingMap = new Map(widget.MetricSettingMap)

    widget.metrics.forEach(m => {
      const prevSettings = widget.MetricSettingMap.get(m)
      widget.MetricSettingMap.set(m, {
        ...prevSettings,
        label: labels.length > 0 ? labels[0] : 'all'
      })
    })

    rerenderWidgets()
  }

  return (
    <HolderDistributionWidget
      onChangeLabels={onChangeLabels}
      TabMetrics={TabLabeledHoldersMetrics}
      sidepanelHeader={
        <HoldersDistributionTitle
          ticker={props.settings.ticker}
          description='labeled by balance of addresses'
        />
      }
      {...props}
    />
  )
}

HolderDistributionLabeledWidget.new = holderDistributionBuilder(
  HolderDistributionLabeledWidget,
  HOLDERS_DISTRIBUTION_LABELED_METRICS
)

export default HolderDistributionLabeledWidget

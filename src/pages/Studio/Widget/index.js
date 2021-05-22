import React from 'react'
import { SelectorNode } from 'studio/metrics/selector'
import { newExternalWidget } from './utils'
import ChartWidget from './Chart'
import FeesDistributionWidget from './FeesDistribution'
import HoldersDistributionTableWidget from './HoldersDistributionTable'

export const ExternalWidgetCreator = {
  [SelectorNode.FeesDistribution.key]: () =>
    newExternalWidget(FeesDistributionWidget, {
      previewTitle: 'Fees Distribution'
    }),
  [SelectorNode.HoldersDistributionTable.key]: () =>
    newExternalWidget(HoldersDistributionTableWidget, {
      previewTitle: 'Top Holders Table'
    })
}

export function getExternalWidget (node) {
  const newWidget = ExternalWidgetCreator[node.key]
  if (newWidget) return newWidget()
}

const Widget = props => {
  const { widget } = props

  if (widget.Widget === FeesDistributionWidget) {
    return <FeesDistributionWidget {...props} />
  } else if (widget.Widget === HoldersDistributionTableWidget) {
    return <HoldersDistributionTableWidget {...props} />
  }

  return <ChartWidget {...props} />
}

export default Widget

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { newWidget } from 'studio/stores/widgets'
import { SelectorNode } from 'studio/metrics/selector'
import ChartWidget from './Chart'
import FeesDistributionWidget from './FeesDistribution'
import HoldersDistributionTableWidget, {
  checkIsHDTableWidget
} from './HoldersDistributionTable'
import { useStore } from '../stores'

export function useWidgetsController () {
  const [widgets, setWidgets] = useState([])

  function onWidget (target, widget) {
    const Widget = { widget, target }
    setWidgets(widgets => [...widgets, Widget])
    const filter = widget => widget !== Widget
    return () => setWidgets(widgets => widgets.filter(filter))
  }

  return {
    widgets,
    onWidget
  }
}

export function getExternalWidget (node) {
  if (node === SelectorNode.FeesDistribution) {
    return newWidget(FeesDistributionWidget, {
      isExternal: true,
      scrollAlign: 'start',
      previewTitle: 'Fees Distribution'
    })
  } else if (node === SelectorNode.HoldersDistributionTable) {
    return newWidget(HoldersDistributionTableWidget, {
      isExternal: true,
      scrollAlign: 'start',
      previewTitle: 'Top Holders Table'
    })
  }
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

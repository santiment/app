import ChartWidget from 'studio/ChartWidget'
import HolderDistributionWidget from 'studio/HolderDistributionWidget'
import HolderDistributionCombinedBalanceWidget from 'studio/HolderDistributionWidget/Balance'
import PriceDAADivergenceWidget from 'studio/PriceDAAWidget'
import { newWidget } from 'studio/stores/widgets'
import { SelectorNode } from 'studio/metrics/selector'
import AdjustedPriceDAADivergenceWidget from 'studio/PriceDAAWidget/Adjusted'
import FeesDistribution from '../Widget/FeesDistribution'
import HoldersDistributionTable from '../Widget/HoldersDistributionTable'

const KeyToWidget = {
  ChartWidget,
  HolderDistributionWidget,
  HolderDistributionCombinedBalanceWidget,
  PriceDAADivergenceWidget,
  AdjustedPriceDAADivergenceWidget,
  FeesDistribution,
  HoldersDistributionTable
}
export const WidgetToKeyMap = new Map()
Object.keys(KeyToWidget).forEach(key => {
  WidgetToKeyMap.set(KeyToWidget[key], key)
})

export function getWidgetByKey (key) {
  const Widget = KeyToWidget[key]
  return newWidget(Widget)
}

const KeyToSubwidget = {
  [SelectorNode.TopTransactionsTable.key]: SelectorNode.TopTransactionsTable
}

function getSubwidgetByKey (key) {
  return KeyToSubwidget[key]
}

export function parseSubwidgets (_subwidgets) {
  const subwidgets = _subwidgets || []
  const ParsedSubwidgets = {
    subwidgets: [],
    SubwidgetSettings: {}
  }
  subwidgets.forEach(({ widget, from, to }, i) => {
    ParsedSubwidgets.subwidgets[i] = getSubwidgetByKey(widget)
    ParsedSubwidgets.SubwidgetSettings[widget] = {
      from,
      to
    }
  })
  return ParsedSubwidgets
}

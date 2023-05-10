import ChartWidget from 'studio/ChartWidget/index.svelte'
import HolderDistributionWidget from 'studio/HolderDistributionWidget/index.svelte'
import HolderDistributionCombinedBalanceWidget from 'studio/HolderDistributionWidget/Balance.svelte'
import HolderDistributionLabeledWidget from 'studio/HolderDistributionWidget/Labeled.svelte'
import PriceDAADivergenceWidget from 'studio/PriceDAAWidget/index.svelte'
import { newWidget } from 'studio/stores/widgets'
import { SelectorNode } from 'studio/metrics/selector'
import AdjustedPriceDAADivergenceWidget from 'studio/PriceDAAWidget/Adjusted.svelte'
import FeesDistribution from '../Widget/FeesDistribution'
import HoldersDistributionTable from '../Widget/HoldersDistributionTable'
import TopExchangesTable from '../Widget/TopExchangesTable'

const KeyToWidget = {
  ChartWidget,
  HolderDistributionWidget,
  HolderDistributionCombinedBalanceWidget,
  HolderDistributionLabeledWidget,
  PriceDAADivergenceWidget,
  AdjustedPriceDAADivergenceWidget,
  FeesDistribution,
  HoldersDistributionTable,
  TopExchangesTable,
}
export const WidgetToKeyMap = new Map()
Object.keys(KeyToWidget).forEach((key) => {
  WidgetToKeyMap.set(KeyToWidget[key], key)
})

export function getWidgetByKey(key) {
  const Widget = KeyToWidget[key]
  return newWidget(Widget)
}

const KeyToSubwidget = {
  [SelectorNode.TopTransactionsTable.key]: SelectorNode.TopTransactionsTable,
}

function getSubwidgetByKey(key) {
  return KeyToSubwidget[key]
}

export function parseSubwidgets(_subwidgets) {
  const subwidgets = _subwidgets || []
  const ParsedSubwidgets = {
    subwidgets: [],
    SubwidgetSettings: {},
  }
  subwidgets.forEach(({ k, f, t }, i) => {
    ParsedSubwidgets.subwidgets[i] = getSubwidgetByKey(k)
    ParsedSubwidgets.SubwidgetSettings[k] = {
      from: f,
      to: t,
    }
  })
  return ParsedSubwidgets
}

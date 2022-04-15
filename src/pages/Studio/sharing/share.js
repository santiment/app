import { shareWidget } from 'studio/sharing/widget'
import { WidgetToKeyMap } from './widgets'
import FeesDistribution from '../Widget/FeesDistribution'
import HoldersDistributionTable from '../Widget/HoldersDistributionTable'
import TopExchangesTable from '../Widget/TopExchangesTable'

function shareChartWidget(widget) {
  const shared = {}
  shared.widget = WidgetToKeyMap.get(widget.Widget)

  if (
    widget.Widget === FeesDistribution ||
    widget.Widget === HoldersDistributionTable ||
    widget.Widget === TopExchangesTable
  ) {
    return shared
  }

  return Object.assign(shared, shareWidget(widget))
}

export function shareWidgets(widgets) {
  return widgets.map(shareChartWidget)
}

export function shareSettings({ slug, ticker, from, to }) {
  return { slug, ticker, from, to }
}

import ChartWidget from 'studio/ChartWidget'
import { newWidget } from 'studio/stores/widgets'
import { SelectorNode } from 'studio/metrics/selector'

const KeyToWidget = {
  ChartWidget
}

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

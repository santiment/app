import ChartWidget from './ChartWidget'
import HolderDistributionWidget from './HolderDistributionWidget'
import TopTransactionsTable from './TopTransactionsTable'

const reverseKeyValue = ([key, value]) => [value, key]

export const TypeToWidget = {
  ChartWidget,
  HolderDistributionWidget,
  TopTransactionsTable
}

export const WidgetToTypeMap = new Map(
  Object.entries(TypeToWidget).map(reverseKeyValue)
)

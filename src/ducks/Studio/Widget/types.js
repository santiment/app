import ChartWidget from './ChartWidget'
import HolderDistributionWidget from './HolderDistributionWidget'
import TopTransactionsTable from './TopTransactionsTable'
import HolderDistributionCombinedBalanceWidget from './HolderDistributionWidget/CombinedBalance.js'

const reverseKeyValue = ([key, value]) => [value, key]

export const TypeToWidget = {
  ChartWidget,
  HolderDistributionWidget,
  TopTransactionsTable,
  HolderDistributionCombinedBalanceWidget
}

export const WidgetToTypeMap = new Map(
  Object.entries(TypeToWidget).map(reverseKeyValue)
)

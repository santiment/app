import ChartWidget from './ChartWidget'
import HolderDistributionWidget from './HolderDistributionWidget'
import TopTransactionsTable from './TopTransactionsTable'
import HolderDistributionCombinedBalanceWidget from './HolderDistributionWidget/CombinedBalance'
import PriceDAADivergenceWidget from './PriceDAADivergenceWidget'
import AdjustedPriceDAADivergenceWidget from './PriceDAADivergenceWidget/Adjusted'

const reverseKeyValue = ([key, value]) => [value, key]

export const TypeToWidget = {
  ChartWidget,
  HolderDistributionWidget,
  TopTransactionsTable,
  HolderDistributionCombinedBalanceWidget,
  PriceDAADivergenceWidget
}

export const WidgetToTypeMap = new Map(
  Object.entries(TypeToWidget).map(reverseKeyValue)
)

import ChartWidget from './ChartWidget'
import HolderDistributionWidget from './HolderDistributionWidget'
import TopTransactionsTable from './TopTransactionsTable'
import HolderDistributionCombinedBalanceWidget from './HolderDistributionWidget/CombinedBalance'
import PriceDAADivergenceWidget from './PriceDAADivergenceWidget'
import AdjustedPriceDAADivergenceWidget from './PriceDAADivergenceWidget/Adjusted'
import FeesDistribution from '../FeesDistribution/FeesDistribution'
import HoldersDistributionTable from './HoldersDistributionTable/HoldersDistributionTable'
import HolderDistributionLabeledWidget from './HolderDistributionWidget/HoldersDistributionLabeled'

const reverseKeyValue = ([key, value]) => [value, key]

export const TypeToWidget = {
  ChartWidget,
  HolderDistributionWidget,
  TopTransactionsTable,
  HoldersDistributionTable,
  FeesDistribution,
  HolderDistributionCombinedBalanceWidget,
  HolderDistributionLabeledWidget,
  PriceDAADivergenceWidget,
  AdjustedPriceDAADivergenceWidget
}

export const WidgetToTypeMap = new Map(
  Object.entries(TypeToWidget).map(reverseKeyValue)
)

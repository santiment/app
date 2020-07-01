import ChartWidget from './ChartWidget'
import HolderDistributionWidget from './HolderDistributionWidget'

const reverseKeyValue = ([key, value]) => [value, key]

export const TypeToWidget = {
  ChartWidget,
  HolderDistributionWidget,
}

console.log(TypeToWidget)

export const WidgetToTypeMap = new Map(
  Object.entries(TypeToWidget).map(reverseKeyValue),
)

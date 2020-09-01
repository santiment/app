import { GET_METRIC } from '../../timeseries/metrics'
import { preTransform } from '../../timeseries/fetcher'
import {
  removeLabelPostfix,
  percentFormatter,
  axisPercentFormatter
} from '../../Chart/Sidepanel/HolderDistribution/utils'
import { updateTooltipSetting } from '../../../dataHub/tooltipSettings'
import { client } from '../../../../apollo'

export const MERGED_DIVIDER = '__MM__'
const MergedTypePropsTuple = [
  [' coins'], // 0 === false
  [' coins %', percentFormatter, axisPercentFormatter] // 1 === true
]

const immutate = v => Object.assign({}, v)
const keyGetter = ({ key }) => key
const labelGetter = ({ label }) =>
  removeLabelPostfix(label.replace(' coins', ''))

export const checkIfWasNotMerged = (newKey, mergedMetrics) =>
  mergedMetrics.every(({ key }) => key !== newKey)

export function buildMergedMetric (baseMetrics) {
  const isPercentMerge = baseMetrics[0].type === 'percent'
  const [labelPostfix, formatter, axisFormatter] = MergedTypePropsTuple[
    +isPercentMerge
  ]

  const metric = {
    fetch,
    baseMetrics,
    formatter,
    axisFormatter,
    node: 'line',
    key: baseMetrics
      .map(keyGetter)
      .sort()
      .join(MERGED_DIVIDER),
    label: baseMetrics.map(labelGetter).join(', ') + labelPostfix
  }

  updateTooltipSetting(metric)

  return metric
}

export function fetch (metric, { slug, interval, from, to }) {
  const { key, baseMetrics, type } = metric
  const isPercentMerge = type === 'percent'

  const queries = baseMetrics.map(({ key: metricKey, queryKey = metricKey }) =>
    GET_METRIC({ key, queryKey })
  )

  return Promise.all(
    queries.map(query =>
      client
        .query({
          query,
          variables: {
            slug,
            interval,
            from,
            to
          }
        })
        .then(preTransform)
    )
  ).then(allData => {
    const result = allData[0].map(immutate)
    const mergedAmount = allData.length

    for (let i = 1; i < mergedAmount; i++) {
      const array = allData[i]
      const { length } = array
      for (let y = 0; y < length; y++) {
        result[y][key] += array[y][key]
      }

      if (isPercentMerge) {
        for (let y = 0; y < length; y++) {
          result[y][key] /= mergedAmount
        }
      }
    }

    return result
  })
}

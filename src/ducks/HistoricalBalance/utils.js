import { updateTooltipSetting } from '../dataHub/tooltipSettings'
import { getNewInterval, INTERVAL_ALIAS } from '../SANCharts/IntervalSelector'
import { usdFormatter } from '../dataHub/metrics/formatters'
import { normalizeQueryAlias } from '../Studio/Compare/utils'
import { HISTORICAL_BALANCE_QUERY } from '../Studio/timeseries/queries/historicaBalance'
import { client } from '../../apollo'

export function getValidInterval (from, to) {
  const interval = getNewInterval(from, to)
  return INTERVAL_ALIAS[interval] || interval
}

const metricBuilder = slugToMetric => (asset, all) => {
  const metric = slugToMetric(asset, all)
  updateTooltipSetting(metric)
  return metric
}

const preTransform = ({ data: { historicalBalance } }) => historicalBalance

export function fetchHb (metric, vars) {
  const { reqMeta, key } = metric

  return client
    .query({
      query: HISTORICAL_BALANCE_QUERY,
      variables: {
        ...vars,
        ...reqMeta
      }
    })
    .then(preTransform)
    .then(data =>
      data.map(item => ({
        ...item,
        [key]: item.balance
      }))
    )
}

const walletMetricCreator = ({ slug }, allProjects) => {
  const found = allProjects.find(({ slug: targetSlug }) => targetSlug === slug)

  return {
    key: normalizeQueryAlias(slug),
    label: slug,
    node: 'line',
    fetch: fetchHb,
    reqMeta: {
      slug,
      infrastructure:
        found && found.infrastructure ? found.infrastructure : 'ETH'
    }
  }
}

export const walletMetricBuilder = metricBuilder(walletMetricCreator)

export const priceMetricBuilder = metricBuilder(slug => ({
  key: `hb_price_usd_${normalizeQueryAlias(slug)}`,
  label: `Price of ${slug}`,
  node: 'area',
  queryKey: 'price_usd',
  formatter: usdFormatter,
  reqMeta: {
    slug
  }
}))

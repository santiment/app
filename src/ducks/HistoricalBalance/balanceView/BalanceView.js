import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import GetHistoricalBalance from '../GetHistoricalBalance'
import HistoricalBalanceChart from '../chart/HistoricalBalanceChart'
import BalanceChartHeader from './BalanceChartHeader'
import Loadable from 'react-loadable'
import { getIntervalByTimeRange } from '../../../utils/dates'
import { mapAssetsToFlatArray } from '../page/HistoricalBalancePage'
import { mapStateToQS } from '../../../utils/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import { Metrics } from '../../SANCharts/utils'
import PageLoader from '../../../components/Loader/PageLoader'
import BalanceViewWalletAssets from './BalanceViewWalletAssets'
import styles from './BalanceView.module.scss'
import { Area } from 'recharts'

const LoadableChartSettings = Loadable({
  loader: () => import('./BalanceViewChartSettings'),
  loading: () => <div />
})

const DEFAULT_TIME_RANGE = '6m'
const INTERVAL = '1d'
const PRICE_METRIC = 'historyPrice'
const CHART_PRICE_METRIC = {
  ...Metrics[PRICE_METRIC],
  type: PRICE_METRIC,
  node: Area,
  opacity: 0.3
}

export const getPriceMetricWithSlug = slug => {
  return 'priceUsd@' + slug
}

const BalanceView = ({
  address = '',
  assets = [],
  onChangeQuery,
  classes = {}
}) => {
  const priceSlugs = [...assets]

  const [showYAxes, toggleYAxes] = useState(true)
  const [priceMetricTimeseries, setPriceMetricTimeseries] = useState({})

  const [walletAndAssets, setWalletAndAssets] = useState({
    address,
    assets
  })

  const setWalletsAndAssetsWrapper = data => {
    setWalletAndAssets(data)
    onChangeQuery(data)
  }

  const [chartSettings, setChartSettings] = useState({
    timeRange: DEFAULT_TIME_RANGE,
    ...getIntervalByTimeRange(DEFAULT_TIME_RANGE)
  })

  useEffect(
    () => {
      setPriceMetricTimeseries({})
    },
    [chartSettings, walletAndAssets]
  )

  const handleWalletChange = event => {
    setWalletsAndAssetsWrapper({
      ...walletAndAssets,
      [event.target.name]: event.target.value
    })
  }

  const handleAssetsChange = assets => {
    const newState = {
      ...walletAndAssets,
      assets
    }
    setWalletsAndAssetsWrapper(newState)
  }

  const { address: stateAddress, assets: stateAssets } = walletAndAssets

  const onTimerangeChange = timeRange => {
    const { from, to } = getIntervalByTimeRange(timeRange)

    setChartSettings({
      ...chartSettings,
      timeRange,
      from: from.toISOString(),
      to: to.toISOString()
    })
  }

  const onCalendarChange = ([from, to]) => {
    setChartSettings({
      ...chartSettings,
      from: from.toISOString(),
      to: to.toISOString()
    })
  }

  const { timeRange, from, to } = chartSettings

  return (
    <div className={cx(styles.container, classes.balanceViewContainer)}>
      <BalanceViewWalletAssets
        address={stateAddress}
        assets={stateAssets}
        handleAssetsChange={handleAssetsChange}
        handleWalletChange={handleWalletChange}
        classes={classes}
      />
      <div className={cx(styles.chart, classes.balanceViewChart)}>
        <BalanceChartHeader assets={stateAssets} address={stateAddress}>
          <LoadableChartSettings
            defaultTimerange={timeRange}
            onTimerangeChange={onTimerangeChange}
            onCalendarChange={onCalendarChange}
            from={from}
            to={to}
            classes={styles}
            queryString={mapStateToQS({ address, assets })}
            showYAxes={showYAxes}
            toggleYAxes={toggleYAxes}
          />
        </BalanceChartHeader>

        {priceSlugs.map(slug => {
          const requestedMetrics = [
            {
              name: CHART_PRICE_METRIC.type,
              timeRange,
              slug,
              interval: INTERVAL,
              ...CHART_PRICE_METRIC.reqMeta
            }
          ]

          return (
            <GetTimeSeries
              key={slug}
              metrics={requestedMetrics}
              render={timeseriesData => {
                const { timeseries } = timeseriesData

                if (!timeseries) {
                  return null
                } else {
                  const metricSlug = getPriceMetricWithSlug(slug)

                  const mapped = timeseries.map(({ priceUsd, datetime }) => ({
                    datetime,
                    [metricSlug]: priceUsd
                  }))

                  if (
                    !priceMetricTimeseries ||
                    !priceMetricTimeseries[metricSlug]
                  ) {
                    setPriceMetricTimeseries({
                      ...priceMetricTimeseries,
                      [metricSlug]: mapped
                    })
                  }

                  return null
                }
              }}
            />
          )
        })}

        <GetHistoricalBalance
          assets={mapAssetsToFlatArray(assets)}
          wallet={address}
          from={from}
          to={to}
          interval={INTERVAL}
          render={({ data, error }) => {
            if (error) return `Error!: ${error}`
            if (!data || Object.keys(data).length === 0) {
              return (
                <>
                  <StatusDescription
                    label={
                      'Please paste the wallet address and choose supported assets in the forms above to see the historical data'
                    }
                  />
                  <HistoricalBalanceChart walletsData={{}} />
                </>
              )
            }

            const loading =
              Object.keys(data).filter(name => {
                return (data[name] || {}).loading
              }).length > 0

            if (loading) {
              return <PageLoader />
            }

            return (
              <HistoricalBalanceChart
                showYAxes={showYAxes}
                walletsData={data}
                priceMetricsData={priceMetricTimeseries}
                priceMetric={CHART_PRICE_METRIC}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

export const StatusDescription = ({ label }) => {
  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.description}>{label}</div>
    </div>
  )
}

export default BalanceView

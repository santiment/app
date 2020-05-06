import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import GetHistoricalBalance from '../GetHistoricalBalance'
import HistoricalBalanceChart from '../chart/HistoricalBalanceChart'
import BalanceChartHeader from './BalanceChartHeader'
import Loadable from 'react-loadable'
import { getIntervalByTimeRange } from '../../../utils/dates'
import {
  initPriceMetrics,
  mapAssetsToFlatArray
} from '../page/HistoricalBalancePage'
import { mapStateToQS } from '../../../utils/utils'
import GetTimeSeries from '../../GetTimeSeries/GetTimeSeries'
import { Metric } from '../../dataHub/metrics'
import PageLoader from '../../../components/Loader/PageLoader'
import BalanceViewWalletAssets from './BalanceViewWalletAssets'
import { Area } from 'recharts'
import { simpleSortStrings } from '../../../utils/sortMethods'
import styles from './BalanceView.module.scss'

const LoadableChartSettings = Loadable({
  loader: () => import('./BalanceViewChartSettings'),
  loading: () => <div />
})

const DEFAULT_TIME_RANGE = '6m'
const INTERVAL = '1d'
const CHART_PRICE_METRIC = {
  ...Metric.price_usd,
  type: 'price_usd',
  node: 'area',
  Component: Area,
  opacity: 0.25
}

export const getPriceMetricWithSlug = slug => {
  return 'priceUsd@' + slug
}

const BalanceView = ({
  queryData,
  queryData: { priceMetrics: queryPriceMetrics, assets: queryAssets },
  onChangeQuery,
  classes = {}
}) => {
  const [showYAxes, toggleYAxes] = useState(false)
  const [priceMetricTimeseries, setPriceMetricTimeseries] = useState({})

  const [queryState, setQueryState] = useState(queryData)

  const [priceMetrics, setPriceMetrics] = useState([])

  useEffect(
    () => {
      const currentAndNewPriceMetrics = initPriceMetrics(
        queryPriceMetrics,
        true
      )

      queryAssets.forEach(asset => {
        if (
          !currentAndNewPriceMetrics.some(
            ({ asset: savedAsset }) => savedAsset === asset
          )
        ) {
          currentAndNewPriceMetrics.push({ asset: asset, enabled: false })
        }
      })

      currentAndNewPriceMetrics.sort(
        ({ asset: assetFirst }, { asset: assetSecond }) => {
          return simpleSortStrings(assetFirst, assetSecond)
        }
      )

      setPriceMetrics(currentAndNewPriceMetrics)
    },
    [queryAssets]
  )

  const setWalletsAndAssetsWrapper = data => {
    setQueryState(data)
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
    [chartSettings, queryState]
  )

  const handleWalletChange = event => {
    setWalletsAndAssetsWrapper({
      ...queryState,
      [event.target.name]: event.target.value
    })
  }

  const handleAssetsChange = assets => {
    const newState = {
      ...queryState,
      assets
    }
    setWalletsAndAssetsWrapper(newState)
  }

  const { address: stateAddress, assets: stateAssets } = queryState

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

  const togglePriceMetric = ({ asset: toggleAsset }) => {
    const selected = priceMetrics.find(({ asset }) => toggleAsset === asset)
    selected.enabled = !selected.enabled

    setWalletsAndAssetsWrapper({
      ...queryState,
      priceMetrics: priceMetrics.filter(({ enabled }) => enabled)
    })
  }

  const { timeRange, from, to } = chartSettings

  const [scale, setScale] = useState('auto')

  const onScaleChange = () => {
    setScale(scale === 'auto' ? 'log' : 'auto')
  }

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
            queryString={mapStateToQS({
              address: stateAddress,
              assets: mapAssetsToFlatArray(stateAssets),
              priceMetrics: priceMetrics
                .filter(({ enabled }) => enabled)
                .map(({ asset }) => asset)
            })}
            showYAxes={showYAxes}
            toggleYAxes={toggleYAxes}
            priceMetrics={priceMetrics}
            toggleAsset={togglePriceMetric}
            onScaleChange={onScaleChange}
            scale={scale}
          />
        </BalanceChartHeader>

        {priceMetrics.map(({ asset: slug, enabled }) => {
          if (!enabled) {
            return null
          }

          const requestedMetrics = [
            {
              name: CHART_PRICE_METRIC.type,
              timeRange,
              from: from,
              to: to,
              slug,
              interval: INTERVAL,
              ...CHART_PRICE_METRIC.reqMeta
            }
          ]

          return (
            <GetTimeSeries
              key={slug}
              metrics={requestedMetrics}
              render={({ timeseries, isLoading }) => {
                if (!timeseries || isLoading) {
                  return null
                } else {
                  const metricSlug = getPriceMetricWithSlug(slug)

                  if (
                    !priceMetricTimeseries ||
                    !priceMetricTimeseries[metricSlug]
                  ) {
                    const mapped = timeseries.map(
                      ({ price_usd, datetime }) => ({
                        datetime,
                        [metricSlug]: price_usd
                      })
                    )

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
          assets={mapAssetsToFlatArray(stateAssets)}
          wallet={stateAddress}
          from={from}
          to={to}
          interval={INTERVAL}
          render={({ data, error }) => {
            if (error) {
              throw new Error(
                "Can't load historical balance. Apollo error: " +
                  JSON.stringify(error)
              )
            }
            if (!data || Object.keys(data).length === 0) {
              return (
                <>
                  <StatusDescription
                    label={
                      'Please paste the wallet address and choose supported assets in the forms above to see the historical data'
                    }
                  />
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
                scale={scale}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

export const StatusDescription = ({ label }) => (
  <div className={styles.descriptionContainer}>
    <div className={styles.description}>{label}</div>
  </div>
)

export default BalanceView

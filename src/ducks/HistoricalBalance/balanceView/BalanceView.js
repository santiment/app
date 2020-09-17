import React, { useState, useEffect, useCallback, useMemo } from 'react'
import cx from 'classnames'
import { getPriceMetricWithSlug } from './utils'
import GetHistoricalBalance from '../GetHistoricalBalance'
import HistoricalBalanceChart from '../chart/HistoricalBalanceChart'
import BalanceChartHeader from './BalanceChartHeader'
import Loadable from 'react-loadable'
import { getIntervalByTimeRange } from '../../../utils/dates'
import { initPriceMetrics, mapAssetsToFlatArray } from '../page/utils'
import { mapStateToQS } from '../../../utils/utils'
import { Metric } from '../../dataHub/metrics'
import PageLoader from '../../../components/Loader/PageLoader'
import BalanceViewWalletAssets from './BalanceViewWalletAssets'
import { Area } from 'recharts'
import { simpleSortStrings } from '../../../utils/sortMethods'
import { useTimeseries } from '../../Studio/timeseries/hooks'
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

const BalanceView = ({
  queryData,
  queryData: { priceMetrics: queryPriceMetrics, assets: queryAssets },
  onChangeQuery,
  classes = {},
  settings: {
    showHeader = true,
    showIntervals = true,
    showAlertBtn = true,
    showLegend = true,
    showYAxes: settingsShowYAxes = false
  } = {},
  chartSettings: defaultChartSettings
}) => {
  const [showYAxes, toggleYAxes] = useState(settingsShowYAxes)
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

  const setWalletsAndAssetsWrapper = useCallback(
    data => {
      setQueryState(data)
      onChangeQuery(data)
    },
    [setQueryState, onChangeQuery]
  )

  const [chartSettings, setChartSettings] = useState({
    timeRange: DEFAULT_TIME_RANGE,
    ...getIntervalByTimeRange(DEFAULT_TIME_RANGE),
    ...defaultChartSettings
  })

  const handleWalletChange = useCallback(
    event => {
      setWalletsAndAssetsWrapper({
        ...queryState,
        [event.target.name]: event.target.value
      })
    },
    [setWalletsAndAssetsWrapper, queryState]
  )

  const handleAssetsChange = useCallback(
    assets => {
      const newState = {
        ...queryState,
        assets
      }
      setWalletsAndAssetsWrapper(newState)
    },
    [queryState, setWalletsAndAssetsWrapper]
  )

  const { address: stateAddress, assets: stateAssets } = queryState

  const onTimerangeChange = useCallback(
    timeRange => {
      const { from, to } = getIntervalByTimeRange(timeRange)

      setChartSettings({
        ...chartSettings,
        timeRange,
        from: from.toISOString(),
        to: to.toISOString()
      })
    },
    [getIntervalByTimeRange, setChartSettings, chartSettings]
  )

  const onCalendarChange = useCallback(
    ([from, to]) => {
      setChartSettings({
        ...chartSettings,
        from: from.toISOString(),
        to: to.toISOString()
      })
    },
    [setChartSettings, setChartSettings]
  )

  const togglePriceMetric = useCallback(
    ({ asset: toggleAsset }) => {
      const selected = priceMetrics.find(({ asset }) => toggleAsset === asset)
      selected.enabled = !selected.enabled

      setWalletsAndAssetsWrapper({
        ...queryState,
        priceMetrics: priceMetrics.filter(({ enabled }) => enabled)
      })
    },
    [priceMetrics, setWalletsAndAssetsWrapper, queryState]
  )

  const { timeRange, from, to } = chartSettings

  const [scale, setScale] = useState('auto')

  const onScaleChange = useCallback(
    () => {
      setScale(scale === 'auto' ? 'log' : 'auto')
    },
    [setScale, scale]
  )

  const priceRequestedMetrics = useMemo(
    () => {
      return priceMetrics
        .map(({ asset: slug, enabled }) => {
          if (!enabled) {
            return null
          }

          return {
            key: getPriceMetricWithSlug(slug),
            queryKey: CHART_PRICE_METRIC.key,
            name: CHART_PRICE_METRIC.type,
            timeRange,
            from: from,
            to: to,
            slug,
            interval: INTERVAL,
            reqMeta: {
              slug
            }
          }
        })
        .filter(item => item !== null)
    },
    [priceMetrics, timeRange, from, to]
  )

  const MetricSettingsMap = useMemo(
    () => {
      const map = new Map()
      priceRequestedMetrics.forEach(item => {
        map.set(item, item)
      })
      return map
    },
    [priceRequestedMetrics]
  )

  const [priceMetricTimeseries] = useTimeseries(
    priceRequestedMetrics,
    chartSettings,
    MetricSettingsMap
  )

  const priceMetricKeys = useMemo(
    () => {
      return priceRequestedMetrics.map(({ key }) => key)
    },
    [priceRequestedMetrics]
  )

  return (
    <div className={cx(styles.container, classes.balanceViewContainer)}>
      {showHeader && (
        <BalanceViewWalletAssets
          address={stateAddress}
          assets={stateAssets}
          handleAssetsChange={handleAssetsChange}
          handleWalletChange={handleWalletChange}
          classes={classes}
        />
      )}

      <div className={cx(styles.chart, classes.balanceViewChart)}>
        <BalanceChartHeader
          assets={stateAssets}
          address={stateAddress}
          showAlertBtn={showAlertBtn}
        >
          <LoadableChartSettings
            showIntervals={showIntervals}
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
              return <PageLoader className={classes.chart} />
            }

            return (
              <HistoricalBalanceChart
                showYAxes={showYAxes}
                walletsData={data}
                priceMetricTimeseries={priceMetricTimeseries}
                priceMetricKeys={priceMetricKeys}
                priceMetric={CHART_PRICE_METRIC}
                scale={scale}
                classes={classes}
                showLegend={showLegend}
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

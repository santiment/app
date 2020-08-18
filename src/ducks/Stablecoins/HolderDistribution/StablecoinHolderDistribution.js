import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { ProjectIcon } from '../../../components/ProjectIcon/ProjectIcon'
import { TopHolderMetric } from '../../Studio/Chart/Sidepanel/HolderDistribution/metrics'
import TopHolders from '../../Studio/Chart/Sidepanel/HolderDistribution'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import { getIntervalDates } from '../StablecoinsMarketCap/StablecoinsMarketCap'
import { useChartColors } from '../../Chart/colors'
import Chart from '../../Chart'
import { useAxesMetricsKey } from '../../Chart/hooks'
import { metricsToPlotCategories } from '../../Chart/Synchronizer'
import ProjectSelectDialog from '../../Studio/Compare/ProjectSelectDialog'
import {
  createSkeletonElement,
  createSkeletonProvider
} from '@trainline/react-skeletor'
import styles from './StablecoinHolderDistribution.module.scss'
import { Metric } from '../../dataHub/metrics'
import ActiveMetrics from '../../Studio/Chart/ActiveMetrics'

const METRIC_SETTINGS_MAP = new Map()
const METRIC_TRANSFORMER = {}

const CHART_HEIGHT = 500

const CHART_PADDING = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

const DEFAULT_ASSET = {
  id: '1552',
  name: 'Tether',
  slug: 'tether',
  ticker: 'USDT',
  rank: 4,
  marketcapUsd: 10010463777.928583,
  __typename: 'Project'
}

const H1 = createSkeletonElement('h1')

const ProjectInfo = createSkeletonProvider(
  {
    name: '_______'
  },
  ({ name }) => name === undefined,
  () => ({
    color: 'var(--mystic)',
    backgroundColor: 'var(--mystic)'
  })
)(({ name, ticker, slug, logoUrl, darkLogoUrl, onClick }) => (
  <div className={styles.selector} onClick={onClick}>
    <div className={styles.projectIcon}>
      <ProjectIcon
        size={20}
        slug={slug}
        logoUrl={logoUrl}
        darkLogoUrl={darkLogoUrl}
      />
    </div>
    <div className={styles.project}>
      <div className={styles.project__top}>
        <H1 className={styles.project__name}>
          {name} ({ticker})
        </H1>
        <div className={styles.project__arrows}>
          <Icon type='arrow-down' className={styles.project__arrow} />
        </div>
      </div>
    </div>
  </div>
))

const StablecoinHolderDistribution = ({ className }) => {
  const [asset, setAsset] = useState(DEFAULT_ASSET)
  const [metrics, setMetrics] = useState([
    Metric.price_usd,
    TopHolderMetric.holders_distribution_100_to_1k,
    TopHolderMetric.holders_distribution_1k_to_10k
  ])

  const toggleMetric = useCallback(
    metric => {
      const found = metrics.find(x => x === metric)

      if (found) {
        setMetrics(metrics.filter(x => x !== metric))
      } else {
        setMetrics([...metrics, metric])
      }
    },
    [metrics, setMetrics]
  )

  const MetricColor = useChartColors(metrics)

  const [settings, setSettings] = useState({
    ...getIntervalDates({
      value: '63d'
    })
  })

  useEffect(
    () => {
      setSettings({
        ...settings,
        slug: asset.slug
      })
    },
    [asset]
  )

  const [data, loadings, errors] = useTimeseries(
    metrics,
    settings,
    METRIC_SETTINGS_MAP,
    METRIC_TRANSFORMER
  )
  const [brushBorder, setBrushBorder] = useState()
  const [brushData, setBrushData] = useState([])

  useEffect(
    () => {
      if (brushBorder) {
        const { from, to } = brushBorder
        setBrushData(data.slice(from, to))
      } else {
        setBrushData(data)
      }
    },
    [data, brushBorder]
  )

  const axesMetricKeys = useAxesMetricsKey(metrics)
  const categories = metricsToPlotCategories(metrics, {})

  const [isOpened, setOpen] = useState(false)
  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.chartContainer}>
        <div className={styles.header}>
          <ProjectSelectDialog
            open={isOpened}
            activeSlug={asset.slug}
            onOpen={openDialog}
            onClose={closeDialog}
            onSelect={asset => {
              console.log(asset)
              setAsset(asset)
              closeDialog()
            }}
            customTabs={['Stablecoins']}
            showTabs={false}
            trigger={<ProjectInfo {...asset} onClick={openDialog} />}
          />
        </div>

        <div className={styles.metricBtns}>
          <ActiveMetrics
            className={styles.metricBtn}
            MetricColor={MetricColor}
            toggleMetric={toggleMetric}
            loadings={loadings}
            activeMetrics={metrics}
            ErrorMsg={errors}
            project={asset}
          />
        </div>

        <Chart
          {...settings}
          {...categories}
          data={data}
          brushData={brushData}
          chartHeight={CHART_HEIGHT}
          metrics={metrics}
          chartPadding={CHART_PADDING}
          resizeDependencies={[]}
          isCartesianGridActive={true}
          MetricColor={MetricColor}
          tooltipKey={axesMetricKeys[0]}
          axesMetricKeys={axesMetricKeys}
          className={styles.chart}
          onBrushChangeEnd={(from, to) => {
            setBrushBorder({
              from,
              to
            })
          }}
        />
      </div>

      <div className={styles.metrics}>
        <div className={styles.holdersTitle}>Holders Distribution</div>

        <TopHolders
          toggleMetric={toggleMetric}
          MetricColor={MetricColor}
          metrics={metrics}
          className={styles.holderMetricBtn}
          btnProps={{
            fluid: false,
            variant: 'ghost',
            loading: loadings
          }}
        />
      </div>
    </div>
  )
}

export default StablecoinHolderDistribution

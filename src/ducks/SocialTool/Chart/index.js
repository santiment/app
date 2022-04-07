import React, { useState, useMemo } from 'react'
import cx from 'classnames'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import ChartHeader from './Header'
import Canvas from './Canvas'
import DetailedBlock from './Detailed'
import SocialDominanceToggle from './SocialDominanceToggle'
import { useChartColors } from './colors'
import { useMetricCategories } from '../../Chart/Synchronizer'
import PaywallInfo from '../../Studio/Chart/PaywallInfo'
import { useDomainGroups } from '../../Chart/hooks'
import { extractMirrorMetricsDomainGroups } from '../../Chart/utils'
import ChartActiveMetrics from '../../Studio/Chart/ActiveMetrics'
import styles from './index.module.scss'
import SharedAxisToggle from '../../Studio/Chart/SharedAxisToggle'

const Chart = ({
  className,
  chartRef,
  data,
  brushData,
  settings,
  options,
  setOptions,
  loadings,
  metrics,
  boundaries,
  setSettings,
  linkedAssets,
  allDetectedAssets,
  ...props
}) => {
  const [FocusedMetric, setFocusedMetric] = useState()
  const MetricColor = useChartColors(metrics, FocusedMetric)
  const categories = useMetricCategories(metrics)
  const domainGroups = useDomainGroups(metrics)
  const mirrorDomainGroups = useMemo(() => extractMirrorMetricsDomainGroups(domainGroups), [
    domainGroups,
  ])
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState(
    domainGroups && domainGroups.length > mirrorDomainGroups.length,
  )
  const scale = options.isLogScale ? logScale : linearScale
  const detectedAsset = allDetectedAssets.get(settings.slug) || {}

  function onMetricHover (metric) {
    setFocusedMetric(metric)
  }

  function onMetricHoverEnd () {
    setFocusedMetric()
  }

  function onBrushChangeEnd (startIndex, endIndex) {
    props.changeTimePeriod(
      new Date(brushData[startIndex].datetime),
      new Date(brushData[endIndex].datetime),
    )
  }

  const { priceAsset } = props

  return (
    <div className={cx(styles.wrapper, className)}>
      <ChartHeader
        {...props}
        chartRef={chartRef}
        data={data}
        allDetectedAssets={allDetectedAssets}
        activeMetrics={metrics}
        options={options}
        settings={settings}
        setOptions={setOptions}
        setSettings={setSettings}
        className={styles.top}
      >
        <h3 className={styles.title}>Social Volume</h3>
        {domainGroups && domainGroups.length > mirrorDomainGroups.length && (
          <SharedAxisToggle
            isDomainGroupingActive={isDomainGroupingActive}
            setIsDomainGroupingActive={setIsDomainGroupingActive}
            className={styles.sharedAxisToggle}
          />
        )}
      </ChartHeader>
      <div className={styles.bottom}>
        <div className={styles.metrics}>
          <ChartActiveMetrics
            className={styles.metric}
            MetricColor={MetricColor}
            activeMetrics={metrics}
            loadings={loadings}
            onMetricHover={onMetricHover}
            onMetricHoverEnd={onMetricHoverEnd}
            project={priceAsset}
          />
        </div>
        <PaywallInfo boundaries={boundaries} metrics={metrics} />
        <SocialDominanceToggle
          className={styles.dominance}
          options={options}
          setOptions={setOptions}
        />
      </div>
      <Canvas
        chartRef={chartRef}
        scale={scale}
        data={data}
        brushData={brushData}
        options={options}
        settings={settings}
        domainGroups={isDomainGroupingActive ? domainGroups : mirrorDomainGroups}
        categories={categories}
        metrics={metrics}
        colors={MetricColor}
        onBrushChangeEnd={onBrushChangeEnd}
      />
      {settings.addedTopics.length === 0 && (
        <>
          <DetailedBlock
            {...options}
            {...props}
            options={options}
            scale={scale}
            type='general'
            MetricColor={MetricColor}
            settings={settings}
            allDetectedAssets={allDetectedAssets}
            linkedAssets={linkedAssets}
          >
            <ChartHeader
              {...props}
              chartRef={chartRef}
              data={data}
              allDetectedAssets={allDetectedAssets}
              activeMetrics={metrics}
              options={options}
              settings={settings}
              setOptions={setOptions}
              setSettings={setSettings}
              className={cx(styles.top, styles.detailed)}
            >
              <h3 className={styles.title}>Detailed charts</h3>
            </ChartHeader>
          </DetailedBlock>
          <DetailedBlock
            {...options}
            {...props}
            options={options}
            scale={scale}
            type='community'
            MetricColor={MetricColor}
            settings={settings}
            linkedAssets={linkedAssets}
            allDetectedAssets={allDetectedAssets}
          >
            <ChartHeader
              {...props}
              chartRef={chartRef}
              data={data}
              allDetectedAssets={allDetectedAssets}
              activeMetrics={metrics}
              options={options}
              settings={settings}
              setOptions={setOptions}
              setSettings={setSettings}
              className={cx(styles.top, styles.detailed)}
            >
              <h3 className={styles.title}>{detectedAsset.ticker} own community charts</h3>
            </ChartHeader>
          </DetailedBlock>
        </>
      )}
    </div>
  )
}

export default Chart

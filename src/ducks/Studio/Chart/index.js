import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import ChartPaywallInfo from './PaywallInfo'
import ChartActiveMetrics from './ActiveMetrics'
import ChartFullscreenBtn from './ChartFullscreenBtn'
import IcoPrice from './IcoPrice'
import LastDayPrice from './LastDayPrice'
import SharedAxisToggle from './SharedAxisToggle'
import { extractMirrorMetricsDomainGroups } from '../utils'
import { useAllTimeData } from '../timeseries/hooks'
import Chart from '../../Chart'
import Signals from '../../Chart/Signals'
import { useMetricCategories } from '../../Chart/Synchronizer'
import { useDomainGroups, useAxesMetricsKey } from '../../Chart/hooks'
import { useChartColorsWithHighlight } from '../../Chart/colors'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import styles from './index.module.scss'
import ContextMenu from './ContextMenu'
import Compare from '../Compare'

const Canvas = ({
  index,
  className,
  chartRef,
  data,
  settings,
  options,
  loadings,
  eventLoadings,
  metrics,
  comparables,
  activeEvents,
  boundaries,
  ErrorMsg,
  toggleMetric,
  onPointClick,
  syncedTooltipDate,
  isMultiChartsActive,
  isSingleWidget = !isMultiChartsActive,
  isAnon,
  isSelectingRange,
  changeTimePeriod,
  TopLeftComponent = ChartActiveMetrics,
  setIsICOPriceDisabled,
  setOptions,
  setComparables,
  onDeleteChartClick,
  onRangeSelect,
  onRangeSelectStart,
  syncTooltips,
}) => {
  const categories = useMetricCategories(metrics)
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState()
  const [focusedMetricKey, setFocusedMetricKey] = useState()
  const [focusTimer, setFocusTimer] = useState()
  const MetricColor = useChartColorsWithHighlight(metrics, focusedMetricKey)
  const domainGroups = useDomainGroups(metrics)
  const axesMetricKeys = useAxesMetricsKey(metrics, isDomainGroupingActive)
  const allTimeData = useAllTimeData(metrics, settings)

  const mirrorDomainGroups = extractMirrorMetricsDomainGroups(domainGroups)
  const isBlurred = isAnon && index > 1
  const scale = options.isLogScale ? logScale : linearScale

  useEffect(onMetricHoverEnd, [metrics])

  function onMetricHover(metric, { currentTarget }) {
    const { parentNode } = currentTarget
    // HACK: For some reason, fast pointer movement can trigger 'mouseenter' but not 'mouseleave'
    // Hence, a metric might be stucked in the highlighted state [@vanguard | Jun 14, 2020]
    setFocusTimer(
      setTimeout(() => {
        if (parentNode.querySelector(':hover')) {
          setFocusedMetricKey(metric.key)
        }
      }, 60),
    )
  }

  function onMetricHoverEnd() {
    clearTimeout(focusTimer)
    setFocusedMetricKey()
  }

  function onBrushChangeEnd(startIndex, endIndex) {
    const start = allTimeData[startIndex]
    const end = allTimeData[endIndex]
    if (start && end) {
      changeTimePeriod(new Date(start.datetime), new Date(end.datetime))
    }
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(styles.top, isBlurred && styles.blur)}>
        <div className={styles.metrics}>
          <TopLeftComponent
            className={styles.metric}
            settings={settings}
            MetricColor={MetricColor}
            activeMetrics={metrics}
            activeEvents={activeEvents}
            toggleMetric={toggleMetric}
            loadings={loadings}
            ErrorMsg={ErrorMsg}
            eventLoadings={eventLoadings}
            isMultiChartsActive={isMultiChartsActive}
            isSingleWidget={isSingleWidget}
            onMetricHover={onMetricHover}
            onMetricHoverEnd={onMetricHoverEnd}
          />
        </div>

        <div className={styles.meta}>
          <ChartPaywallInfo boundaries={boundaries} metrics={metrics} />

          {domainGroups && domainGroups.length > mirrorDomainGroups.length && (
            <SharedAxisToggle
              isDomainGroupingActive={isDomainGroupingActive}
              setIsDomainGroupingActive={setIsDomainGroupingActive}
            />
          )}

          <Compare
            comparables={comparables}
            setComparables={setComparables}
            activeMetrics={metrics}
            MetricColor={MetricColor}
            slug={settings.slug}
            className={styles.compare}
          />

          <ContextMenu
            setOptions={setOptions}
            onDeleteChartClick={isSingleWidget ? undefined : onDeleteChartClick}
            classes={styles}
            chartRef={chartRef}
            title={settings.title}
            activeMetrics={metrics}
            data={data}
            {...options}
          />

          <ChartFullscreenBtn
            categories={categories}
            options={options}
            settings={settings}
            metrics={metrics}
            activeEvents={activeEvents}
            scale={scale}
            brushData={allTimeData}
            MetricColor={MetricColor}
          />
        </div>
      </div>
      <Chart
        {...categories}
        {...options}
        {...settings}
        data={data}
        brushData={allTimeData}
        chartRef={chartRef}
        className={cx(styles.chart, isBlurred && styles.blur)}
        MetricColor={MetricColor}
        metrics={metrics}
        scale={scale}
        domainGroups={
          isDomainGroupingActive ? domainGroups : mirrorDomainGroups
        }
        tooltipKey={axesMetricKeys[0]}
        axesMetricKeys={axesMetricKeys}
        syncedTooltipDate={isBlurred || syncedTooltipDate}
        onPointClick={onPointClick}
        onBrushChangeEnd={onBrushChangeEnd}
        onRangeSelect={onRangeSelect}
        onRangeSelectStart={onRangeSelectStart}
        syncTooltips={syncTooltips}
        resizeDependencies={[axesMetricKeys]}
      >
        <IcoPrice
          {...settings}
          {...options}
          metrics={metrics}
          className={styles.ico}
          onResult={(price) => setIsICOPriceDisabled(!price)}
        />
        <LastDayPrice settings={settings} metrics={metrics} />
        {isSelectingRange || <Signals {...settings} metrics={metrics} />}
      </Chart>

      {isBlurred && (
        <div className={styles.restriction}>
          <Link to='/login' className={styles.restriction__link}>
            Sign in
          </Link>{' '}
          to unlock all Santiment Chart features
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAnon: !checkIsLoggedIn(state),
})

export default connect(mapStateToProps)(Canvas)

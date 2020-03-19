import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import ChartPaywallInfo from './PaywallInfo'
import ChartActiveMetrics from './ActiveMetrics'
import ChartFullscreenBtn from './ChartFullscreenBtn'
import ChartMetricsExplanation, {
  filterExplainableMetrics
} from './MetricsExplanation'
import IcoPrice from './IcoPrice'
import Chart from '../../SANCharts/Chart'
import Synchronizer from '../../SANCharts/Chart/Synchronizer'
import { useChartColors } from '../../SANCharts/Chart/colors'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import styles from './index.module.scss'

const Canvas = ({
  index,
  className,
  chartRef,
  settings,
  options,
  loadings,
  eventLoadings,
  metrics,
  activeEvents,
  boundaries,
  advancedView,
  toggleMetric,
  changeHoveredDate,
  isMultiChartsActive,
  syncedTooltipDate,
  isAnon,
  isSidebarClosed,
  setIsICOPriceDisabled,
  ...props
}) => {
  const [isExplained, setIsExplained] = useState()
  const [FocusedMetric, setFocusedMetric] = useState()
  const MetricColor = useChartColors(metrics, FocusedMetric)

  const isBlurred = isAnon && index > 1
  const hasExplanaibles = filterExplainableMetrics(metrics).length > 0
  const scale = options.isLogScale ? logScale : linearScale

  useEffect(
    () => {
      if (!hasExplanaibles) {
        closeExplanation()
      }
    },
    [hasExplanaibles]
  )

  useEffect(onMetricHoverEnd, [metrics])

  function toggleExplanation () {
    setIsExplained(state => !state)
  }

  function closeExplanation () {
    setIsExplained(false)
  }

  function onMetricHover (Metric) {
    setFocusedMetric(Metric)
  }

  function onMetricHoverEnd () {
    setFocusedMetric()
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        isExplained && styles.wrapper_explained,
        className
      )}
    >
      <div className={cx(styles.top, isBlurred && styles.blur)}>
        <div className={styles.metrics}>
          <ChartActiveMetrics
            className={styles.metric}
            MetricColor={MetricColor}
            activeMetrics={metrics}
            activeEvents={activeEvents}
            toggleMetric={toggleMetric}
            loadings={loadings}
            eventLoadings={eventLoadings}
            isMultiChartsActive={isMultiChartsActive}
            onMetricHover={onMetricHover}
            onMetricHoverEnd={onMetricHoverEnd}
          />
        </div>

        <div className={styles.meta}>
          <ChartPaywallInfo boundaries={boundaries} metrics={metrics} />
          {hasExplanaibles && (
            <ChartMetricsExplanation.Button
              className={styles.explain}
              onClick={toggleExplanation}
            />
          )}
          <ChartFullscreenBtn
            {...props}
            options={options}
            settings={settings}
            MetricColor={MetricColor}
            metrics={metrics}
            activeEvents={activeEvents}
            scale={scale}
          />
        </div>
      </div>
      <Chart
        {...options}
        {...settings}
        {...props}
        chartRef={chartRef}
        className={cx(styles.chart, isBlurred && styles.blur)}
        MetricColor={MetricColor}
        metrics={metrics}
        scale={scale}
        isMultiChartsActive={isMultiChartsActive}
        syncedTooltipDate={isBlurred || syncedTooltipDate}
        onPointHover={advancedView ? changeHoveredDate : undefined}
        resizeDependencies={[
          MetricColor,
          isMultiChartsActive,
          advancedView,
          isExplained,
          isSidebarClosed
        ]}
      >
        {options.isICOPriceActive && (
          <IcoPrice
            {...settings}
            metrics={metrics}
            className={styles.ico}
            onEmptyResult={() => setIsICOPriceDisabled(true)}
          />
        )}
      </Chart>

      {isBlurred && (
        <div className={styles.restriction}>
          <Link to='/login' className={styles.restriction__link}>
            Sign in
          </Link>{' '}
          to unlock all Santiment Chart features
        </div>
      )}

      {isExplained && (
        <div className={styles.explanation}>
          <ChartMetricsExplanation
            {...settings}
            metrics={metrics}
            MetricColor={MetricColor}
            onClose={closeExplanation}
          />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  isAnon: !checkIsLoggedIn(state)
})

export default connect(mapStateToProps)(
  ({ options, events, activeMetrics, ...rest }) => {
    return (
      <Synchronizer {...options} metrics={activeMetrics} events={events}>
        <Canvas
          options={options}
          events={events}
          activeMetrics={activeMetrics}
          {...rest}
        />
      </Synchronizer>
    )
  }
)

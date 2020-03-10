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
  ...props
}) => {
  const [isExplained, setIsExplained] = useState()
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

  function toggleExplanation () {
    setIsExplained(state => !state)
  }

  function closeExplanation () {
    setIsExplained(false)
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
            activeMetrics={metrics}
            activeEvents={activeEvents}
            toggleMetric={toggleMetric}
            loadings={loadings}
            eventLoadings={eventLoadings}
            isMultiChartsActive={isMultiChartsActive}
          />
        </div>

        <div className={styles.meta}>
          <ChartPaywallInfo boundaries={boundaries} />
          {hasExplanaibles && (
            <ChartMetricsExplanation.Button
              onClick={toggleExplanation}
              className={styles.explain}
            />
          )}
          <ChartFullscreenBtn
            {...props}
            options={options}
            settings={settings}
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
        className={cx(styles.chart, isBlurred && styles.blur)}
        isMultiChartsActive={isMultiChartsActive}
        metrics={metrics}
        chartRef={chartRef}
        scale={scale}
        isAdvancedView={!!advancedView}
        onPointHover={advancedView ? changeHoveredDate : undefined}
        syncedTooltipDate={isBlurred || syncedTooltipDate}
        isWideChart={isExplained}
      >
        {options.isICOPriceActive && (
          <IcoPrice {...settings} metrics={metrics} className={styles.ico} />
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
      <Synchronizer
        isMultiChartsActive={options.isMultiChartsActive}
        metrics={activeMetrics}
        events={events}
      >
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

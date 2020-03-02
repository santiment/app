import React, { useState } from 'react'
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

  function toggleExplanation () {
    setIsExplained(state => !state)
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
          {filterExplainableMetrics(metrics).length > 0 && (
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
            scale={options.isLogScale ? logScale : linearScale}
          />
        </div>
      </div>
      <Chart
        {...options}
        {...settings}
        {...props}
        className={isBlurred ? styles.blur : ''}
        isMultiChartsActive={isMultiChartsActive}
        metrics={metrics}
        chartRef={chartRef}
        scale={options.isLogScale ? logScale : linearScale}
        isAdvancedView={!!advancedView}
        onPointHover={advancedView ? changeHoveredDate : undefined}
        syncedTooltipDate={isBlurred || syncedTooltipDate}
        isWideChart={isExplained}
      />

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
          <ChartMetricsExplanation {...settings} metrics={metrics} />
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

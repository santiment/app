import React from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ChartMetricSelector from './ChartMetricSelector'
import ChartActiveMetrics from './ChartActiveMetrics'
import styles from './ChartMetricsTool.module.scss'

const ChartMetricsTool = ({
  classes = {},
  activeMetrics,
  activeEvents,
  disabledMetrics,
  alwaysShowingMetrics,
  slug,
  toggleMetric,
  hideSettings,
  isWideChart,
  ...rest
}) => (
  <div className={styles.container}>
    {isWideChart && <div className={styles.divider} />}
    <div className={cx(styles.wrapper, isWideChart && styles.topOffset)}>
      {hideSettings.metricSelector || (
        <ContextMenu
          trigger={
            <Button variant='fill' accent='positive' className={styles.trigger}>
              <Icon type='plus-round' className={styles.triggerIcon} />
              <div className={styles.addMetric}>Add metric</div>
            </Button>
          }
          passOpenStateAs='isActive'
          position='bottom'
          align='start'
          offsetY={8}
        >
          <ChartMetricSelector
            className={cx(styles.selector, classes.selector)}
            slug={slug}
            toggleMetric={toggleMetric}
            disabledMetrics={disabledMetrics}
            activeMetrics={activeMetrics}
            activeEvents={activeEvents}
            variant='modal'
          />
        </ContextMenu>
      )}

      <ChartActiveMetrics
        activeMetrics={activeMetrics}
        toggleMetric={toggleMetric}
        activeEvents={activeEvents}
        alwaysShowingMetrics={alwaysShowingMetrics}
        isWideChart={isWideChart}
        {...rest}
      />
    </div>
  </div>
)

export default ChartMetricsTool

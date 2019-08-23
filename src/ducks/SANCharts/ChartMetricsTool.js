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
  disabledMetrics,
  slug,
  toggleMetric,
}) => (
  <div className={styles.wrapper}>
    <ChartActiveMetrics
      activeMetrics={activeMetrics}
      toggleMetric={toggleMetric}
    />
    <ContextMenu
      trigger={
        <Button variant='flat' className={styles.trigger} border>
          <Icon type='plus-round' />
        </Button>
      }
      passOpenStateAs='isActive'
      position='bottom'
      align='start'
    >
      <ChartMetricSelector
        className={cx(styles.selector, classes.selector)}
        slug={slug}
        toggleMetric={toggleMetric}
        disabledMetrics={disabledMetrics}
        activeMetrics={activeMetrics}
      />
    </ContextMenu>
  </div>
)

export default ChartMetricsTool

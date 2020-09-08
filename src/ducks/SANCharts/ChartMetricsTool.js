import React, { useState } from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ChartMetricSelector from './ChartMetricSelector'
import ChartActiveMetrics from './ChartActiveMetrics'
import { useIsBetaMode } from '../../stores/ui'
import styles from './ChartMetricsTool.module.scss'

const ChartMetricsTool = ({
  classes = {},
  className,
  activeMetrics = [],
  activeEvents = [],
  disabledMetrics = [],
  alwaysShowingMetrics = [],
  hiddenMetrics = [],
  slug,
  toggleMetric,
  hideSettings = {},
  isWideChart = false,
  addMetricBtnText = 'Add metric',
  isMobile,
  showLimitMessage,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const isBeta = useIsBetaMode()

  return (
    <div className={styles.container}>
      {isWideChart && <div className={styles.divider} />}
      <div
        className={cx(
          styles.wrapper,
          isWideChart && styles.topOffset,
          className
        )}
      >
        {hideSettings.metricSelector || (
          <ContextMenu
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            trigger={
              <Button
                variant='fill'
                accent='positive'
                className={styles.trigger}
              >
                {!isMobile && (
                  <Icon type='plus-round' className={styles.triggerIcon} />
                )}
                {addMetricBtnText}
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
              hiddenMetrics={hiddenMetrics}
              variant='modal'
              isMobile={isMobile}
              showLimitMessage={showLimitMessage}
              onSave={() => setIsOpen(false)}
              isBeta={isBeta}
            />
          </ContextMenu>
        )}
        {!isMobile && (
          <ChartActiveMetrics
            activeMetrics={activeMetrics}
            toggleMetric={toggleMetric}
            activeEvents={activeEvents}
            alwaysShowingMetrics={alwaysShowingMetrics}
            isWideChart={isWideChart}
            {...rest}
          />
        )}
      </div>
    </div>
  )
}

export default ChartMetricsTool

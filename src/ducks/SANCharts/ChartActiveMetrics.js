import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import MetricExplanation from './MetricExplanation'
import AnomaliesToggle from '../../components/AnomaliesToggle/AnomaliesToggle'
import MetricIcon from './MetricIcon'
import { METRIC_COLORS } from './utils'
import styles from './ChartActiveMetrics.module.scss'

const ChartActiveMetrics = ({
  activeEvents,
  activeMetrics,
  alwaysShowingMetrics = [],
  toggleMetric,
  isShowAnomalies,
  isWideChart,
  ...rest
}) => {
  let newColorId = 0
  return (
    <>
      <section className={cx(styles.wrapper, isWideChart && styles.wideChart)}>
        {activeMetrics.map(metric => {
          const { node, color, label } = metric

          const isAlwaysShowing = alwaysShowingMetrics.includes(metric.key)
          return (
            <MetricExplanation key={label} metric={metric} withChildren>
              <Button border className={styles.btn}>
                <MetricIcon
                  node={node}
                  color={`var(--${color || METRIC_COLORS[newColorId++]})`}
                  className={styles.label}
                />
                {label}
                {!isAlwaysShowing && (
                  <Icon
                    type='close-small'
                    className={styles.icon}
                    onClick={() => toggleMetric(metric)}
                  />
                )}
              </Button>
            </MetricExplanation>
          )
        })}
        {activeEvents.map(event => {
          const { label } = event
          return (
            <MetricExplanation key={label} metric={event} withChildren>
              <Button border className={styles.btn}>
                <Label
                  className={styles.label}
                  variant='circle'
                  accent='persimmon'
                />
                {label}
                <Icon
                  type='close-small'
                  className={styles.icon}
                  onClick={() => toggleMetric(event)}
                />
              </Button>
            </MetricExplanation>
          )
        })}
      </section>
      <AnomaliesToggle
        {...rest}
        isShowAnomalies={isShowAnomalies && activeEvents.length === 0}
      />
      <Button
        border
        as='a'
        accent='positive'
        href='https://forms.gle/Suz8FVDsKtFiKhBs9'
        target='_blank'
        rel='noopener noreferrer'
        style={{
          padding: '0 16px',
          marginLeft: '20px'
        }}
      >
        Feedback
      </Button>
    </>
  )
}

export default ChartActiveMetrics

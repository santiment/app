import React from 'react'
import { Bar } from 'recharts'
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
  ...rest
}) => {
  let newColorId = 0
  return (
    <>
      <section className={styles.wrapper}>
        {activeMetrics.map(metric => {
          const { node, color, label, description } = metric

          const isAlwaysShowing = alwaysShowingMetrics.includes(metric.key)
          return (
            <MetricExplanation
              key={label}
              label={label}
              description={description}
              withChildren
            >
              <Button border className={styles.btn}>
                <MetricIcon
                  isBar={node === Bar}
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
          const { label, description } = event
          return (
            <MetricExplanation
              key={label}
              label={label}
              description={description}
              withChildren
            >
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
    </>
  )
}

export default ChartActiveMetrics

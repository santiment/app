import React from 'react'
import { Bar } from 'recharts'
import Icon from '@santiment-network/ui/Icon'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import MetricExplanation from './MetricExplanation'
import MetricIcon from './MetricIcon'
import { Metrics, Events, METRIC_COLORS } from './utils'
import styles from './ChartActiveMetrics.module.scss'

const ChartActiveMetrics = ({ activeEvents, activeMetrics, toggleMetric }) => {
  let newColorId = 0
  return (
    <section className={styles.wrapper}>
      {activeMetrics.map(metric => {
        const { node, color, label, description } = Metrics[metric]
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
              <Icon
                type='close-small'
                className={styles.icon}
                onClick={() => toggleMetric(metric)}
              />
            </Button>
          </MetricExplanation>
        )
      })}
      {activeEvents.map(event => {
        const { label, description } = Events[event]
        return (
          <MetricExplanation
            key={label}
            label={label}
            description={description}
            withChildren
          >
            <Button key={event} border className={styles.btn}>
              <Label
                className={styles.label}
                variant='circle'
                accent='persimmon'
              />
              {label}
              <Icon
                type='close-small'
                className={styles.icon}
                onClick={() => toggleMetric(event, true)}
              />
            </Button>
          </MetricExplanation>
        )
      })}
    </section>
  )
}

export default ChartActiveMetrics

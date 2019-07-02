import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import { Metrics, METRIC_COLORS } from './utils'
import styles from './ChartActiveMetrics.module.scss'

const ChartActiveMetrics = ({ activeMetrics, toggleMetric }) => {
  let newColorId = 0
  return (
    <section className={styles.wrapper}>
      {activeMetrics.map(metric => (
        <Button
          border
          key={metric}
          onClick={() => toggleMetric(metric)}
          className={styles.btn}
        >
          <Label
            variant='circle'
            accent={Metrics[metric].color || METRIC_COLORS[newColorId++]}
            className={styles.label}
          />
          {Metrics[metric].label}
          <Icon type='close-small' className={styles.icon} />
        </Button>
      ))}
    </section>
  )
}

export default ChartActiveMetrics

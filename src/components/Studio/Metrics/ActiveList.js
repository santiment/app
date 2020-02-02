import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import ActiveMetrics from '../../../ducks/SANCharts/IntervalSelector'
import MetricExplanation from '../../../ducks/SANCharts/MetricExplanation'
import MetricIcon from '../../../ducks/SANCharts/MetricIcon'
import { getSyncedColors } from '../../../ducks/SANCharts/Chart/Synchronizer'
import styles from './ActiveList.module.scss'

export default ({ activeMetrics, toggleMetric }) => {
  const colors = getSyncedColors(activeMetrics)
  const isMoreThanOneMetric = activeMetrics.length > 1

  return (
    <>
      {activeMetrics.map(metric => {
        const { key, dataKey = key, node, label, description } = metric

        return (
          <MetricExplanation
            key={label}
            label={label}
            description={description}
            withChildren
          >
            <Button border className={styles.btn}>
              <MetricIcon
                isBar={node === 'bar'}
                color={colors[dataKey]}
                className={styles.label}
              />
              {label}
              {isMoreThanOneMetric && (
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
    </>
  )
}

import React, { useState, useEffect } from 'react'
import Icon from '@santiment-network/ui/Icon'
import { POPULAR_METRICS } from './defaults'
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
import styles from './MobilePopularMetrics.module.scss'

const LS_LABEL = 'TOOLTIP_MOBILE_METRICS_SWIPES'

const MobilePopularMetrics = ({
  metrics: activeMetrics = [],
  onToggleMetric,
  ...rest
}) => {
  const [isShow, setIsShow] = useState(false)
  const [wasShown] = useState(localStorage.getItem(LS_LABEL))
  const [savedMetrics] = useState(activeMetrics)

  const hideTooltip = () => {
    localStorage.setItem(LS_LABEL, '+')
    setIsShow(false)
  }

  useEffect(() => {
    if (!wasShown) {
      setIsShow(true)
    }
  }, [])

  const metrics = POPULAR_METRICS.filter(
    metric => !activeMetrics.includes(metric)
  )

  return metrics.length > 0 ? (
    <>
      <h3 className={styles.heading}>Popular metrics</h3>
      {isShow && (
        <div className={styles.tooltip}>
          <span className={styles.text}>
            Swipe left to add or remove a metric. Swipe right to learn more
            about the selected metric.
          </span>
          <Icon type='close' className={styles.close} onClick={hideTooltip} />
        </div>
      )}
      {metrics.map(metric => (
        <MobileMetricCard
          useInitialAnimation={
            activeMetrics.length > 0 || savedMetrics !== activeMetrics
          }
          metric={metric}
          onToggleMetric={() => {
            onToggleMetric(metric)
            if (isShow) {
              hideTooltip()
            }
          }}
          key={metric.label + 'popular'}
          {...rest}
        />
      ))}
    </>
  ) : null
}

export default MobilePopularMetrics

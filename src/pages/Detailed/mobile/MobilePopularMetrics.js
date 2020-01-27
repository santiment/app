import React, { useState, useEffect } from 'react'
import Icon from '@santiment-network/ui/Icon'
import { POPULAR_METRICS } from './utils'
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard'
import styles from './MobilePopularMetrics.module.scss'

const LS_LABEL = 'TOOLTIP_MOBILE_METRICS_SWIPES'

const MobilePopularMetrics = ({ metrics, onToggleMetric, ...rest }) => {
  const [isShow, setIsShow] = useState(false)

  const wasShown = localStorage.getItem(LS_LABEL)

  const hideTooltip = () => {
    localStorage.setItem(LS_LABEL, '+')
    setIsShow(false)
  }

  useEffect(() => {
    if (!wasShown) {
      setIsShow(true)
    }
  }, [])

  return (
    <>
      <h3 className={styles.heading}>Popular metrics</h3>
      {isShow && !wasShown && (
        <div className={styles.tooltip}>
          <span className={styles.text}>
            Swipe left to add or remove a metric. Swipe right to learn more
            about the selected metric.
          </span>
          <Icon type='close' className={styles.close} onClick={hideTooltip} />
        </div>
      )}
      {POPULAR_METRICS.map(metric => (
        <MobileMetricCard
          metric={metric}
          hide={metrics.includes(metric)}
          onToggleMetric={() => {
            onToggleMetric(metric)
            if (isShow) {
              hideTooltip()
            }
          }}
          key={metric.key + 'popular'}
          {...rest}
        />
      ))}
    </>
  )
}

export default MobilePopularMetrics

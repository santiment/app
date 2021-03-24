import React from 'react'
import cx from 'classnames'
import ExplanationTooltip from '../../../components/ExplanationTooltip/ExplanationTooltip'
import { toggleFavoriteMetric } from '../../../stores/user/metrics'
import styles from './ActiveMetrics.module.scss'

const MetricFavorite = ({ metric, favoriteMetricSet, onClick }) => {
  const { base = metric } = metric
  const isActive = favoriteMetricSet.has(base)

  return (
    <ExplanationTooltip
      text={
        isActive ? 'Remove metric from favorites' : 'Add metric to favorites'
      }
    >
      <div
        className={cx(
          styles.settings__btn,
          styles.favorite,
          isActive && styles.favorite_active
        )}
        onClick={() => toggleFavoriteMetric(base)}
      >
        <svg width='16' height='15' xmlns='http://www.w3.org/2000/svg'>
          <path d='M11.74 14.85c-.19 0-.38-.05-.54-.14l-3.12-1.64a.17.17 0 00-.16 0l-3.11 1.64a1.17 1.17 0 01-1.7-1.23L3.7 10a.17.17 0 00-.06-.15L1.14 7.4a1.17 1.17 0 01.65-2l3.48-.5a.17.17 0 00.12-.1l1.56-3.15a1.17 1.17 0 012.1 0l1.55 3.16a.17.17 0 00.13.09l3.49.5a1.17 1.17 0 01.65 2l-2.53 2.46a.17.17 0 00-.05.15l.6 3.47a1.17 1.17 0 01-1.15 1.36z' />
        </svg>
      </div>
    </ExplanationTooltip>
  )
}

export default MetricFavorite

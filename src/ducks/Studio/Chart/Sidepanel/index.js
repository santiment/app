import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import {
  TOP_HOLDERS_PANE,
  METRICS_EXPLANATION_PANE,
  SPENT_COIN_COST,
  SOCIAL_CONTEXT,
} from './panes'
import HolderDistribution from './HolderDistribution'
import MetricsExplanation from './MetricsExplanation'
import PriceHistogram from '../../AdvancedView/PriceHistogram'
import SocialContext from '../../AdvancedView/SocialContext'
import styles from './index.module.scss'

const Components = {
  [TOP_HOLDERS_PANE]: HolderDistribution,
  [METRICS_EXPLANATION_PANE]: MetricsExplanation,
  [SPENT_COIN_COST]: PriceHistogram,
  [SOCIAL_CONTEXT]: SocialContext,
}

export const CloseButton = ({ className, ...props }) => (
  <div className={cx(styles.close, className)} {...props}>
    <div className={styles.icons}>
      <Icon type='sidebar' className={styles.icon} />
    </div>
  </div>
)

export default ({ className, contentClassName, chartSidepane, toggleChartSidepane, ...props }) => {
  const El = Components[chartSidepane]

  if (!El) {
    toggleChartSidepane()
    return null
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <CloseButton onClick={() => toggleChartSidepane()} />
      <div className={cx(styles.content, contentClassName)}>
        {El.Title && (
          <div className={styles.title}>
            <El.Title {...props} />
          </div>
        )}
        <El {...props} />
      </div>
    </div>
  )
}

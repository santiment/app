import React from 'react'
import cx from 'classnames'
import { formatOnlyPrice } from '../../../utils/plans'
import styles from './PlanDialogLabels.module.scss'

const FreeTrialLabel = ({ price, nextPaymentDate }) => {
  return (
    <div className={cx(styles.container, styles.free)}>
      <div className={styles.title}>
        Enjoy your 14-day free trial of Sanbase Pro!
      </div>

      <div className={styles.description}>
        Your card will be charged{' '}
        <span className={styles.highline}>${formatOnlyPrice(price)}</span> after
        the trial period ends. You won't be charged if you cancel anytime before{' '}
        <span className={styles.highline}>{nextPaymentDate}</span>
      </div>
    </div>
  )
}

export default FreeTrialLabel

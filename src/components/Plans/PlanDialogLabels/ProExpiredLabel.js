import React from 'react'
import cx from 'classnames'
import ContactUs from '../../ContactUs/ContactUs'
import { formatOnlyPrice } from '../../../utils/plans'
import styles from './PlanDialogLabels.module.scss'

const ProExpiredLabel = ({ price, nextPaymentDate, period, trialDaysLeft }) => {
  return (
    <div className={cx(styles.container, styles.expired)}>
      {trialDaysLeft < 1 ? (
        <div className={styles.title}>
          Your Pro trial has expired! If you have accidentally bypassed the free trial, please get
          in touch with{' '}
          <ContactUs as='a' className={styles.contact}>
            our support team
          </ContactUs>
        </div>
      ) : (
        <div className={styles.title}>
          Your trial will end in {trialDaysLeft} day
          {trialDaysLeft === 1 ? '' : 's'}, you are free to upgrade it right now.
        </div>
      )}

      <div className={styles.description}>
        Your card will be charged <span className={styles.highline}>{formatOnlyPrice(price)}</span>{' '}
        every {period} until your decide to unsubscribe. Your next payment:{' '}
        <span className={styles.highline}>{nextPaymentDate}</span>.
      </div>
    </div>
  )
}

export default ProExpiredLabel

import React from 'react'
import Button from '@santiment-network/ui/Button'
import PlanPaymentDialog from './PlanPaymentDialog'
import PlanChangeDialog from './PlanChangeDialog'
import PlanPipedriveDialog from './PlanPipedriveDialog'
import styles from './Plans.module.scss'

const PlanActionDialog = ({ subscription, ...rest }) =>
  subscription && !subscription.trialEnd ? (
    <PlanChangeDialog subscription={subscription} {...rest} />
  ) : (
    <PlanPaymentDialog subscription={subscription} {...rest} />
  )

export default {
  FREE: {
    title: 'Free',
    desc: 'For individuals just getting started with crypto',
    discount: 'Free forever',
    link: 'Upgrade now',
    Component: () => (
      <Button accent='blue' border fluid className={styles.link} disabled>
        Default plan
      </Button>
    ),
    features: [
      'Access to basic signals',
      'Up to 10 active signals at a time',
      'Sanbase metrics - 2 years of historical data',
      'Sanbase metrics - up to last 30 days of data'
    ]
  },
  BASIC: {
    title: 'Basic',
    desc: 'Great for short-term analysis and prototyping',
    link: 'Upgrade now',
    Component: PlanActionDialog,
    features: [
      'Access to all signal types',
      'Up to 10 active signals at a time',
      'Sanbase metrics - 2 years of historical data',
      'Sanbase metrics - up to last 7 days of data',
      'Exclusive market reports'
    ]
  },
  PRO: {
    title: 'Pro',
    // isPopular: true,
    desc: 'Advanced metrics & serious backtesting potential',
    Component: PlanActionDialog,
    link: 'Upgrade now',
    features: [
      'Access to all signal types',
      'Unlimited active signals',
      'Sanbase metrics - 5 years of historical data',
      'Sanbase metrics - including present-day data',
      'Exclusive market reports',
      <span>
        Bonus: Full access in{' '}
        <a
          className={styles.featureLink}
          target='_blank'
          rel='noopener noreferrer'
          href='https://sheets.santiment.net/'
        >
          Sansheets
        </a>
      </span>
    ]
  },
  ENTERPRISE: {
    title: 'Custom',
    desc: 'For organizations that need advanced data and support',
    discount: 'Based on your needs',
    link: 'Contact us',
    Component: props => (
      <PlanPipedriveDialog
        {...props}
        title='Enterprise plan Pipedrive form'
        src='https://pipedrivewebforms.com/form/0527db4d781f7c4c0760b7bc7a58549c4144829'
      />
    ),
    features: [
      'Access to all signal types',
      'Unlimited active signals',
      'Sanbase metrics - 3 years of historical data',
      'Sanbase metrics - including present-day data',
      'Exclusive market reports'
    ]
  }
}

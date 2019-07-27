import React from 'react'
import Button from '@santiment-network/ui/Button'
import PlanPaymentDialog from './PlanPaymentDialog'
import PlanChangeDialog from './PlanChangeDialog'
import PlanPipedriveDialog from './PlanPipedriveDialog'
import styles from './Plans.module.scss'

const PlanActionDialog = props =>
  props.subscription ? (
    <PlanChangeDialog {...props} />
  ) : (
    <PlanPaymentDialog {...props} />
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
      'Up to 10 signals',
      'Limited type of signals',
      'Limited metrics data',
      'Samples data'
    ]
  },
  BASIC: {
    title: 'Basic',
    desc: 'Great for short-term analysis and prototyping',
    link: 'Upgrade now',
    Component: PlanActionDialog,
    features: [
      'Up to 10 signals',
      'All types of signals',
      'Limited metrics data',
      'Samples data',
      'Handcrafted reports'
    ]
  },
  PRO: {
    title: 'Pro',
    isPopular: true,
    desc: 'Advanced metrics & serious backtesting potential',
    Component: PlanActionDialog,
    link: 'Upgrade now',
    features: [
      'All types of signals',
      'Limited metrics data',
      'Samples data',
      'Handcrafted reports',
      'Bundles with all data providers'
    ]
  },
  ENTERPRISE: {
    title: 'Enterprise',
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
      'All types of signals',
      'Limited metrics data',
      'Samples data',
      'Handcrafted reports',
      'Bundles with all data providers',
      '24/7 prioritised support'
    ]
  }
}

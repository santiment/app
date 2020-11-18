import React from 'react'
import Button from '@santiment-network/ui/Button'
import PlanPaymentDialog from './PlanPaymentDialog'
import PlanChangeDialog from './PlanChangeDialog'
import PlanPipedriveDialog from './PlanPipedriveDialog'
import styles from './Plans.module.scss'

const PlanActionDialog = ({ subscription, ...rest }) => {
  if (subscription) {
    return subscription.trialEnd ? (
      <PlanPaymentDialog
        subscription={subscription}
        {...rest}
        label='Buy Pro'
      />
    ) : (
      <PlanChangeDialog subscription={subscription} {...rest} />
    )
  }

  return <PlanPaymentDialog subscription={subscription} {...rest} />
}

export default {
  FREE: {
    title: 'Free',
    desc: 'For individuals just getting started with crypto',
    discount: 'Free forever',
    link: "Sign up, It's Free",
    Component: () => (
      <Button accent='blue' border fluid className={styles.link} disabled>
        Default plan
      </Button>
    ),
    features: [
      'All Sanbase metrics - minus last 30 days',
      'All Sanbase metrics - up to 2 years of historical data',
      'Access to basic coin alerts',
      'Up to 10 active coin alerts',
      'Personalized asset watchlists',
      'Access to Sanbase Screener (minus PRO filters)'
    ]
  },
  PRO: {
    title: 'Pro',
    desc: 'Advanced metrics & serious backtesting potential',
    Component: PlanActionDialog,
    link: 'Start Free 14-Day Trial',
    features: [
      <b>All in Free and:</b>,
      'Closed chat',
      'Sanbase metrics: full historical and present-day data',
      'Access to all Sanbase alerts',
      'Full access to Santiment Screener',
      'Daily market insights',
      'Google Sheets / Excel plugin',
      'Exclusive weekly Pro reports',
      'Market segment dashboards (stablecoins, defi, dexes and more)'
    ]
  },
  PRO_PLUS: {
    title: 'Pro+',
    desc: 'Advanced metrics & serious backtesting potential',
    Component: PlanActionDialog,
    link: 'Start Free 14-Day Trial',
    features: [
      <b>All in PRO and:</b>,
      'Closed Webinars with Santiment Analytics',
      'Dedicated account manager',
      'Basic API',
      'Google Sheets / Excel plugin',
      'Closed chat with Santiment market analysts',
      'Basic API 300k API calls'
    ]
  },
  BASIC: {
    title: 'Basic',
    desc: 'Great for short-term analysis and prototyping',
    link: 'Start Free 14-Day Trial',
    Component: PlanActionDialog,
    features: [
      'Access to all alert types',
      'Up to 10 active alerts at a time',
      'Sanbase metrics - 2 years of historical data',
      'Sanbase metrics - up to last 7 days of data',
      'Exclusive market reports'
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
        title='EmergencyPlan plan Pipedrive form'
        src='https://pipedrivewebforms.com/form/0527db4d781f7c4c0760b7bc7a58549c4144829'
      />
    ),
    features: [
      'Access to all alert types',
      'Unlimited active alerts',
      'Sanbase metrics - 3 years of historical data',
      'Sanbase metrics - including present-day data',
      'Exclusive market reports'
    ]
  },
  EMERGENCY: {
    title: 'Emergency Plan',
    desc: 'Need access to Sanbase just for a few trades?',
    discount: '9$ / 5 days',
    link: 'Get access now',
    Component: props => (
      <PlanPipedriveDialog
        {...props}
        title='EmergencyPlan plan Pipedrive form'
        src='https://pipedrivewebforms.com/form/0527db4d781f7c4c0760b7bc7a58549c4144829'
      />
    ),
    features: ['No automatic renewal', 'Simple upgrade options']
  }
}

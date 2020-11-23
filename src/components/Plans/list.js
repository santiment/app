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
    desc: 'For those getting started in crypto',
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
      'Personalized asset watchlists',
      'Access to Sanbase Screener (minus PRO filters and saves)',
      'Access to basic coin alerts',
      'Up to 10 active coin alerts'
    ]
  },
  PRO: {
    title: 'Pro',
    desc: 'Advanced crypto metrics and market insights',
    Component: PlanActionDialog,
    link: 'Start Free 14-Day Trial',
    features: [
      <b>All in Free and:</b>,
      'Sanbase metrics: full historical and present-day data',
      'Get unlimited access to every daily market insight',
      'Exclusive weekly Pro reports',
      'Full access to Santiment Screener',
      'Access to all Sanbase alerts',
      'Closed chat',
      'Google Sheets Plugin'
    ]
  },
  PRO_PLUS: {
    title: 'Pro+',
    desc: 'Complete analytics & backtesting framework',
    Component: PlanActionDialog,
    link: 'Start Free 14-Day Trial',
    features: [
      <b>All in PRO and:</b>,
      'Dedicated account manager',
      'Basic API 300k API calls',
      'Closed Webinars with Santiment Analytics',
      'Closed chat with Santiment market analysts',
      'Custom education & onboarding'
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

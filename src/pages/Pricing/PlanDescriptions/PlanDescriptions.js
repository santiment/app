import React from 'react'
import Button from '@santiment-network/ui/Button'
import Features from '../../../components/Plans/Features'
import styles from './PlanDescriptions.module.scss'

const Blocks = [
  {
    title: 'Data Science as a Service (DSaaS)',
    description: 'Tailored crypto analytics - from a veteran team',
    btn: (
      <Button
        variant='ghost'
        className={styles.btn}
        border
        onClick={() =>
          window.Intercom &&
          window.Intercom(
            'showNewMessage',
            'Talk with expert about Data Science as a Service.'
          )
        }
      >
        Contact sales
      </Button>
    ),
    features: [
      <div className={styles.feature__link}>Custom crypto dashboards</div>,
      <div className={styles.feature__link}>Backtesting</div>,
      <div className={styles.feature__link}>Trading models</div>,
      <div className={styles.feature__link}>Full access to our quant lab</div>
    ]
  },
  {
    title: 'Education & Onboarding',
    description: 'New to on-chain and fundamental data?',
    btn: (
      <Button
        variant='ghost'
        className={styles.btn}
        border
        onClick={() =>
          window.Intercom &&
          window.Intercom(
            'showNewMessage',
            'Talk with expert about Education & Onboarding.'
          )
        }
      >
        Contact sales
      </Button>
    ),
    features: [
      <div className={styles.feature__link}>Individual walkthroughs</div>,
      <div className={styles.feature__link}>
        Personalized tutorials, metric use cases and demos
      </div>,
      <div className={styles.feature__link}>Weekly educational calls</div>
    ]
  }
]

const PlanDescriptions = () => (
  <div className={styles.container}>
    {Blocks.map(({ title, description, btn, features = [] }, index) => {
      return (
        <div className={styles.block} key={index}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>

          <Features isGreen={true} data={features} classes={styles} />

          <div className={styles.action}>{btn}</div>
        </div>
      )
    })}
  </div>
)

export default PlanDescriptions

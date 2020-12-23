import React from 'react'
import Features from '../../../components/Plans/Features'
import ContactUs from '../../../components/ContactUs/ContactUs'
import styles from './PlanDescriptions.module.scss'

const Blocks = [
  {
    title: 'Data Science as a Service (DSaaS)',
    description: 'Tailored crypto analytics - from a veteran team',
    btn: (
      <ContactUs
        variant='ghost'
        className={styles.btn}
        border
        message='Talk with expert about Data Science as a Service.'
      >
        Contact sales
      </ContactUs>
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
      <ContactUs
        variant='ghost'
        className={styles.btn}
        border
        message='Talk with expert about Education & Onboarding.'
      >
        Contact sales
      </ContactUs>
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

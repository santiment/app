import React from 'react'
import Button from '@santiment-network/ui/Button'
import Features from '../../../components/Plans/Features'
import { PlanDescriptionSvg } from '../../../components/Illustrations/PlanDescriptionSvg'
import styles from './PlanDescriptions.module.scss'

const Blocks = [
  {
    title: 'Data Science as a Service',
    description: 'Advanced metrics & serious backtesting potential',
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
      <b>All in PRO+ and:</b>,
      <div className={styles.feature__link}>Essential API</div>,
      <div className={styles.feature__link}>Custom Branding for Charts</div>
    ]
  },
  {
    title: 'Education & Onboarding',
    description: 'Advanced metrics & serious backtesting potential',
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
      <b>All in PRO+ and:</b>,
      <div className={styles.feature__link}>Essential API</div>,
      <div className={styles.feature__link}>Custom Branding for Charts</div>
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

          <div className={styles.img}>{PlanDescriptionSvg}</div>

          <Features isGreen={true} data={features} classes={styles} />

          {btn}
        </div>
      )
    })}
  </div>
)

export default PlanDescriptions

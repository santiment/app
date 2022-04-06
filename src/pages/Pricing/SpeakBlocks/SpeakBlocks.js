import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import { PATHS } from '../../../paths'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import ContactUs from '../../../components/ContactUs/ContactUs'
import styles from './SpeakBlocks.module.scss'

const Blocks = [
  {
    title: 'Let the platform speak for itself',
    description: 'Add your credit card to try all Sanbase Pro features FREE for 2 weeks',
    btn: (
      <Button
        variant='ghost'
        accent='blue'
        as={Link}
        className={styles.btn}
        to={PATHS.CREATE_ACCOUNT}
      >
        Start your free trial
      </Button>
    ),
  },
  {
    title: 'Talk to one of our experts',
    description:
      'Request a demo to have one of our product specialists walk you through the platform',
    btn: (
      <ContactUs variant='ghost' accent='blue' className={styles.btn} message='Talk with expert.'>
        Request a demo
      </ContactUs>
    ),
  },
]

const SpeakBlocks = () => {
  const { isPro, isProPlus } = useUserSubscriptionStatus()

  if (isPro || isProPlus) {
    return null
  }

  return (
    <div className={styles.container}>
      {Blocks.map(({ title, description, btn }, index) => {
        return (
          <div className={styles.block} key={index}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
            {btn}
          </div>
        )
      })}
    </div>
  )
}

export default SpeakBlocks

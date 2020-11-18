import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import { PATHS } from '../../../paths'
import styles from './SpeakBlocks.module.scss'

const Blocks = [
  {
    title: 'Let’s the platform speak for itself',
    description:
      'Sign up for a free trial to see what Sanbase PRO can do for you',
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
    )
  },
  {
    title: 'Talk to one of our experts',
    description:
      'Request a demo to have one of our product specialists walk you through the platform',
    btn: (
      <Button
        variant='ghost'
        accent='blue'
        className={styles.btn}
        onClick={() =>
          window.Intercom &&
          window.Intercom('showNewMessage', 'Talk with expert.')
        }
      >
        Request a demo
      </Button>
    )
  }
]

const SpeakBlocks = () => (
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

export default SpeakBlocks

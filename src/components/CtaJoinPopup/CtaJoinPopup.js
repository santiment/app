import React from 'react'
import Button from '@santiment-network/ui/Button'
import joinImg from './../../../src/assets/join.svg'
import styles from './CtaJoinPopup.module.scss'
import { Link } from 'react-router-dom'
import { PATHS } from '../../App'

const CtaJoinPopup = () => {
  return (
    <div className={styles.container}>
      <img src={joinImg} alt='Join' />

      <div className={styles.title}>Join the community!</div>
      <div className={styles.description}>
        Santiment is a behavior analytics platform for cryptocurrencies,
        sourcing on-chain, social and development information on 900+ coins.
        Sign up now to receive 20% discount!
      </div>
      <Button
        as={Link}
        to={PATHS.LOGIN}
        variant='fill'
        accent='positive'
        className={styles.btn}
      >
        Start crypto journey
      </Button>
    </div>
  )
}

export default CtaJoinPopup

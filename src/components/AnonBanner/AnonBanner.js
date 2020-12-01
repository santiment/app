import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import styles from './AnonBanner.module.scss'

const AnonBanner = ({ className }) => (
  <div className={cx(styles.wrapper, className)}>
    <h3 className={styles.heading}>Log in to use this feature!</h3>
    <p className={styles.desc}>
      Log in to access more Sanbase features including real-time metrics, market
      alerts, personalized watchlists and other information on 1000+
      cryptocurrencies
    </p>
    <div className={styles.buttons}>
      <Button
        variant='fill'
        accent='positive'
        as={Link}
        to='/login'
        className={styles.btn}
      >
        Log in
      </Button>
      <Button
        variant='flat'
        as={Link}
        to='/sign-up'
        border
        className={styles.btn}
      >
        Create an account
      </Button>
    </div>
  </div>
)

export default AnonBanner

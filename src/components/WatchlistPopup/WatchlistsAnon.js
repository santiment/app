import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@santiment-network/ui'
import styles from './WatchlistsAnon.module.scss'

const WatchlistsAnon = () => (
  <div className={styles.wrapper}>
    Use Watchlist to organize and track assets you're interested in.
    <p className={styles.msg}>
      You'll need to have an account to use this feature.
    </p>
    <Button variant='flat' className={styles.btn} as={Link} to={'login'}>
      {' '}
      Log in{' '}
    </Button>
  </div>
)

export default WatchlistsAnon

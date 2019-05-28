import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Button } from '@santiment-network/ui'
import Image from '../../pages/SonarFeed/sonar_activity_artboard.png'
import styles from './WatchlistsAnon.module.scss'

const WatchlistsAnon = ({ isPopup = true }) => (
  <div className={styles.wrapper}>
    <img alt='watchlists' src={Image} className={styles.img} />
    <p className={styles.title}>Easy asset tracking</p>
    <p className={styles.desc}>Use watchlists to organize and track</p>
    <p className={styles.desc}>assets you are interested in</p>
    <div className={cx(!isPopup && styles.bottomFixed, styles.bottom)}>
      <p className={styles.bottomDesc}>Please, log in to use this feature</p>
      <Button
        variant='fill'
        accent='positive'
        className={styles.btn}
        as={Link}
        to={'/login'}
      >
        Login
      </Button>
    </div>
  </div>
)

export default WatchlistsAnon

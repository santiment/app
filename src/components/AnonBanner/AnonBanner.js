import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import Button from '@santiment-network/ui/Button'
import { PATHS } from '../../paths'
import styles from './AnonBanner.module.scss'

const AnonBanner = ({ className, ...props }) => (
  <Dialog {...props} title=' ' classes={{ title: styles.header }}>
    <div className={cx(styles.wrapper, className)}>
      <h3 className={styles.heading}>Log in to use this feature!</h3>
      <p className={styles.desc}>
        Log in to access more Sanbase features including real-time metrics,
        market alerts, personalized watchlists and other information on 1000+
        cryptocurrencies
      </p>
      <div className={styles.buttons}>
        <Button
          variant='fill'
          accent='positive'
          as={Link}
          to={PATHS.LOGIN}
          className={styles.btn}
        >
          Log in
        </Button>
        <Button
          variant='flat'
          as={Link}
          to={PATHS.CREATE_ACCOUNT}
          border
          className={cx(styles.btn, styles.createAccBtn)}
        >
          Create an account
        </Button>
        <div className={styles.new}>
          New to Santiment?{' '}
          <Link to={PATHS.CREATE_ACCOUNT} className={styles.createLink}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  </Dialog>
)

export default AnonBanner

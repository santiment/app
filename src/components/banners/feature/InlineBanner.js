import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import styles from './InlineBanner.module.scss'

const FeatureAnonBanner = ({ className, title, description }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.left}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
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
}

export default FeatureAnonBanner

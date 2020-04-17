import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import styles from './AnonBanner.module.scss'

const AnonBanner = ({ className }) => (
  <div className={cx(styles.wrapper, className)}>
    <p>Please, log in to use this feature</p>
    <Button
      variant='fill'
      accent='positive'
      fluid
      as={Link}
      to='/login'
      className={styles.btn}
    >
      Log in
    </Button>
  </div>
)

export default AnonBanner

import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './index.module.scss'

const LoginEmailBtn = () => {
  return (
    <Link to='/login/email' className={cx(styles.btn, styles.btn_email)}>
      <Icon type='envelope' className={styles.btn__icon} />
      Email
    </Link>
  )
}

export default LoginEmailBtn

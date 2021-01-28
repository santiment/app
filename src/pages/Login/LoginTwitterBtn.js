import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'
import Icon from '@santiment-network/ui/Icon'

const AUTH_LINK = (
  process.env.REACT_APP_BACKEND_URL || window.location.hostname
).includes('stage')
  ? 'https://api-stage.santiment.net/auth/twitter'
  : 'https://api.santiment.net/auth/twitter'

const LogitTwitterBtn = ({ signUp, className }) => (
  <a
    href={AUTH_LINK}
    className={cx(styles.btn, styles.btn_email, styles.btn_google, className)}
  >
    {<Icon type='twitter' className={cx(styles.btn__icon, styles.twitter)} />}{' '}
    Sign {signUp ? 'up' : 'in'} with Twitter
  </a>
)

export default LogitTwitterBtn

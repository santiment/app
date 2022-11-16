import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { trackLoginStart, LoginType } from 'webkit/analytics/events/general'
import { trackSignupStart } from 'webkit/analytics/events/onboarding'
import styles from './index.module.scss'

const AUTH_LINK = (process.env.REACT_APP_BACKEND_URL || window.location.hostname).includes('stage')
  ? 'https://api-stage.santiment.net/auth/twitter'
  : 'https://api.santiment.net/auth/twitter'

const LogitTwitterBtn = ({ signUp, className }) => {
  function onClick() {
    if (signUp) {
      trackSignupStart(LoginType.TWITTER)
    } else {
      trackLoginStart(LoginType.TWITTER)
    }
  }

  return (
    <a
      href={AUTH_LINK}
      className={cx(styles.button, 'btn-2 row v-center mrg-s mrg--t', className)}
      onClick={onClick}
    >
      {<Icon type='twitter' className={cx(styles.btn__icon, styles.twitter)} />}
      {signUp ? 'Sign up ' : 'Log in '} with Twitter
    </a>
  )
}

export default LogitTwitterBtn

import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const AUTH_LINK = (
  process.env.REACT_APP_BACKEND_URL || window.location.hostname
).includes('stage')
  ? 'https://api-stage.santiment.net/auth/google'
  : 'https://api.santiment.net/auth/google'

const GoogleIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='18'
    viewBox='0 0 48 48'
    className={styles.btn__icon}
  >
    <path
      fill='#EA4335'
      d='M24 9.5a13 13 0 019.2 3.6l6.9-6.8a24 24 0 00-37.5 7l8 6.1c1.8-5.7 7.1-9.9 13.4-9.9z'
    />
    <path
      fill='#4285F4'
      d='M47 24.6c0-1.6-.2-3.1-.4-4.6H24v9h13c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 7-10.4 7-17.6z'
    />
    <path
      fill='#FBBC05'
      d='M10.5 28.6a14.6 14.6 0 010-9.2l-8-6.2a24 24 0 000 21.6l8-6.2z'
    />
    <path
      fill='#34A853'
      d='M24 48c6.5 0 12-2.1 15.9-5.8l-7.7-6c-2.2 1.4-5 2.3-8.2 2.3-6.3 0-11.6-4.2-13.5-10l-8 6.3A24 24 0 0024 48z'
    />
    <path fill='none' d='M0 0h48v48H0z' />
  </svg>
)

const LoginGoogleBtn = ({ signUp, className }) => (
  <a
    href={AUTH_LINK}
    className={cx(styles.btn, styles.btn_email, styles.btn_google, className)}
  >
    {GoogleIcon} Sign {signUp ? 'up' : 'in'} with Google
  </a>
)

export default LoginGoogleBtn

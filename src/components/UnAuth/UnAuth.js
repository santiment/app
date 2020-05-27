import React from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import styles from './UnAuth.module.scss'

const UnAuth = ({ history }) => {
  return (
    <>
      <h2 className={styles.title}>
        Create an account to get your Sanbase experience.
      </h2>
      <p className={styles.info}>
        By having a Sanbase account, you can see more data and alerts about
        crypto projects. You can vote and comment on all you favorite alerts and
        more.
      </p>
      <div className={styles.actions}>
        <Button
          variant='fill'
          accent='positive'
          className={styles.btn}
          onClick={() =>
            history.push(`/login?redirect_to=${history.location.pathname}`)
          }
        >
          Create account
        </Button>
        <Button
          accent='positive'
          border
          onClick={() =>
            history.push(`/login?redirect_to=${history.location.pathname}`)
          }
          className={cx(styles.btn, styles.loginBtn)}
        >
          Log in
        </Button>
      </div>
    </>
  )
}

export default withRouter(UnAuth)

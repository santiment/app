import React from 'react'
import cx from 'classnames'
import { parse } from 'query-string'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import LoginMetamaskBtn from './LoginMetamaskBtn'
import LoginEmail from './LoginEmail'
import styles from './index.module.scss'

const baseLocation = '/login'

const LoginOptions = () => (
  <>
    <h2 className={styles.title}>Log in your account with</h2>
    <div className={styles.options}>
      <LoginMetamaskBtn />
      <Link to='/login/email' className={cx(styles.btn, styles.btn_email)}>
        <Icon type='envelope' className={styles.btn__icon} />
        Email
      </Link>
    </div>
  </>
)

export default ({ isLoggedIn, token, location: { search = '' } }) => {
  if (isLoggedIn) {
    const { consent } = parse(search)
    let redirectTo = '/'

    if (consent) {
      redirectTo = `/consent?consent=${consent}&token=${token}`
    }

    return <Redirect to={redirectTo} />
  }

  return (
    <div className={styles.wrapper}>
      <Panel className={styles.panel}>
        <Switch>
          <Route exact path={`${baseLocation}/email`} render={LoginEmail} />
          <Route path={baseLocation} render={LoginOptions} />
        </Switch>
      </Panel>
    </div>
  )
}

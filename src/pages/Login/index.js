import React from 'react'
import cx from 'classnames'
import { parse } from 'query-string'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import LoginMetamaskBtn from './LoginMetamaskBtn'
import LoginEmailForm from './LoginEmailForm'
import LoginEmailBtn from './LoginEmailBtn'
import FreeTrialBlock from './FreeTrialBlock'
import { PATHS } from '../../App'
import SwipablePages from '../../components/SwipablePages/SwipablePages'
import MobileWrapper from './Mobile/MobileWrapper'
import styles from './index.module.scss'

export const LoginDescription = ({ className }) => (
  <div className={cx(styles.loginBlock, className)}>
    <h3 className={styles.title}>Welcome to Sanbase</h3>
    <div className={styles.options}>
      <LoginMetamaskBtn />
      <div className={styles.divider}>
        <span className={styles.use}>or use</span>
      </div>
      <LoginEmailBtn />

      <div className={styles.new}>
        New to Sanbase?{' '}
        <Link to={PATHS.CREATE_ACCOUNT} className={styles.createLink}>
          Create an account
        </Link>
      </div>
    </div>
  </div>
)

const LoginOptions = props => {
  if (props.isDesktop) {
    return (
      <div className={styles.container}>
        <LoginDescription className={styles.loginBlock_desktop} />
        <div>
          <FreeTrialBlock />
        </div>
      </div>
    )
  }

  return (
    <SwipablePages
      props={props}
      pages={[
        <MobileWrapper onBack={props.history.goBack}>
          <LoginDescription />
        </MobileWrapper>,
        <MobileWrapper onBack={props.history.goBack}>
          <FreeTrialBlock />
        </MobileWrapper>
      ]}
    />
  )
}

export default ({
  isLoggedIn,
  isDesktop,
  token,
  location: { search = '' }
}) => {
  if (isLoggedIn) {
    const { consent } = parse(search)
    let redirectTo = '/'

    if (consent) {
      redirectTo = `/consent?consent=${consent}&token=${token}`
    }

    return <Redirect to={redirectTo} />
  }

  const child = (
    <Switch>
      <Route
        exact
        path={PATHS.LOGIN_VIA_EMAIL}
        render={props => <LoginEmailForm {...props} />}
      />
      <Route
        path={PATHS.LOGIN}
        render={props => <LoginOptions {...props} isDesktop={isDesktop} />}
      />
    </Switch>
  )

  if (!isDesktop) {
    return child
  }

  return (
    <div className={cx('page', styles.wrapper)}>
      <Panel className={styles.panel}>{child}</Panel>
    </div>
  )
}

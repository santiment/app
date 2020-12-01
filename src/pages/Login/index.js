import React from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { parse } from 'query-string'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import OrUseDivider from './OrUseDivider'
import LoginMetamaskBtn from './LoginMetamaskBtn'
import LoginEmailForm from './LoginEmailForm'
import LoginEmailBtn from './LoginEmailBtn'
import LoginGoogleBtn from './LoginGoogleBtn'
import FreeTrialBlock from './FreeTrialBlock'
import { PATHS } from '../../paths'
import SwipablePages from '../../components/SwipablePages/SwipablePages'
import MobileWrapper from './Mobile/MobileWrapper'
import { LoginDivider } from './CreateAccountFreeTrial'
import { hasMetamask as detectMetamask } from '../../web3Helpers'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './index.module.scss'

const hasMetamask = detectMetamask()

export const LoginDescription = ({ className }) => (
  <div
    className={cx(
      styles.loginBlock,
      className,
      !hasMetamask && styles.noMetamask
    )}
  >
    <h3 className={styles.title}>Welcome to Sanbase</h3>
    <div className={styles.options}>
      <LoginMetamaskBtn />
      <OrUseDivider />
      <LoginEmailBtn />
      <LoginGoogleBtn />

      <div className={styles.new}>
        New to Santiment?{' '}
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
        <LoginDescription />

        <LoginDivider />

        <FreeTrialBlock />
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

const Login = ({
  isLoggedIn,
  isDesktop,
  token,
  location: { search = '' },
  history
}) => {
  if (isLoggedIn) {
    const { consent } = parse(search)
    if (consent) {
      const redirectTo = `/consent?consent=${consent}&token=${token}`
      return <Redirect to={redirectTo} />
    } else {
      history.goBack()
    }
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

export default withSizes(mapSizesToProps)(Login)

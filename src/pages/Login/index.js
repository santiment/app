import React from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import { parse } from 'query-string'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import OrUseDivider from './OrUseDivider'
import LoginMetamaskBtn from './LoginMetamaskBtn'
import LoginEmailForm, { EmailForm } from './LoginEmailForm'
import LoginGoogleBtn from './LoginGoogleBtn'
import LogitTwitterBtn from './LoginTwitterBtn'
import { PATHS } from '../../paths'
import MobileWrapper from './Mobile/MobileWrapper'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './index.module.scss'

export const LoginDescription = ({ loading, loginEmail, setEmail, className }) => (
  <div className={cx(styles.loginBlock, 'body-2', className)}>
    <h3 className={cx(styles.title, 'h4 txt-m')}>Welcome back</h3>
    <div className='column hv-center'>
      <LoginMetamaskBtn className='mrg-xl mrg--t' />

      {/*<LoginWalletConnect />*/}

      <LoginGoogleBtn />

      <LogitTwitterBtn />

      <OrUseDivider />

      <EmailForm
        loading={loading}
        loginEmail={loginEmail}
        setEmail={setEmail}
        label='Log in'
        className={styles.emailFormInput}
      />

      <div className={styles.new}>
        New to Santiment?{' '}
        <Link to={PATHS.CREATE_ACCOUNT} className='btn-0'>
          Create an account
        </Link>
      </div>
    </div>
  </div>
)

const LoginOptions = (props) => {
  const { isDesktop, loading, loginEmail, setEmail } = props

  if (isDesktop) {
    return (
      <div className={styles.container}>
        <LoginDescription loading={loading} loginEmail={loginEmail} setEmail={setEmail} />
      </div>
    )
  }

  return (
    <MobileWrapper withHeader>
      <LoginDescription loading={loading} loginEmail={loginEmail} setEmail={setEmail} />
    </MobileWrapper>
  )
}

const Login = ({ isLoggedIn, isDesktop, token, location: { search = '' }, history }) => {
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
      <Route exact path={PATHS.LOGIN_VIA_EMAIL} render={(props) => <LoginEmailForm {...props} />} />
      <Route
        path={PATHS.LOGIN}
        render={(props) => (
          <LoginEmailForm prepareState={LoginOptions} isDesktop={isDesktop} {...props} />
        )}
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

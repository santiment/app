import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel'
import withSizes from 'react-sizes'
import LoginEmailForm, { EmailForm } from './LoginEmailForm'
import LoginGoogleBtn from './LoginGoogleBtn'
import OrUseDivider from './OrUseDivider'
import MobileWrapper from './Mobile/MobileWrapper'
import LoginMetamaskBtn from './LoginMetamaskBtn'
import LogitTwitterBtn from './LoginTwitterBtn'
import { PATHS } from '../../paths'
import { mapSizesToProps } from '../../utils/withSizes'
import externalStyles from './index.module.scss'
import styles from './CreateAccountFreeTrial.module.scss'

const SignupDescription = ({ loading, loginEmail, setEmail, className }) => (
  <div className={cx(externalStyles.loginBlock, 'body-2', className)}>
    <h2 className={cx(externalStyles.title, 'h4 txt-m')}>
      <div>Welcome to Sanbase</div>
    </h2>

    <LoginMetamaskBtn signUp className='mrg-xl mrg--t' />

    {/*<LoginWalletConnect signUp />*/}

    <LoginGoogleBtn signUp />

    <LogitTwitterBtn signUp />

    <OrUseDivider />

    <EmailForm
      signUp
      loading={loading}
      loginEmail={loginEmail}
      setEmail={setEmail}
      className={styles.email}
    />

    <div className='txt-center'>
      <div className={externalStyles.new}>
        Have an account?{' '}
        <Link to={PATHS.LOGIN} className='btn-0'>
          Log in
        </Link>
      </div>
    </div>
  </div>
)

export const PrepareState = (props) => {
  const { isDesktop, loading, loginEmail, setEmail } = props

  if (isDesktop) {
    return (
      <div className={styles.container}>
        <SignupDescription loading={loading} loginEmail={loginEmail} setEmail={setEmail} />
      </div>
    )
  }

  return (
    <MobileWrapper withHeader>
      <SignupDescription loading={loading} loginEmail={loginEmail} setEmail={setEmail} />
    </MobileWrapper>
  )
}

const CreateAccountFreeTrial = (props) => {
  if (props.isLoggedIn) {
    return <Redirect to='/' />
  }

  let child = <LoginEmailForm signUp prepareState={PrepareState} {...props} />

  return props.isDesktop ? (
    <div className={cx('page', styles.wrapper)}>
      <Panel padding className={externalStyles.panel}>
        {child}
      </Panel>
    </div>
  ) : (
    child
  )
}

export default withSizes(mapSizesToProps)(CreateAccountFreeTrial)

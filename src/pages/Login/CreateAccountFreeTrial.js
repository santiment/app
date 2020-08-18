import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { PATHS } from '../../paths'
import withSizes from 'react-sizes'
import LoginEmailForm, { EmailForm } from './LoginEmailForm'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import MobileWrapper from './Mobile/MobileWrapper'
import { mapSizesToProps } from '../../utils/withSizes'
import SwipablePages from '../../components/SwipablePages/SwipablePages'
import { MobileOnly } from '../../components/Responsive'
import externalStyles from './index.module.scss'
import styles from './CreateAccountFreeTrial.module.scss'

const ICON = (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M13.0353 3.38779C10.2241 2.23771 7.22207 3.75141 6.31104 6.53357C6.28502 6.60968 6.11147 7.05787 6.02471 7.29465C5.9553 7.28619 5.89457 7.27773 5.86854 7.27773C5.8078 7.26927 5.78178 7.27774 5.76443 7.28619C5.86854 7.33693 5.91192 7.35385 5.89457 7.35385C5.86854 7.33693 5.82516 7.32001 5.76443 7.29465C5.52149 7.21008 5.06162 7.01559 5.01824 6.99868C4.73192 6.88029 4.4456 6.77035 4.1506 6.65196C2.07694 5.8486 0.064016 7.86123 0.00328114 9.7301C-0.126865 13.3579 3.63871 15.8103 7.01383 15.9878C10.9703 16.1992 13.8855 13.6285 15.4213 10.2798C16.6273 7.6329 16.0026 4.60551 13.0353 3.38779Z'
      fill='var(--jungle-green-light-3)'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0.337315 6.72557C1.16572 7.49505 1.99412 8.28551 2.8155 9.07598C3.74219 9.96438 4.66889 10.8528 5.60962 11.7202C5.80619 11.9021 6.05892 12 6.32569 12C6.33973 12 6.3608 12 6.38187 11.993C6.66268 11.979 6.92944 11.8531 7.11899 11.6362C7.93283 10.7065 8.7607 9.79068 9.58857 8.8749L9.59018 8.87312C9.76911 8.67386 9.94804 8.47503 10.127 8.2762C10.6641 7.67932 11.2013 7.08243 11.7384 6.47374C12.1175 6.04004 12.0824 5.38248 11.6471 4.99774C10.896 4.3262 10.1448 3.61968 9.42168 2.93414L9.36862 2.88404C8.44427 2.01107 7.486 1.10608 6.48717 0.254959C6.07296 -0.101799 5.4622 -0.0808151 5.06906 0.296929C3.62333 1.69671 2.23059 3.17571 0.877987 4.61208C0.838137 4.6544 0.798322 4.69668 0.758542 4.73892L0.288189 5.23559C0.0916186 5.43845 -0.0066691 5.71126 0.000351271 5.99107C0.014392 6.27088 0.133725 6.5367 0.337315 6.72557ZM1.69049 5.9363L1.84766 5.77034L1.84767 5.77034L1.85053 5.7673C1.8873 5.72826 1.92408 5.6892 1.96087 5.65013C3.22661 4.30602 4.50323 2.95036 5.81977 1.65975C6.68063 2.40871 7.5163 3.1979 8.35059 3.98581L8.38967 4.0227C8.39005 4.02306 8.39043 4.02343 8.39082 4.02379C9.0107 4.61147 9.65995 5.22289 10.3159 5.81755C9.88366 6.30417 9.4516 6.78429 9.0158 7.26856C8.83596 7.4684 8.65548 7.66894 8.4741 7.87094L8.4719 7.87336C7.74702 8.67522 7.01493 9.48506 6.29067 10.3064C5.47713 9.5496 4.67061 8.77647 3.85461 7.99419'
      fill='var(--fiord)'
    />
  </svg>
)

const TRIAL_DESCRIPTIONS = [
  {
    text:
      'Full historical and present data for 30+ on-chain, social & development metrics'
  },
  {
    text:
      'Exclusive End-of-Month market & network reports from the Santiment team'
  },
  {
    text:
      'Complete access to our Spreadsheets plugin and our internal market templates'
  }
]

const TrialDescriptions = () => {
  return (
    <div className={styles.trials}>
      {TRIAL_DESCRIPTIONS.map(({ text }, index) => {
        return (
          <div className={styles.trial} key={index}>
            {ICON}

            <span className={styles.trialDescr}>{text}</span>
          </div>
        )
      })}

      <MobileOnly>
        <div className={styles.back}>
          <Icon type='pointer-right' className={styles.iconBack} />
          <Link to={PATHS.CREATE_ACCOUNT} className={styles.link}>
            Start your free trial
          </Link>
        </div>
      </MobileOnly>
    </div>
  )
}

const SignupDescription = ({ loading, loginEmail, setEmail }) => {
  return (
    <div className={externalStyles.loginBlock}>
      <h2 className={externalStyles.title}>
        <div>Sign up now to start </div>
        <div>your free trial</div>
      </h2>

      <div className={styles.subtitle}>Get 14 days free of Sanbase Pro!</div>

      <EmailForm
        loading={loading}
        loginEmail={loginEmail}
        setEmail={setEmail}
      />

      <div className={externalStyles.noCredit}>No credit card required</div>

      <div className={externalStyles.new}>
        Have an account?{' '}
        <Link to={PATHS.LOGIN} className={externalStyles.createLink}>
          Log in
        </Link>
      </div>
    </div>
  )
}

export const LoginDivider = () => (
  <div className={externalStyles.verticalDivider} />
)

export const PrepareState = props => {
  const { isDesktop, loading, loginEmail, setEmail, history } = props

  if (isDesktop) {
    return (
      <div className={styles.container}>
        <SignupDescription
          loading={loading}
          loginEmail={loginEmail}
          setEmail={setEmail}
        />

        <LoginDivider />

        <TrialDescriptions />
      </div>
    )
  }

  return (
    <SwipablePages
      props={props}
      pages={[
        <MobileWrapper onBack={history.goBack}>
          <SignupDescription
            loading={loading}
            loginEmail={loginEmail}
            setEmail={setEmail}
          />
        </MobileWrapper>,
        <MobileWrapper onBack={history.goBack}>
          <TrialDescriptions />
        </MobileWrapper>
      ]}
    />
  )
}

const CreateAccountFreeTrial = props => {
  if (props.isLoggedIn) {
    return <Redirect to='/' />
  }

  let child = <LoginEmailForm prepareState={PrepareState} {...props} />

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

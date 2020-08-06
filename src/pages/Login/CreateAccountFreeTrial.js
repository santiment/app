import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { PATHS } from '../../App'
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
                d='M3.33489 8.53493C2.51244 7.74343 1.68063 6.94971 0.847741 6.17606L0.847397 6.17574C0.795709 6.12779 0.756787 6.05247 0.749997 5.96282C0.75 5.87435 0.781646 5.80411 0.826807 5.7575L0.826842 5.75753L0.832749 5.7513L1.3031 5.25463L1.30453 5.25311C1.34283 5.21245 1.38115 5.17176 1.41948 5.13105C2.77498 3.69161 4.15686 2.22416 5.58944 0.837024C5.70735 0.724429 5.88077 0.722505 5.99771 0.823228L6.00073 0.825818C6.98482 1.66438 7.93112 2.55806 8.85951 3.43483L8.90567 3.47842C8.90588 3.47862 8.90609 3.47882 8.9063 3.47902C9.62991 4.16504 10.3876 4.87774 11.1473 5.55688L11.1473 5.55689L11.1504 5.55968C11.2708 5.66612 11.286 5.85073 11.1745 5.97923C10.6405 6.58435 10.1073 7.17684 9.5713 7.77247C9.39194 7.97177 9.21227 8.17143 9.03214 8.37203L9.03023 8.37414C8.20368 9.28846 7.37244 10.208 6.55465 11.1423L6.55431 11.1427C6.50074 11.2039 6.42543 11.2399 6.34455 11.2439L6.28171 11.2471C6.22009 11.2386 6.16504 11.2123 6.11898 11.1697L6.11803 11.1688C5.18367 10.3073 4.26235 9.42406 3.33489 8.53493ZM3.33489 8.53493C3.33512 8.53514 3.33534 8.53536 3.33557 8.53557L2.8155 9.07598M3.33489 8.53493C3.33477 8.53481 3.33465 8.5347 3.33453 8.53458L2.8155 9.07598M2.8155 9.07598C3.74219 9.96438 4.66889 10.8528 5.60962 11.7202L0.288189 5.23559C0.0916186 5.43845 -0.0066691 5.71126 0.000351271 5.99107C0.014392 6.27088 0.133725 6.5367 0.337315 6.72557C1.16572 7.49505 1.99412 8.28551 2.8155 9.07598Z'
                stroke='var(--fiord)'
                strokeWidtn='1.5'
              />
            </svg>

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

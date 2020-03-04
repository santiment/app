import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../App'
import withSizes from 'react-sizes'
import LoginEmailForm, { EmailForm } from './LoginEmailForm'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel'
import MobileWrapper from './Mobile/MobileWrapper'
import { mapSizesToProps } from '../../utils/withSizes'
import SwipablePages from '../../components/SwipablePages/SwipablePages'
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
              className={styles.icon}
              width='17'
              height='19'
              viewBox='0 0 17 19'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.74023 9.73535C6.77366 9.75209 6.79036 9.76045 6.81543 9.76881C6.79036 9.76045 6.78201 9.75209 6.74023 9.73535Z'
                fill='#181B2B'
              />
              <path
                d='M13.8041 5.91141C11.1049 4.77093 8.22245 6.272 7.34772 9.03095C7.32273 9.10642 7.1561 9.55087 7.07279 9.78567C7.00614 9.77729 6.94783 9.7689 6.92284 9.7689C6.86453 9.76051 6.83954 9.7689 6.82288 9.77729C6.92285 9.8276 6.96449 9.84438 6.94783 9.84438C6.92284 9.82761 6.88119 9.81083 6.82288 9.78567C6.58961 9.70181 6.14807 9.50895 6.10642 9.49217C5.8315 9.37477 5.55659 9.26575 5.27334 9.14835C3.28229 8.35169 1.34955 10.3475 1.29124 12.2008C1.16627 15.7983 4.78184 18.2302 8.02251 18.4063C11.8213 18.616 14.6205 16.0667 16.095 12.7459C17.253 10.1211 16.6532 7.11897 13.8041 5.91141Z'
                fill='#14C393'
              />
              <path
                d='M7.50642 15.0857C7.18985 15.0857 6.88995 14.9683 6.65669 14.7503C5.54037 13.7104 4.4407 12.6454 3.34103 11.5804C2.36634 10.6328 1.38331 9.68521 0.400277 8.76276C0.158685 8.53634 0.0170784 8.21768 0.000416837 7.88224C-0.00791392 7.54681 0.10872 7.21977 0.341981 6.97658L0.900128 6.38118C2.54962 4.61176 4.24911 2.78364 6.01523 1.05615C6.48175 0.603315 7.20652 0.578159 7.69803 1.00584C8.90599 2.04569 10.064 3.15262 11.1803 4.21763C12.0384 5.03944 12.9298 5.88641 13.8211 6.69145C14.3377 7.15267 14.3793 7.94095 13.9295 8.46087C13.0797 9.43363 12.23 10.3812 11.3802 11.3372C10.3972 12.4358 9.41416 13.5343 8.4478 14.6496C8.22287 14.9096 7.90631 15.0605 7.57308 15.0773C7.54808 15.0857 7.52308 15.0857 7.50642 15.0857ZM3.01615 7.79001C3.7076 8.44411 4.39073 9.10658 5.07385 9.76906C5.84861 10.5238 6.6317 11.2785 7.41479 12.0165C8.11457 11.2198 8.81436 10.4399 9.52247 9.64328C10.0973 9.00595 10.6721 8.36025 11.2386 7.72292C10.6305 7.16107 10.039 6.59082 9.45584 6.03736C8.63109 5.24908 7.78969 4.44405 6.93162 3.67255C5.5987 5.02267 4.29076 6.42312 3.01615 7.79001Z'
                fill='#2F354D'
              />
            </svg>

            <span className={styles.trialDescr}>{text}</span>
          </div>
        )
      })}
    </div>
  )
}

const SignupDescription = ({ loading, loginEmail, setEmail }) => {
  return (
    <div className={externalStyles.loginBlock}>
      <h2 className={externalStyles.title}>
        Sign up now to start your free trial
      </h2>

      <div className={styles.subtitle}>Get 14 days free of Sanbase Pro!</div>

      <EmailForm
        loading={loading}
        loginEmail={loginEmail}
        setEmail={setEmail}
      />

      <div className={externalStyles.new}>
        Have an account?{' '}
        <Link to={PATHS.LOGIN} className={externalStyles.createLink}>
          Log in
        </Link>
      </div>
    </div>
  )
}

const PrepareState = props => {
  const { isDesktop, loading, loginEmail, setEmail, history } = props

  if (isDesktop) {
    return (
      <div className={externalStyles.container}>
        <SignupDescription
          loading={loading}
          loginEmail={loginEmail}
          setEmail={setEmail}
        />
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
  let child = <LoginEmailForm prepareState={PrepareState} {...props} />

  if (!props.isDesktop) {
    return child
  }

  return (
    <div className={cx('page', styles.wrapper)}>
      <Panel padding className={styles.container}>
        {child}
      </Panel>
    </div>
  )
}

export default withSizes(mapSizesToProps)(CreateAccountFreeTrial)

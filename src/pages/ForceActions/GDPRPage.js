import React, { useState, useCallback } from 'react'
import { Link, Redirect } from 'react-router-dom'
import cx from 'classnames'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import Notification from '@santiment-network/ui/Notification'
import Loader from '@santiment-network/ui/Loader/Loader'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import Panel from '@santiment-network/ui/Panel'
import SantimentLogo from './SantimentLogo'
import * as actions from './../../actions/types'
import MobileWrapper from '../Login/Mobile/MobileWrapper'
import { useUser } from '../../stores/user'
import { useUsernameChange } from '../../hooks/profileChange'
import styles from './index.module.scss'

const GdprDescription = ({
  toggleGDPR,
  isGDPR,
  togglePrivacyPolicy,
  dispatchNewUsername
}) => {
  const [GDPRerror, setGDPRerror] = useState(false)
  const {
    changeUsername,
    savingUsername,
    usernameError,
    setUsernameError,
    username,
    setUsername,
    checkUsername,
    catchUsernameChangeError
  } = useUsernameChange()

  const continueButtonHandler = useCallback(() => {
    if (savingUsername) return
    if (!isGDPR) setGDPRerror(true)
    if (checkUsername(username) || !isGDPR) return

    changeUsername(username)
      .then(() => {
        dispatchNewUsername(username)
        togglePrivacyPolicy()
      })
      .catch(catchUsernameChangeError)
  }, [
    isGDPR,
    username,
    savingUsername,
    checkUsername,
    catchUsernameChangeError,
    changeUsername
  ])

  return (
    <>
      <h3 className={styles.title}>Welcome to Sanbase</h3>
      <p className={styles.description}>
        Please type your username to access all features
      </p>
      <div className={styles.inputPrefix}>
        <Input
          name='username'
          maxLength='25'
          autoComplete='off'
          placeholder='username'
          onChange={e => {
            setUsernameError()
            setUsername(e.target.value)
          }}
          onBlur={e => checkUsername(e.target.value)}
          isError={!!usernameError}
          errorText={usernameError}
          className={styles.usernameInput}
          disabled={savingUsername}
        />
      </div>
      <p className={styles.description}>
        Review and accept our Privacy Policy to continue using Sanbase
      </p>
      <div className={styles.check}>
        <Checkbox
          isActive={isGDPR}
          onClick={() => {
            setGDPRerror(false)
            toggleGDPR()
          }}
          className={cx(styles.checkbox, GDPRerror && styles.checkboxError)}
          disabled={savingUsername}
        />
        <div className={styles.checkDescription}>
          <label
            className={styles.accept}
            onClick={() => {
              setGDPRerror(false)
              toggleGDPR()
            }}
          >
            I accept{' '}
            <a
              href='https://santiment.net/terms/'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
            >
              Terms
            </a>{' '}
            and{' '}
            <Link to='/privacy-policy' className={styles.link}>
              Privacy Policy
            </Link>
          </label>
        </div>
        {GDPRerror && (
          <Notification
            className={styles.gdprError}
            hasCloseBtn={false}
            title='Please agree with the Privacy Policy to sign up'
            size='small'
            variant='error'
          />
        )}
      </div>
      <Button
        className={styles.toggleBtn}
        variant='fill'
        accent={!savingUsername ? 'positive' : 'grey'}
        onClick={continueButtonHandler}
      >
        {savingUsername ? <Loader className={styles.loader} /> : 'Continue'}
      </Button>
    </>
  )
}

const GDPRPage = ({ togglePrivacyPolicy, dispatchNewUsername, isDesktop }) => {
  const { user } = useUser()
  const [isGDPR, setGDPR] = useState(false)
  const toggleGDPR = () => setGDPR(!isGDPR)

  if (!user || (user && user.privacyPolicyAccepted)) {
    return <Redirect to='/' />
  }

  const child = (
    <GdprDescription
      toggleGDPR={toggleGDPR}
      isGDPR={isGDPR}
      togglePrivacyPolicy={togglePrivacyPolicy}
      dispatchNewUsername={dispatchNewUsername}
    />
  )

  return isDesktop ? (
    <div className={cx('page', styles.wrapper)}>
      <Panel padding className={styles.container}>
        {child}
      </Panel>
    </div>
  ) : (
    <div className={styles.container}>
      <SantimentLogo />
      <MobileWrapper className={styles.mobileWrapper}>{child}</MobileWrapper>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    togglePrivacyPolicy: () => {
      dispatch({ type: actions.USER_TOGGLE_PRIVACY_POLICY })
    },
    dispatchNewUsername: username =>
      dispatch({
        type: actions.USER_USERNAME_CHANGE,
        username
      })
  }
}

const enhance = compose(connect(null, mapDispatchToProps))

export default enhance(GDPRPage)

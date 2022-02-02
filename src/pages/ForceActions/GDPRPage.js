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
import { useChangeUsername } from './hooks'
import styles from './index.module.scss'

const TAKEN_MSG = 'has already been taken'

const GdprDescription = ({ toggleGDPR, isGDPR, togglePrivacyPolicy }) => {
  const [username, setUsername] = useState()
  const [usernameError, setUsernameError] = useState()
  const [GDPRerror, setGDPRerror] = useState(false)
  const { changeUsername, loading } = useChangeUsername()

  const checkUsername = useCallback(() => {
    let error = undefined
    if (!username || username.length < 3) {
      error = 'Username should be at least 3 characters long'
    } else if (username[0] === '@') {
      error = '@ is not allowed for the first character'
    }
    setUsernameError(error)
    return !!error
  }, [username])

  const continueButtonHandler = useCallback(() => {
    if (loading) return
    if (!isGDPR) setGDPRerror(true)
    if (checkUsername() || !isGDPR) return

    changeUsername(username)
      .then(togglePrivacyPolicy)
      .catch(e => {
        let error = 'Something went wrong, please try again later'
        if (e.graphQLErrors) {
          const { details, message } = e.graphQLErrors[0]
          error = message
          if (details.username && details.username.includes(TAKEN_MSG)) {
            error = `Username "${username}" is already teaken`
          }
        }
        setUsernameError(error)
      })
  }, [isGDPR, username, loading])

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
            setUsername(e.target.value)
            setUsernameError()
          }}
          onBlur={checkUsername}
          isError={!!usernameError}
          errorText={usernameError}
          className={styles.usernameInput}
          disabled={loading}
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
          disabled={loading}
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
        accent={!loading ? 'positive' : 'grey'}
        onClick={continueButtonHandler}
      >
        {loading ? <Loader className={styles.loader} /> : 'Continue'}
      </Button>
    </>
  )
}

const GDPRPage = ({ togglePrivacyPolicy, isDesktop }) => {
  const { user } = useUser()
  const [isGDPR, setGDPR] = useState(false)
  const toggleGDPR = () => setGDPR(!isGDPR)

  if (user && user.privacyPolicyAccepted) {
    return <Redirect to='/' />
  }

  const child = (
    <GdprDescription
      toggleGDPR={toggleGDPR}
      isGDPR={isGDPR}
      togglePrivacyPolicy={togglePrivacyPolicy}
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
    }
  }
}

const enhance = compose(connect(null, mapDispatchToProps))

export default enhance(GDPRPage)

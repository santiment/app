import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import cx from 'classnames'
import { Form, Formik } from 'formik'
import isEqual from 'lodash.isequal'
import { useTrackEvents } from '../../hooks/tracking'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import { PATHS } from '../../paths'
import { store } from '../../redux'
import { showNotification } from '../../actions/rootActions'
import MobileWrapper from './Mobile/MobileWrapper'
import FormikInput from '../../components/formik-santiment-ui/FormikInput'
import FormikEffect from '../../components/formik-santiment-ui/FormikEffect'
import { EMAIL_LOGIN_MUTATION } from '../../components/SubscriptionForm/loginGQL'
import styles from './index.module.scss'

export const EmailForm = ({
  loading,
  loginEmail,
  setEmail,
  placeholder = 'Your email',
  label = 'Sign up',
  className,
}) => {
  const [trackEvent] = useTrackEvents()
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={({ email }) => {
        setEmail && setEmail(email)

        trackEvent({
          category: 'User',
          action: 'Choose an email provider',
        })

        loginEmail({
          variables: {
            email: email,
            consent: '',
          },
        })
      }}
    >
      {({ validateForm }) => {
        return (
          <Form className={cx(styles.email__form, className)}>
            <FormikEffect
              onChange={(current, prev) => {
                let { values: newValues } = current

                if (!isEqual(newValues, prev.values)) {
                  validateForm()
                }
              }}
            />

            <FormikInput
              el={Input}
              icon='mail'
              iconPosition='left'
              required
              placeholder={placeholder}
              name='email'
              type='email'
              className={styles.emailInput}
            />

            <button
              className={cx(styles.submit, 'btn-1 body-2 row hv-center mrg-l mrg--t')}
              type='submit'
            >
              {loading ? 'Waiting...' : label}
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

const SuccessState = ({ email, isDesktop, history, showBack = true }) => {
  function clickHandler(event) {
    event.preventDefault()
    history.push(PATHS.LOGIN)
  }
  const child = (
    <div className={cx(styles.emailSuccess)}>
      <h2 className={cx(styles.title, styles.email__title)}>Email Confirmation</h2>
      <h3 className={cx(styles.email__subtitle, styles.email__subtitleSuccess)}>
        We just sent an email to <span className={styles.emailCheck}>{email}</span>. Please check
        your inbox and click on the confirmation link.
      </h3>

      {showBack && (
        <span className={cx(styles.email__link, styles.email__linkSuccess)}>
          Back to{' '}
          <a href={PATHS.LOGIN} className={styles.loginLink} onClick={clickHandler}>
            log in options
          </a>
        </span>
      )}
    </div>
  )

  return isDesktop ? child : <MobileWrapper withHeader>{child}</MobileWrapper>
}

const PrepareState = ({ loading, loginEmail, setEmail, isDesktop }) => {
  const child = (
    <div className={styles.loginViaEmail}>
      <h2 className={cx(styles.title, styles.email__title)}>Welcome back</h2>

      <h3 className={styles.email__subtitle}>
        Log in to your Sanbase account to access additional features of our platform
      </h3>
      <EmailForm loading={loading} loginEmail={loginEmail} setEmail={setEmail} label='Log in' />
      <Link to={PATHS.LOGIN} className={styles.email__link}>
        Or choose{' '}
        <Link to={PATHS.LOGIN} className={styles.loginLink}>
          another log in option
        </Link>
      </Link>
    </div>
  )

  return isDesktop ? child : <MobileWrapper withHeader>{child}</MobileWrapper>
}

const LoginEmailForm = ({
  isDesktop,
  history,
  prepareState: PrepareStateEl = PrepareState,
  showBack = true,
}) => {
  const location = useLocation()
  const [email, setEmail] = useState('')

  return (
    <Mutation mutation={EMAIL_LOGIN_MUTATION} key={location.key}>
      {(loginEmail, { loading, data: { emailLogin: { success } = {} } = {} }) => {
        function login(data) {
          loginEmail(data).catch(() => {
            store.dispatch(
              showNotification({
                variant: 'error',
                title: 'Too many login attempts',
                description: 'Please try again after a few minutes',
              }),
            )
          })
        }

        return success ? (
          <SuccessState email={email} isDesktop={isDesktop} history={history} showBack={showBack} />
        ) : (
          <PrepareStateEl
            loading={loading}
            loginEmail={login}
            setEmail={setEmail}
            isDesktop={isDesktop}
            history={history}
          />
        )
      }}
    </Mutation>
  )
}

export default LoginEmailForm

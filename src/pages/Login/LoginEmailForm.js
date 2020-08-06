import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import cx from 'classnames'
import { Form, Formik } from 'formik'
import isEqual from 'lodash.isequal'
import GA from '../../utils/tracking'
import { InputWithIcon as Input } from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import { PATHS } from '../../App'
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
  label = 'Continue'
}) => {
  return (
    <Formik
      onSubmit={({ email }) => {
        setEmail && setEmail(email)

        GA.event({
          category: 'User',
          action: 'Choose an email provider'
        })
        loginEmail({
          variables: {
            email: email,
            consent: ''
          }
        })
      }}
    >
      {({ validateForm }) => {
        return (
          <Form className={styles.email__form}>
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

            <Button
              variant='fill'
              accent='positive'
              className={styles.email__btn}
              type='submit'
              isLoading={loading}
            >
              {loading ? 'Waiting...' : label}
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

const SuccessState = ({ email, isDesktop, history, showBack = true }) => {
  const child = (
    <div className={cx(styles.emailSuccess)}>
      <h2 className={cx(styles.title, styles.email__title)}>
        Email Confirmation
      </h2>
      <h3 className={cx(styles.email__subtitle, styles.email__subtitleSuccess)}>
        We just sent an email to{' '}
        <span className={styles.emailCheck}>{email}</span>. Please check your
        inbox and click on the confirmation link.
      </h3>

      {showBack && (
        <Link
          to={PATHS.LOGIN}
          className={cx(styles.email__link, styles.email__linkSuccess)}
        >
          Back to{' '}
          <Link to={PATHS.LOGIN} className={styles.loginLink}>
            log in options
          </Link>
        </Link>
      )}
    </div>
  )

  return isDesktop ? (
    child
  ) : (
    <MobileWrapper onBack={history.goBack}>{child}</MobileWrapper>
  )
}

const PrepareState = ({
  loading,
  loginEmail,
  setEmail,
  isDesktop,
  history
}) => {
  const child = (
    <div className={styles.loginViaEmail}>
      <h2 className={cx(styles.title, styles.email__title)}>Welcome back</h2>

      <h3 className={styles.email__subtitle}>
        Log in to your Sanbase account to access additional features of our
        platform
      </h3>
      <EmailForm
        loading={loading}
        loginEmail={loginEmail}
        setEmail={setEmail}
      />
      <Link to={PATHS.LOGIN} className={styles.email__link}>
        Or choose{' '}
        <Link to={PATHS.LOGIN} className={styles.loginLink}>
          another log in option
        </Link>
      </Link>
    </div>
  )

  return isDesktop ? (
    child
  ) : (
    <MobileWrapper onBack={history.goBack}>{child}</MobileWrapper>
  )
}

const LoginEmailForm = ({
  isDesktop,
  history,
  prepareState: PrepareStateEl = PrepareState,
  showBack = true
}) => {
  const [email, setEmail] = useState('')

  return (
    <Mutation mutation={EMAIL_LOGIN_MUTATION}>
      {(
        loginEmail,
        { loading, data: { emailLogin: { success } = {} } = {} }
      ) => {
        return success ? (
          <SuccessState
            email={email}
            isDesktop={isDesktop}
            history={history}
            showBack={showBack}
          />
        ) : (
          <PrepareStateEl
            loading={loading}
            loginEmail={loginEmail}
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

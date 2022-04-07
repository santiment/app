import React, { PureComponent } from 'react'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import * as Sentry from '@sentry/react'
import Button from '@santiment-network/ui/Button'
import Input from '@santiment-network/ui/Input'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { EMAIL_LOGIN_MUTATION } from './loginGQL'
import { store } from '../../redux'
import { showNotification } from '../../actions/rootActions'
import GA from './../../utils/tracking'
import styles from './SubscriptionForm.module.scss'

const SUBSCRIPTION_LABEL = 'Receive product updates and weekly newsletter'

class SubscriptionForm extends PureComponent {
  state = {
    email: '',
    error: undefined,
    hasSubscribed: true,
  }

  componentWillReceiveProps({ hasSubscribed }) {
    if (hasSubscribed !== undefined && hasSubscribed !== this.state.hasSubscribed) {
      this.setState({ ...this.state, hasSubscribed })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { email, error, hasSubscribed, waiting } = this.state

    if (error || waiting) {
      return
    }

    if (!email) {
      this.setState({ error: 'Email is required' })
      return
    }

    this.setState({ waiting: true })

    const { emailLogin } = this.props

    emailLogin({
      variables: { email, subscribeToWeeklyNewsletter: hasSubscribed },
    })
      .then(() => {
        this.setState({ waiting: false })
        GA.event({
          category: 'User',
          action: `User requested an email for verification ${
            hasSubscribed ? 'with' : 'without'
          } subscription`,
        })
        store.dispatch(
          showNotification({
            variant: 'success',
            title: `Verification email has been sent to "${email}"`,
            dismissAfter: 8000,
          }),
        )
      })
      .catch((error) => {
        this.setState({ waiting: false })
        store.dispatch(
          showNotification({
            variant: 'error',
            title: `We got an error while generating verification email. Please try again`,
            dismissAfter: 8000,
          }),
        )
        Sentry.captureException(error)
      })
  }

  onSelect = (data) => {
    const { hasSubscribed } = this.state
    const newValue = !hasSubscribed

    this.setState({ hasSubscribed: newValue })
  }

  onEmailChange(email) {
    let error
    if (!email) {
      error = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = 'Invalid email address'
    }

    this.setState({ email, error })
  }

  onEmailChangeDebounced = ({ currentTarget: { value } }) => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.onEmailChange(value), 500)
  }

  render() {
    const { error, waiting, email, hasSubscribed } = this.state
    const {
      hideCheckbox,
      inputEl: ElInput = Input,
      icon,
      iconPosition,
      classes = {},
      subscriptionLabel,
      subscribeBtnLabel = 'Get started',
    } = this.props

    const label = subscriptionLabel || SUBSCRIPTION_LABEL
    const inputIconProps = iconPosition ? { iconPosition, icon } : {}

    return (
      <>
        <form
          className={cx(
            styles.subscription__form,
            error && styles.subscription__form_error,
            classes.form,
          )}
          onSubmit={this.onSubmit}
        >
          <ElInput
            className={cx(styles.subscription__input, classes.emailInput)}
            placeholder='Enter your email'
            disabled={waiting}
            onChange={this.onEmailChangeDebounced}
            isError={!!error}
            errorText={error}
            {...inputIconProps}
          />
          {!hideCheckbox && (
            <div className={styles.checkBlock} onClick={this.onSelect}>
              <Checkbox
                isActive={hasSubscribed}
                className={cx(styles.checkbox, hasSubscribed && classes.selectedCheckbox)}
                disabled={waiting || !email}
              />
              <div className={cx(styles.subscription__label, classes.subscriptionLabel)}>
                {label}
              </div>
            </div>
          )}
          <Button
            variant='fill'
            accent='positive'
            className={cx(styles.subscription__btn, classes.getStartedBtn)}
            disabled={waiting}
            type='submit'
          >
            {waiting ? 'Waiting...' : subscribeBtnLabel}
          </Button>
        </form>
      </>
    )
  }
}

export default graphql(EMAIL_LOGIN_MUTATION, { name: 'emailLogin' })(SubscriptionForm)

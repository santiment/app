import React, { PureComponent } from 'react'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import Raven from 'raven-js'
import Panel from '@santiment-network/ui/Panel/Panel'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import Input from '@santiment-network/ui/Input'
import { Checkbox } from '@santiment-network/ui/Checkboxes'
import { EMAIL_LOGIN_MUTATION } from './loginGQL'
import { store } from '../../index'
import { showNotification } from '../../actions/rootActions'
import { SUBSCRIPTION_FLAG } from '../../epics/handleEmailLogin'
import GA from './../../utils/tracking'
import styles from './SubscriptionForm.module.scss'

const SUBSCRIPTION_LABEL = 'Receive product updates and weekly newsletter'

class SubscriptionForm extends PureComponent {
  state = {
    email: '',
    error: undefined,
    hasSubscribed: true
  }

  componentWillReceiveProps ({ hasSubscribed }) {
    if (
      hasSubscribed !== undefined &&
      hasSubscribed !== this.state.hasSubscribed
    ) {
      this.setState({ ...this.state, hasSubscribed })
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  onSubmit = e => {
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

    const { emailLogin, hideCheckbox } = this.props

    if (hideCheckbox) {
      this.toggle(true)
    }

    emailLogin({ variables: { email } })
      .then(() => {
        this.setState({ waiting: false })
        GA.event({
          category: 'User',
          action: `User requested an email for verification ${
            hasSubscribed ? 'with' : 'without'
          } subscription`
        })
        store.dispatch(
          showNotification({
            variant: 'success',
            title: `Verification email has been sent to "${email}"`,
            dismissAfter: 8000
          })
        )
      })
      .catch(error => {
        this.setState({ waiting: false })
        store.dispatch(
          showNotification({
            variant: 'error',
            title: `We got an error while generating verification email. Please try again`,
            dismissAfter: 8000
          })
        )
        Raven.captureException(error)
      })
  }

  toggle = enable => {
    if (!enable) {
      localStorage.removeItem(SUBSCRIPTION_FLAG)
    } else {
      localStorage.setItem(SUBSCRIPTION_FLAG, '+')
    }
  }

  onSelect = data => {
    const { hasSubscribed } = this.state
    const newValue = !hasSubscribed

    this.toggle(newValue)
    this.setState({ hasSubscribed: newValue })
  }

  onEmailChange (email) {
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

  render () {
    const { error, waiting, email, hasSubscribed } = this.state
    const {
      hideCheckbox,
      inputEl: ElInput = Input,
      icon,
      iconPosition,
      classes = {},
      subscriptionLabel,
      subscribeBtnLabel = 'Get started'
    } = this.props

    const label = subscriptionLabel || SUBSCRIPTION_LABEL
    const inputIconProps = iconPosition ? { iconPosition, icon } : {}

    return (
      <>
        <form
          className={cx(
            styles.subscription__form,
            error && styles.subscription__form_error,
            classes.form
          )}
          onSubmit={this.onSubmit}
        >
          <ElInput
            className={cx(styles.subscription__input, classes.emailInput)}
            placeholder='Enter your email'
            type='email'
            disabled={waiting}
            onChange={this.onEmailChangeDebounced}
            isError={!!error}
            {...inputIconProps}
          />
          {!hideCheckbox && (
            <div className={styles.checkBlock} onClick={this.onSelect}>
              <Checkbox
                isActive={hasSubscribed}
                className={cx(
                  styles.checkbox,
                  hasSubscribed && classes.selectedCheckbox
                )}
                disabled={waiting || !email}
              />
              <div
                className={cx(
                  styles.subscription__label,
                  classes.subscriptionLabel
                )}
              >
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
          <Panel padding className={styles.subscription__error}>
            <Label accent='persimmon'>{error}</Label>
          </Panel>
        </form>
      </>
    )
  }
}

export default graphql(EMAIL_LOGIN_MUTATION, { name: 'emailLogin' })(
  SubscriptionForm
)

import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Panel, Label, Button, Input, Checkboxes } from '@santiment-network/ui'
import styles from './DashboardPage.module.scss'

export const SUBSCRIPTION_FLAG = 'hasToggledSubscription'

class DashboardPageSubscription extends PureComponent {
  state = {
    email: '',
    error: undefined
  }

  componentWilllUnmout () {
    clearTimeout(this.timeout)
  }

  onSubmit = e => {
    e.preventDefault()
    const { email, error } = this.state

    if (error) {
      return
    }

    if (!email) {
      this.setState({ error: 'Email is required' })
    }
  }

  onSelect = (_, { selectedIndexes: { length } }) => {
    if (!length) {
      localStorage.removeItem(SUBSCRIPTION_FLAG)
    } else {
      localStorage.setItem(SUBSCRIPTION_FLAG, '+')
    }
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
    const { error } = this.state

    return (
      <div className={styles.subscription}>
        <div className={styles.subscription__title}>Better way of research</div>
        <div className={styles.subscription__text}>
          Optimal way to be informed about fresh news and summaries from the
          world of crypto
        </div>

        <form
          className={cx(
            styles.subscription__form,
            error && styles.subscription__form_error
          )}
          onSubmit={this.onSubmit}
        >
          <Input
            className={styles.subscription__input}
            placeholder='Write your email'
            onChange={this.onEmailChangeDebounced}
            isError={error}
          />
          <Button
            variant='fill'
            accent='positive'
            className={styles.subscription__btn}
            type='submit'
          >
            Get started
          </Button>

          <Panel padding className={styles.subscription__error}>
            <Label accent='persimmon'>{error}</Label>
          </Panel>
        </form>
        <Checkboxes
          options={['Receive product updated and weekly newsletter']}
          labelOnRight
          labelClassName={styles.subscription__label}
          onSelect={this.onSelect}
        />
      </div>
    )
  }
}

export default DashboardPageSubscription

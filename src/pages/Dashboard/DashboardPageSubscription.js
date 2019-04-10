import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Button, Input, Checkboxes } from '@santiment-network/ui'
import styles from './DashboardPage.module.scss'

class DashboardPageSubscription extends PureComponent {
  render () {
    return (
      <div className={styles.subscription}>
        <div className={styles.subscription__title}>Better way of research</div>
        <div className={styles.subscription__text}>
          Optimal way to be informed about fresh news and summaries from the
          world of crypto
        </div>

        <form className={cx(styles.subscription__form)}>
          <Input
            className={styles.subscription__input}
            placeholder='Write your email'
          />
          <Button
            variant='fill'
            accent='positive'
            className={styles.subscription__btn}
            type='submit'
          >
            Get started
          </Button>
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

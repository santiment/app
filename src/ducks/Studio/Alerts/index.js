import React from 'react'
import cx from 'classnames'
import { Suggestion } from './suggestions'
import SignalMasterModalForm from '../../Signals/signalModal/SignalMasterModalForm'
import styles from './index.module.scss'

const Alert = ({ alert, render, createAlert }) => {
  function onClick () {
    console.log(alert)
    createAlert(alert)
  }

  return (
    <div className={styles.alert} onClick={onClick}>
      {render}
    </div>
  )
}

export default ({ className, ...rest }) => {
  const suggestions = [Suggestion.price_usd, Suggestion.daily_active_addresses]
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.header}>
        Create alert if:
        <SignalMasterModalForm
          canRedirect={false}
          trigger={<span className={styles.manual}>Create alert manually</span>}
        />
      </div>
      <div className={styles.suggestions}>
        {suggestions.map(({ title, suggesters }) => (
          <div key={title} className={styles.suggestion}>
            <div className={styles.title}>{title}</div>
            {suggesters.map((suggest, i) => (
              <Alert key={i} {...rest} {...suggest(rest)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

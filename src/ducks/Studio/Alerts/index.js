import React from 'react'
import cx from 'classnames'
import { Suggestion } from './suggestions'
import styles from './index.module.scss'

const Alert = ({ alert, render }) => {
  function onClick () {
    console.log(alert)
  }

  return (
    <div className={styles.signal} onClick={onClick}>
      {render}
    </div>
  )
}

export default ({ className, ...rest }) => {
  const { title, suggesters } = Suggestion.price_usd
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.header}>
        Create alert if:
        <span className={styles.manual}>Create alert manually</span>
      </div>
      <div className={styles.suggestions}>
        <div className={styles.suggestion}>
          <div className={styles.title}>{title}</div>
          {suggesters.map((suggest, i) => (
            <Alert key={i} {...rest} {...suggest(rest)} />
          ))}
        </div>
      </div>
    </div>
  )
}

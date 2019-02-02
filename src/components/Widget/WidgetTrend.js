import React, { Fragment } from 'react'
import { FadeIn } from 'animate-components'
import styles from './WidgetTrend.module.scss'

const messages = {
  initial: 'Choose any word below to see its social context',
  isLoading: 'Loading...',
  hasNoData: "Can't find anything about this trend..."
}

const getMessage = states => {
  for (const key of Object.keys(states)) {
    if (states[key]) {
      return messages[key]
    }
  }
  return undefined
}

const WidgetTrend = ({
  trendWord,
  description,
  isLoading,
  hasData,
  error,
  children,
  className
}) => {
  let msg = getMessage({
    isLoading,
    hasNoData: error || !hasData,
    initial: !trendWord
  })

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {msg ? (
        <FadeIn duration='2s' timingFunction='ease-out'>
          {msg}
        </FadeIn>
      ) : (
        <Fragment>
          <div className={styles.info}>
            <span className={styles.word}>{trendWord} </span>
            {description}
          </div>
          {children}
        </Fragment>
      )}
    </div>
  )
}

WidgetTrend.defaultProps = {
  className: ''
}

export default WidgetTrend

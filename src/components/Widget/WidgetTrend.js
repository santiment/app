import React, { Fragment } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import styles from './SocialVolumeWidget.module.scss'

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

const WidgetTrend = ({ trendWord, description, isLoading, hasData, error }) => {
  let msg = getMessage({
    initial: !!trendWord,
    hasNoData: error || hasData,
    isLoading
  })

  return (
    <div className={styles.wrapper}>
      {msg ? (
        <FadeIn duration='2s' timingFunction='ease-out'>
          {msg}
        </FadeIn>
      ) : (
        <Fragment>
          <div className={styles.info}>
            <span className={styles.slug}>{trendWord} </span>
            {description}
          </div>
          {children}
        </Fragment>
      )}
    </div>
  )
}

export default WidgetTrend

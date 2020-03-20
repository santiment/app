import React from 'react'
import cx from 'classnames'
import { FadeIn } from 'animate-components'
import Loader from '@santiment-network/ui/Loader/Loader'
import styles from './WidgetTrend.module.scss'

const Message = {
  initial: 'Choose any word to see its social context',
  isLoading: 'Loading...',
  hasNoData: 'No data in last 48 hours...'
}

const getMessage = ({ initial, isLoading, hasNoData }) => {
  if (isLoading) {
    return Message.isLoading
  }

  if (initial) {
    return Message.initial
  }

  if (hasNoData) {
    return Message.hasNoData
  }

  return undefined
}

const WidgetTrend = ({
  trendWord,
  hideWord,
  description,
  isLoading,
  hasData,
  error,
  children,
  className,
  infoClassName,
  contentClassName
}) => {
  const msg = getMessage({
    isLoading,
    hasNoData: error || !hasData,
    initial: !trendWord && !error
  })

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={cx(styles.info, infoClassName)}>
        {!hideWord && <span className={styles.word}>{trendWord} </span>}
        {description}
      </div>

      {msg ? (
        <FadeIn
          className={styles.container}
          duration='1s'
          timingFunction='ease-out'
        >
          {isLoading ? (
            <Loader className={styles.loader} />
          ) : (
            <h3 className={styles.msg}>{msg}</h3>
          )}
        </FadeIn>
      ) : (
        <div className={cx(styles.content, contentClassName)}>{children}</div>
      )}
    </div>
  )
}

WidgetTrend.defaultProps = {
  className: ''
}

export default WidgetTrend

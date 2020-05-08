import React from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import styles from './WidgetTrend.module.scss'

const Message = {
  initial: 'Select a word',
  isLoading: 'Loading...',
  hasNoData: 'No data in last 2 days'
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
        <div className={styles.container}>
          {isLoading ? (
            <Loader className={styles.loader} />
          ) : (
            <h3 className={styles.msg}>{msg}</h3>
          )}
        </div>
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

import React from 'react'
import cx from 'classnames'
import AlertModal from '../../Alert/AlertModal'
import { prepareAlertTitle } from './utils'
import styles from './OpenSignalLink.module.scss'

const OpenSignalLink = ({
  signal,
  children,
  isUserTheAuthor,
  shouldDisableActions,
  isRecommendedSignal,
}) => {
  const { id, title, isFrozen } = signal

  const trigger = (
    <div>
      <div className={cx(styles.link, isFrozen && styles.frozenLink)}>
        {prepareAlertTitle(title, isFrozen)}
      </div>
      {children}
    </div>
  )

  return (
    <AlertModal
      signalData={isRecommendedSignal && signal}
      isRecommendedSignal={isRecommendedSignal}
      shouldDisableActions={shouldDisableActions}
      id={id}
      trigger={trigger}
      isUserTheAuthor={isUserTheAuthor}
    />
  )
}

export default OpenSignalLink

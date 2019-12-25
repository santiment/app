import React from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'
import { DesktopOnly } from '../../Responsive'
import MultilineText from '../../MultilineText/MultilineText'
import SignalCardHeader from './SignalCardHeader'
import SignalCardBottom from './SignalCardBottom'
import styles from './SignalCard.module.scss'

const SignalCard = ({
  id,
  signal,
  className,
  removeSignal,
  goToSignalSettings,
  toggleSignal,
  isUserTheAuthor,
  deleteEnabled = true,
  showMoreActions = true,
  showStatus = true,
  isMobileVersion = false
}) => {
  const isAwaiting = +id <= 0
  const {
    title,
    description = '',
    isPublic,
    settings: { type }
  } = signal

  const clickable = goToSignalSettings && type !== 'trending_words'

  return (
    <Panel padding className={cx(styles.wrapper, className)}>
      {isMobileVersion && (
        <DesktopOnly>
          <SignalCardHeader
            deleteEnabled={deleteEnabled}
            isUserTheAuthor={isUserTheAuthor}
            isPublic={isPublic}
            removeSignal={removeSignal}
            signal={signal}
          />
        </DesktopOnly>
      )}
      {!isMobileVersion && (
        <SignalCardHeader
          deleteEnabled={deleteEnabled}
          isUserTheAuthor={isUserTheAuthor}
          isPublic={isPublic}
          removeSignal={removeSignal}
          signal={signal}
        />
      )}

      <div className={styles.wrapper__right}>
        <div onClick={clickable ? goToSignalSettings : null}>
          <div className={clickable ? styles.pointer : undefined}>
            <h2 className={styles.title}>{title}</h2>
            {description && (
              <h3 className={styles.description}>
                <MultilineText
                  id='SignalCard__description'
                  maxLines={2}
                  text={description}
                />
              </h3>
            )}
          </div>
        </div>
        <SignalCardBottom
          signalId={id}
          signal={signal}
          showMoreActions={showMoreActions}
          removeSignal={removeSignal}
          toggleSignal={toggleSignal}
          isAwaiting={isAwaiting}
          editable={clickable}
          isUserTheAuthor={isUserTheAuthor}
          deleteEnabled={deleteEnabled}
          showStatus={showStatus}
        />
      </div>
    </Panel>
  )
}

export default SignalCard

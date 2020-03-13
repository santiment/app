import React from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'
import { DesktopOnly } from '../../Responsive'
import MultilineText from '../../MultilineText/MultilineText'
import SignalCardHeader from './SignalCardHeader'
import SignalCardBottom from './SignalCardBottom'
import styles from './SignalCard.module.scss'
import OpenSignalLink from '../../../ducks/Signals/link/OpenSignalLink'

export const canOpenTrigger = ({ type, target }) =>
  type === 'trending_words' ? target !== 'default' : true

const SignalCard = ({
  id,
  signal,
  className,
  toggleSignal,
  isUserTheAuthor,
  deleteEnabled = true,
  showMoreActions = true,
  showStatus = true,
  isSharedTriggerForm = false
}) => {
  const isAwaiting = +id <= 0
  const { title, description = '', isPublic, settings } = signal

  const clickable = canOpenTrigger(settings)

  return (
    <Panel padding className={cx(styles.wrapper, className)}>
      {isSharedTriggerForm && (
        <DesktopOnly>
          <SignalCardHeader
            deleteEnabled={deleteEnabled}
            isUserTheAuthor={isUserTheAuthor}
            isPublic={isPublic}
            signal={signal}
          />
        </DesktopOnly>
      )}
      {!isSharedTriggerForm && (
        <SignalCardHeader
          deleteEnabled={deleteEnabled}
          isUserTheAuthor={isUserTheAuthor}
          isPublic={isPublic}
          signal={signal}
        />
      )}

      <div className={styles.wrapper__right}>
        <OpenSignalLink signal={signal}>
          <div className={clickable ? styles.pointer : ''}>
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
        </OpenSignalLink>
        <SignalCardBottom
          signalId={id}
          signal={signal}
          showMoreActions={showMoreActions}
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

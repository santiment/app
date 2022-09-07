import React from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'
import { canOpenTrigger } from './utils'
import { DesktopOnly, MobileOnly } from '../../Responsive'
import MultilineText from '../../MultilineText/MultilineText'
import SignalCardHeader from './SignalCardHeader'
import SignalCardBottom from './SignalCardBottom'
import OpenSignalLink from '../../../ducks/Signals/link/OpenSignalLink'
import { SignalTypeIcon } from '../controls/SignalControls'
import styles from './SignalCard.module.scss'

const SignalCard = ({
  id,
  signal,
  className,
  toggleSignal,
  isUserTheAuthor,
  deleteEnabled = true,
  showMoreActions = true,
  showStatus = true,
  isSharedTriggerForm = false,
  shouldDisableActions,
  isRecommendedSignal,
}) => {
  const isAwaiting = +id <= 0
  const { description = '', isPublic, settings, isFrozen, settings: { type, metric } = {} } = signal

  const clickable = canOpenTrigger(settings)

  return (
    <Panel padding className={cx(styles.wrapper, isFrozen && styles.frozenWrapper, className)}>
      {isSharedTriggerForm && (
        <DesktopOnly>
          <SignalCardHeader
            shouldDisableActions={shouldDisableActions}
            deleteEnabled={deleteEnabled}
            isUserTheAuthor={isUserTheAuthor}
            isPublic={isPublic}
            signal={signal}
          />
        </DesktopOnly>
      )}
      {!isSharedTriggerForm && (
        <DesktopOnly>
          <SignalCardHeader
            shouldDisableActions={shouldDisableActions}
            deleteEnabled={deleteEnabled}
            isUserTheAuthor={isUserTheAuthor}
            isPublic={isPublic}
            signal={signal}
          />
        </DesktopOnly>
      )}

      <div className={styles.wrapper__right}>
        <MobileOnly>
          <div className='row v-center'>
            <SignalTypeIcon type={type} metric={metric} isFrozen={isFrozen} />
            <OpenSignalLink
              isRecommendedSignal={isRecommendedSignal}
              signal={signal}
              isUserTheAuthor={isUserTheAuthor}
              shouldDisableActions={shouldDisableActions}
              isMobile
            />
          </div>
          {description && (
            <h3
              className={cx(
                styles.description,
                isFrozen && styles.frozenDescription,
                'mrg-m mrg--t',
              )}
            >
              {description}
            </h3>
          )}
        </MobileOnly>
        <DesktopOnly>
          <OpenSignalLink
            isRecommendedSignal={isRecommendedSignal}
            signal={signal}
            isUserTheAuthor={isUserTheAuthor}
            shouldDisableActions={shouldDisableActions}
          >
            <div className={clickable ? styles.pointer : ''}>
              {description && (
                <h3 className={cx(styles.description, isFrozen && styles.frozenDescription)}>
                  <MultilineText id='SignalCard__description' maxLines={2} text={description} />
                </h3>
              )}
            </div>
          </OpenSignalLink>
          <SignalCardBottom
            shouldDisableActions={shouldDisableActions}
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
        </DesktopOnly>
      </div>
    </Panel>
  )
}

export default SignalCard

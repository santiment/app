import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Toggle from '@santiment-network/ui/Toggle'
import { Button } from '@santiment-network/ui'
import { DesktopOnly } from '../../Responsive'
import StatusLabel from '../../StatusLabel'
import MoreSignalActions from '../controls/MoreSignalActions'
import AlertChannelsTooltip from '../../../ducks/Alert/components/AlertChannelsTooltip/AlertChannelsTooltip'
import RemoveSignalButton from '../controls/RemoveSignalButton'
import styles from './SignalCard.module.scss'

const UnpublishedMsg = () => (
  <h4 className={styles.awaiting}>
    <Icon type='clock' className={styles.awaiting__icon} /> Awaiting posting
  </h4>
)

const SignalCardBottom = ({
  signalId,
  signal,
  isPublished = true,
  isAwaiting = false,
  toggleSignal,
  isUserTheAuthor = true,
  deleteEnabled,
  showMoreActions,
  showStatus = true,
  editable = true,
  shouldDisableActions,
}) => {
  const { isActive, isPublic, isFrozen, title } = signal
  return (
    showStatus && (
      <div className={styles.bottom}>
        {showMoreActions && (
          <DesktopOnly>
            <MoreSignalActions
              shouldDisableActions={shouldDisableActions}
              isUserTheAuthor={isUserTheAuthor}
              signalTitle={title}
              signalId={signalId}
              isPublic={isPublic}
              deleteEnabled={deleteEnabled}
              editable={editable}
              signal={signal}
            />
          </DesktopOnly>
        )}

        {isPublished ? (
          <h4 className={styles.author}>
            {isAwaiting && (
              <div className={styles.awaitingBlock}>
                <Icon type='clock-small' />
                <span>&nbsp;&nbsp;Awaiting confirmation</span>
              </div>
            )}
            {isUserTheAuthor && !isAwaiting && (
              <StatusLabel isPublic={isPublic} isFrozen={isFrozen} />
            )}
          </h4>
        ) : (
          <UnpublishedMsg />
        )}
        {!isFrozen && isUserTheAuthor && signal && signal.settings && signal.settings.channel && (
          <AlertChannelsTooltip signal={signal} />
        )}
        {isUserTheAuthor && toggleSignal && !isFrozen && (
          <ToggleSignal isActive={isActive} toggleSignal={toggleSignal} />
        )}
        {isFrozen && (
          <div className={cx(styles.frozenActions, 'row hv-center')}>
            <Button
              as='a'
              href='/pricing'
              rel='noopener noreferrer'
              target='_self'
              variant='fill'
              accent='positive'
            >
              Extend alert
            </Button>
            <RemoveSignalButton
              signalTitle={title}
              id={signalId}
              trigger={() => (
                <Button className='mrg--l mrg-l' border>
                  Delete
                </Button>
              )}
            />
          </div>
        )}
        {isFrozen && (
          <div className={cx(styles.frozenAlert, 'btn-2 btn--s body-3 row hv-center mrg--l mrg-a')}>
            <Icon type='frozen' className='mrg-s mrg--r' />
            Frozen alert
          </div>
        )}
      </div>
    )
  )
}

export const ToggleSignal = ({ isActive, toggleSignal }) => {
  return (
    <div className={styles.right}>
      <div className={cx(styles.toggleLabel, !isActive && styles.disabled)}>
        {isActive ? 'Enabled' : 'Disabled'}
      </div>
      <Toggle onClick={toggleSignal} isActive={isActive} />
    </div>
  )
}

export default SignalCardBottom

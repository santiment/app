import React from 'react'
import cx from 'classnames'
import { DesktopOnly } from '../../Responsive'
import Icon from '@santiment-network/ui/Icon'
import Toggle from '@santiment-network/ui/Toggle'
import StatusLabel from '../../StatusLabel'
import MoreSignalActions from '../controls/MoreSignalActions'
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
  editable = true
}) => {
  const { isActive, isPublic, title } = signal
  return (
    showStatus && (
      <div className={styles.bottom}>
        {showMoreActions && (
          <DesktopOnly>
            <MoreSignalActions
              isUserTheAuthor={isUserTheAuthor}
              signalTitle={title}
              signalId={signalId}
              isPublic={isPublic}
              deleteEnabled={deleteEnabled}
              editable={editable}
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
              <StatusLabel isPublic={isPublic} />
            )}
          </h4>
        ) : (
          <UnpublishedMsg />
        )}
        {isUserTheAuthor && toggleSignal && (
          <ToggleSignal isActive={isActive} toggleSignal={toggleSignal} />
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

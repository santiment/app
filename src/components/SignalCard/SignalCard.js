import React from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import Toggle from '@santiment-network/ui/Toggle'
import { DesktopOnly, MobileOnly } from './../../components/Responsive'
import MultilineText from '../../components/MultilineText/MultilineText'
import StatusLabel from './../../components/StatusLabel'
import { SignalTypeIcon } from './controls/SignalControls'
import MoreSignalActions from './controls/MoreSignalActions'
import styles from './SignalCard.module.scss'

const SignalCard = ({
  id,
  signal,
  className,
  removeSignal,
  goToSignalSettings,
  toggleSignal,
  isUserTheAuthor
}) => {
  const isAwaiting = +id <= 0
  const { title, description = '', isPublic, settings: { type } = {} } = signal

  return (
    <Panel padding className={cx(styles.wrapper, className)}>
      <div
        className={cx(styles.wrapper__left, styles.wrapper__left_subscription)}
      >
        <SignalTypeIcon type={type} />

        <MobileOnly>
          <MoreSignalActions
            isPublic={isPublic}
            removeSignal={removeSignal}
            signalTitle={title}
            signalId={id}
          />
        </MobileOnly>
      </div>
      <div className={styles.wrapper__right}>
        <div onClick={goToSignalSettings}>
          <div className={styles.upper}>
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
          removeSignal={removeSignal}
          toggleSignal={toggleSignal}
          isAwaiting={isAwaiting}
          isUserTheAuthor={isUserTheAuthor}
        />
      </div>
    </Panel>
  )
}

const UnpublishedMsg = () => (
  <h4 className={styles.awaiting}>
    <Icon type='clock' className={styles.awaiting__icon} /> Awaiting posting
  </h4>
)

const SignalCardBottom = ({
  signalId,
  signal,
  removeSignal,
  isPublished = true,
  isAwaiting = false,
  toggleSignal,
  isUserTheAuthor = true
}) => {
  const { isActive, isPublic, title } = signal
  return (
    <div className={styles.bottom}>
      <DesktopOnly>
        <MoreSignalActions
          isUserTheAuthor={isUserTheAuthor}
          removeSignal={removeSignal}
          signalTitle={title}
          signalId={signalId}
          isPublic={isPublic}
        />
      </DesktopOnly>

      {isPublished ? (
        <h4 className={styles.author}>
          {isAwaiting && (
            <div className={styles.awaitingBlock}>
              <Icon type='awaiting' />
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
      {isUserTheAuthor && (
        <div className={styles.right}>
          <Toggle onClick={toggleSignal} isActive={isActive} />
        </div>
      )}
    </div>
  )
}

export default SignalCard

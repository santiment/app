import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import Tooltip from '@santiment-network/ui/Tooltip'
import Message from '@santiment-network/ui/Message'
import ShareModalTrigger from '../../Share/ShareModalTrigger'
import { DesktopOnly } from '../../Responsive'
import RemoveSignalButton from './RemoveSignalButton'
import CopySignal from './CopySignal'
import UpdatePublicity from './UpdatePublicity/UpdatePublicity'
import { mapStateToQS } from '../../../utils/utils'
import styles from '../card/SignalCard.module.scss'

const generateShareLink = (id, title) => {
  const { origin } = window.location
  return `${origin}/alert/${id}${mapStateToQS({
    title,
  })}`
}

const ShareSignal = ({
  trigger,
  className,
  shareBtnClassName,
  signalId,
  signalTitle,
  signal,
  isDialogOnly,
  isAlert,
  isPublic,
  isUserTheAuthor,
}) => {
  const link = generateShareLink(signalId, signalTitle)
  return (
    <div className={cx(styles.sharePanelBtn, className)}>
      <ShareModalTrigger
        isAlert={isAlert}
        isDialogOnly={isDialogOnly}
        trigger={trigger}
        className={shareBtnClassName}
        shareTitle='Santiment'
        shareText={`Crypto Alert '${signalTitle}'`}
        shareLink={link}
        isDisabled={!isPublic && isUserTheAuthor}
      >
        <>
          <div
            className={cx(
              styles.messageWrapper,
              (isPublic || !isUserTheAuthor) && styles.messageWrapper__hide,
            )}
          >
            <Message variant='warn' className={styles.message}>
              Your alert is private. Please, switch it to “Public” first.
            </Message>
          </div>
          {isUserTheAuthor && (
            <UpdatePublicity variant='flat' signal={signal} className={styles.toggle} />
          )}
        </>
      </ShareModalTrigger>
    </div>
  )
}

const MoreSignalActions = ({
  signalId,
  signalTitle,
  isPublic,
  isUserTheAuthor,
  deleteEnabled = true,
  editable = true,
  signal,
  userId,
  shouldDisableActions,
}) => {
  const canShare = true

  if (!isUserTheAuthor) {
    return (
      <div className={styles.buttonWrapper}>
        {canShare && (
          <ShareSignal
            signal={signal}
            isPublic={isPublic}
            isAlert={true}
            isDialogOnly={true}
            className={styles.shareBtn}
            signalId={signalId}
            signalTitle={signalTitle}
            shareBtnClassName={cx(styles.popupItem, styles.publicShare, 'row v-center btn body-3')}
            trigger={PublicSignalShareTrigger}
            isUserTheAuthor={isUserTheAuthor}
            userId={userId}
          />
        )}
        {!shouldDisableActions && (
          <DesktopOnly>
            <CopySignal signal={signal} label='Copy to my alerts' />
          </DesktopOnly>
        )}
      </div>
    )
  }

  const { isFrozen } = signal

  return (
    <Tooltip
      trigger={
        <button
          className={cx(
            styles.expandButton,
            'btn mrg--r mrg-xl',
            isFrozen && styles.frozenExpandButton,
          )}
        >
          <Icon type='dots' />
        </button>
      }
      position='bottom'
      align='start'
    >
      <Panel className={styles.popup}>
        {editable && (
          <Link
            to={`/alerts/${signalId}${window.location.search}`}
            className={cx(styles.popupItem, 'row v-center btn-ghost body-3')}
          >
            <Icon type='edit' />
            Edit
          </Link>
        )}

        {canShare && (
          <ShareSignal
            signal={signal}
            isPublic={isPublic}
            isAlert={true}
            isDialogOnly={true}
            trigger={SignalShareTrigger}
            signalId={signalId}
            signalTitle={signalTitle}
            isUserTheAuthor={isUserTheAuthor}
            userId={userId}
          />
        )}

        {deleteEnabled && (
          <RemoveSignalButton
            id={signalId}
            signalTitle={signalTitle}
            trigger={() => (
              <button className={cx(styles.popupItem, 'row v-center btn-ghost body-3')}>
                <Icon type='remove' />
                Delete
              </button>
            )}
          />
        )}
      </Panel>
    </Tooltip>
  )
}

const PublicSignalShareTrigger = ({ ...props }) => (
  <button {...props}>
    <Icon type='share' />
    Share alert
  </button>
)

const SignalShareTrigger = ({ ...props }) => (
  <button {...props} className={cx(styles.popupItem, 'row v-center btn-ghost body-3')}>
    <Icon type='share' />
    Share
  </button>
)

export default MoreSignalActions

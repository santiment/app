import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import ShareModalTrigger from '../../Share/ShareModalTrigger'
import { mapStateToQS } from '../../../utils/utils'
import Tooltip from '@santiment-network/ui/Tooltip'
import RemoveSignalButton from './RemoveSignalButton'
import styles from '../card/SignalCard.module.scss'

const generateShareLink = (id, title) => {
  const { origin } = window.location
  return `${origin}/sonar/alert/${id}${mapStateToQS({
    title
  })}`
}

const ShareSignal = ({
  trigger,
  className,
  shareBtnClassName,
  signalId,
  signalTitle
}) => {
  const link = generateShareLink(signalId, signalTitle)
  return (
    <div className={cx(styles.popupItem, styles.popupButton, className)}>
      <ShareModalTrigger
        trigger={trigger}
        className={shareBtnClassName}
        shareTitle='Santiment'
        shareText={`Crypto Alert '${signalTitle}'`}
        shareLink={link}
      />
    </div>
  )
}

const MoreSignalActions = ({
  signalId,
  signalTitle,
  isPublic,
  isUserTheAuthor,
  deleteEnabled = true,
  editable = true
}) => {
  const canShare = true

  if (!isUserTheAuthor) {
    return (
      canShare && (
        <ShareSignal
          className={styles.shareBtn}
          signalId={signalId}
          signalTitle={signalTitle}
          shareBtnClassName={styles.shareSingle}
          trigger={ShareIcon}
        />
      )
    )
  }

  return (
    <Tooltip
      trigger={
        <Button className={styles.expandButton}>
          <Icon type='dots' />
        </Button>
      }
      position='bottom'
      align='start'
    >
      <Panel className={styles.popup}>
        {editable && (
          <div className={cx(styles.popupItem, styles.popupButton)}>
            <Link
              to={`/sonar/alert/${signalId}/edit${window.location.search}`}
              className={styles.link}
            >
              Edit
            </Link>
          </div>
        )}

        {canShare && isPublic && (
          <ShareSignal
            trigger={SignalShareTrigger}
            signalId={signalId}
            signalTitle={signalTitle}
          />
        )}

        {deleteEnabled && (
          <div className={cx(styles.popupItem, styles.popupButton)}>
            <RemoveSignalButton
              id={signalId}
              signalTitle={signalTitle}
              trigger={() => <div className={styles.removeSignal}>Delete</div>}
            />
          </div>
        )}
      </Panel>
    </Tooltip>
  )
}

const SignalShareTrigger = ({ ...props }) => (
  <Button as='a' {...props} className={styles.share}>
    Share
  </Button>
)

const ShareIcon = props => (
  <Icon {...props} className={styles.share} type='share' />
)

export default MoreSignalActions

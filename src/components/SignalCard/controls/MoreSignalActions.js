import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import Tooltip from '@santiment-network/ui/Tooltip'
import ShareModalTrigger from '../../Share/ShareModalTrigger'
import { DesktopOnly } from '../../Responsive'
import RemoveSignalButton from './RemoveSignalButton'
import CopySignal from './CopySignal'
import { mapStateToQS } from '../../../utils/utils'
import styles from '../card/SignalCard.module.scss'

const generateShareLink = (id, title) => {
  const { origin } = window.location
  return `${origin}/alert/${id}${mapStateToQS({
    title
  })}`
}

const ShareSignal = ({
  trigger,
  className,
  shareBtnClassName,
  signalId,
  signalTitle,
  isDialogOnly,
  isAlert
}) => {
  const link = generateShareLink(signalId, signalTitle)
  return (
    <div className={cx(styles.popupItem, styles.popupButton, className)}>
      <ShareModalTrigger
        isAlert={isAlert}
        isDialogOnly={isDialogOnly}
        trigger={trigger}
        className={shareBtnClassName}
        shareTitle='Santiment'
        shareText={`Crypto Alert '${signalTitle}'`}
        shareLink={link}
      />
    </div>
  )
}

const btnParams = { variant: 'flat' }
const classes = {
  copyBtn: styles.buttonWrapper__button
}

const MoreSignalActions = ({
  signalId,
  signalTitle,
  isPublic,
  isUserTheAuthor,
  deleteEnabled = true,
  editable = true,
  signal
}) => {
  const canShare = true

  if (!isUserTheAuthor) {
    return (
      <div className={styles.buttonWrapper}>
        {canShare && (
          <ShareSignal
            isAlert={true}
            isDialogOnly={true}
            className={styles.shareBtn}
            signalId={signalId}
            signalTitle={signalTitle}
            shareBtnClassName={styles.shareSingle}
            trigger={PublicSignalShareTrigger}
          />
        )}
        <DesktopOnly>
          <CopySignal
            signal={signal}
            label='Copy to my alerts'
            as='div'
            classes={classes}
            btnParams={btnParams}
          />
        </DesktopOnly>
      </div>
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
              to={`/alerts/${signalId}${window.location.search}`}
              className={styles.link}
            >
              Edit
            </Link>
          </div>
        )}

        {canShare && isPublic && (
          <ShareSignal
            isAlert={true}
            isDialogOnly={true}
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

const PublicSignalShareTrigger = ({ ...props }) => (
  <Button as='a' className={styles.share} {...props}>
    <Icon className={styles.shareIcon} type='share' />
    Share alert
  </Button>
)

const SignalShareTrigger = ({ ...props }) => (
  <Button as='a' {...props} className={styles.share}>
    Share
  </Button>
)

export default MoreSignalActions

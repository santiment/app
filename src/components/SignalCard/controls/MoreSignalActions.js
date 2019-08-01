import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import { RemoveSignalButton } from './SignalControls'
import ShareModalTrigger from '../../Share/ShareModalTrigger'
import styles from '../SignalCard.module.scss'

const generateShareLink = (id, title) => {
  const { origin, pathname } = window.location
  return `${origin}${pathname}?name=${title}@${id}#shared`
}

const MoreSignalActions = ({
  signalId,
  signalTitle,
  removeSignal,
  isPublic
}) => {
  const link = generateShareLink(signalId, signalTitle)

  return (
    <ContextMenu
      trigger={
        <Button className={styles.expandButton}>
          <Icon type='dots' />
        </Button>
      }
      position='bottom'
      align='start'
      classes={styles}
    >
      <Panel>
        <div className={styles.popup}>
          <div className={cx(styles.popupItem, styles.popupButton)}>
            <Link
              to={`/sonar/feed/details/${signalId}/edit`}
              className={styles.link}
            >
              Edit signal
            </Link>
          </div>

          {isPublic && (
            <div className={cx(styles.popupItem, styles.popupButton)}>
              <ShareModalTrigger
                trigger={SignalShareTrigger}
                shareTitle='Santiment'
                shareText={`Crypto Signal '${signalTitle}'`}
                shareLink={link}
              />
            </div>
          )}

          <div className={cx(styles.popupItem, styles.popupButton)}>
            <RemoveSignalButton
              id={signalId}
              signalTitle={signalTitle}
              removeSignal={removeSignal}
              trigger={<div className={styles.removeSignal}>Delete</div>}
            />
          </div>
        </div>
      </Panel>
    </ContextMenu>
  )
}

const SignalShareTrigger = ({ ...props }) => (
  <div {...props} className={styles.share}>
    Share
  </div>
)

export default MoreSignalActions

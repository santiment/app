import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import ShareSignalPopup from './ShareSignalPopup'
import { RemoveSignalButton } from './SignalControls'
import styles from '../SignalCard.module.scss'

const MoreSignalActions = ({
  signalId,
  signalTitle,
  removeSignal,
  isPublic
}) => {
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

          <div className={cx(styles.popupItem, styles.popupButton)}>
            <Link
              to={`/sonar/feed/details/${signalId}/about`}
              className={styles.link}
            >
              Edit name & description
            </Link>
          </div>

          {isPublic && (
            <div className={cx(styles.popupItem, styles.popupButton)}>
              <ShareSignalPopup id={signalId} title={signalTitle} />
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

export default MoreSignalActions

import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import { RemoveSignalButton } from './SignalControls'
import ShareModalTrigger from '../../Share/ShareModalTrigger'
import { mapStateToQS } from '../../../utils/utils'
import SmoothDropdownItem from '../../SmoothDropdown/SmoothDropdownItem'
import SmoothDropdown from '../../SmoothDropdown/SmoothDropdown'
import styles from '../SignalCard.module.scss'

const generateShareLink = (id, title) => {
  const { origin } = window.location
  return `${origin}/sonar/signal/${id}${mapStateToQS({
    title
  })}`
}

const MoreSignalActions = ({
  signalId,
  signalTitle,
  removeSignal,
  isPublic,
  isUserTheAuthor,
  deleteEnabled = true
}) => {
  const link = generateShareLink(signalId, signalTitle)

  const ShareSignal = ({ trigger, className }) => (
    <div className={cx(styles.popupItem, styles.popupButton, className)}>
      <ShareModalTrigger
        trigger={trigger}
        shareTitle='Santiment'
        shareText={`Crypto Signal '${signalTitle}'`}
        shareLink={link}
      />
    </div>
  )

  if (!isUserTheAuthor) {
    return <ShareSignal className={styles.shareBtn} />
  }

  return (
    <SmoothDropdown>
      <SmoothDropdownItem
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
            {isUserTheAuthor && (
              <div className={cx(styles.popupItem, styles.popupButton)}>
                <Link
                  to={`/sonar/signal/${signalId}/edit${window.location.search}`}
                  className={styles.link}
                >
                  Edit signal
                </Link>
              </div>
            )}

            {isPublic && <ShareSignal trigger={SignalShareTrigger} />}

            {isUserTheAuthor && deleteEnabled && (
              <div className={cx(styles.popupItem, styles.popupButton)}>
                <RemoveSignalButton
                  id={signalId}
                  signalTitle={signalTitle}
                  removeSignal={removeSignal}
                  trigger={<div className={styles.removeSignal}>Delete</div>}
                />
              </div>
            )}
          </div>
        </Panel>
      </SmoothDropdownItem>
    </SmoothDropdown>
  )
}

const SignalShareTrigger = ({ ...props }) => (
  <Button as='a' {...props} className={styles.share}>
    Share
  </Button>
)

export default MoreSignalActions

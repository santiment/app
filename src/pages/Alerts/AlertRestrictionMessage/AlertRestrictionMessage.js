import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { DesktopOnly } from '../../../components/Responsive'
import styles from '../../../ducks/Alert/components/AlertRestrictionMessage/AlertRestrictionMessage.module.scss'

const AlertRestrictionMessage = ({
  shouldHideRestrictionMessage,
  isRestrictedMessageClosed,
  setIsRestrictedMessageClosed,
}) => {
  if (shouldHideRestrictionMessage || isRestrictedMessageClosed) {
    return null
  }

  return (
    <div className={cx(styles.wrapper, styles.wrapperPage, 'mrg-xl mrg--b row v-center justify')}>
      <div className={cx(styles.info, 'row v-center')}>
        <Icon type='alert' className={styles.icon} />
        <div className={cx(styles.description, 'body-3')}>
          You have reached the maximum amount of alerts available to you. To unlock more alerts
          please{' '}
          <Link to='/pricing' className={cx(styles.link, 'txt-m')}>
            Update your Plan!
          </Link>
        </div>
      </div>
      <DesktopOnly>
        <Icon
          type='close-medium'
          className='btn c-waterloo'
          onClick={() => setIsRestrictedMessageClosed(true)}
        />
      </DesktopOnly>
    </div>
  )
}

export default AlertRestrictionMessage

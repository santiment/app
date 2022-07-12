import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './AlertRestrictionMessage.module.scss'

const AlertRestrictionMessage = ({
  shouldHideRestrictionMessage,
  isRestrictedMessageClosed,
  setIsRestrictedMessageClosed,
}) => {
  if (shouldHideRestrictionMessage || isRestrictedMessageClosed) {
    return null
  }

  return (
    <div className={cx(styles.wrapper, 'row justify v-center')}>
      <div className='row v-center'>
        <Icon type='alert' className={styles.icon} />
        <div className='body-3'>
          <span className='txt-m'>Duration restriction!</span> Your Alert will be valid for 30 days.
          To extend Alert please{' '}
          <Link to='/pricing' className={cx(styles.link, 'txt-m')}>
            Upgrade your Plan.
          </Link>
        </div>
      </div>
      <Icon
        type='close-medium'
        className='btn c-waterloo'
        onClick={() => setIsRestrictedMessageClosed(true)}
      />
    </div>
  )
}

export default AlertRestrictionMessage

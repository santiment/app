import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './AlertRestrictionMessage.module.scss'

const AlertRestrictionMessage = ({ shouldHideRestrictionMessage }) => {
  if (shouldHideRestrictionMessage) {
    return null
  }

  return (
    <div className={cx(styles.wrapper, 'row v-center')}>
      <Icon type='alert' className={styles.icon} />
      <div className='body-2'>
        <span className='txt-m'>Duration restriction!</span> Your Alert will be valid for 30 days.
        To extend Alert please{' '}
        <Link to='/pricing' className={cx(styles.link, 'txt-m')}>
          Update your Plan.
        </Link>
      </div>
    </div>
  )
}

export default AlertRestrictionMessage

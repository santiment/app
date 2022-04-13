import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './AlertRestrictionMessage.module.scss'

const Trigger = ({ forwardedRef, isActive, ...props }) => (
  <div
    ref={forwardedRef}
    {...props}
    className={cx('btn row hv-center', styles.btn, isActive && styles.btnHover)}
  >
    <Icon type='alert' />
  </div>
)

const AlertRestrictionMessageTooltip = ({
  shouldHideRestrictionMessage,
  isRestrictedMessageClosed,
}) => {
  if (shouldHideRestrictionMessage || !isRestrictedMessageClosed) {
    return null
  }

  return (
    <Tooltip
      passOpenStateAs='isActive'
      trigger={<Trigger />}
      position='bottom'
      className={cx(styles.tooltip, 'border box')}
    >
      <div className='relative row body-3'>
        <span>
          <span className='txt-m'>Alert with Duration Restriction.</span> Your Alert will be valid
          for 30 days from the day it’s created. To extend Alert please{' '}
          <Link to='/pricing' className={cx(styles.link, styles.tooltipLink, 'txt-m')}>
            Update your Plan!
          </Link>
        </span>
      </div>
    </Tooltip>
  )
}

export default AlertRestrictionMessageTooltip

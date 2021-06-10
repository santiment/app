import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { useNotificationToggle } from './hooks'
import DarkTooltip from '../Tooltip/DarkTooltip'
import styles from './NotificationBellBtn.module.scss'

const NotificationBellBtn = ({ targetUserId, className }) => {
  const { isNotificationDisabled, toggle, disabledBtn } = useNotificationToggle(
    targetUserId
  )

  return (
    <DarkTooltip
      position='top'
      align='start'
      on='hover'
      className={styles.tooltip}
      trigger={
        <Icon
          type='bell'
          onClick={() =>
            !disabledBtn && toggle(targetUserId, !isNotificationDisabled)
          }
          className={cx(
            styles.icon,
            className,
            !isNotificationDisabled && !disabledBtn && styles.icon__active
          )}
        />
      }
    >
      {isNotificationDisabled
        ? 'Disable notifications'
        : 'Enable notifications'}
    </DarkTooltip>
  )
}

export default NotificationBellBtn

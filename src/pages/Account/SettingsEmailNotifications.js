import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import AlertTooltip from '../../components/AlertTooltip/AlertTooltip'
import { useUser } from '../../stores/user'
import { useUpdateUserNotifications, useUserSettings } from '../../stores/user/settings'
import styles from './AccountPage.module.scss'

const SettingsEmailNotifications = ({ classes = {}, description, count }) => {
  const { user } = useUser()
  const {
    settings: { alertNotifyEmail },
  } = useUserSettings()

  const [update] = useUpdateUserNotifications()

  return (
    <div className={cx(classes.container, styles.settingBlock)}>
      <Label className={cx(classes.left, 'row v-center', styles.label)}>
        <span className='mrg--r mrg-xs'>Email notifications</span>
        {count > 0 && (
          <AlertTooltip
            isVisible={!alertNotifyEmail}
            content={
              <span>
                <span className='txt-m'>Email notifications are disabled!</span>{' '}
                <span className={styles.contentText}>
                  This means you will not receive Email notifications when this alert is triggered.
                </span>
              </span>
            }
            tooltipClassname={styles.tooltipWidth}
          />
        )}
      </Label>
      <div className={cx(styles.setting__right, classes.right)}>
        {description}
        {user && user.email ? (
          <Toggle
            isActive={alertNotifyEmail}
            onClick={() => update({ alertNotifyEmail: !alertNotifyEmail })}
          />
        ) : (
          'Please add email to enable alert notifications'
        )}
      </div>
    </div>
  )
}

export default SettingsEmailNotifications

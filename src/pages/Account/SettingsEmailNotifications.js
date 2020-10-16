import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import { useUser } from '../../stores/user'
import {
  useUpdateUserSettings,
  useUserSettings
} from '../../stores/user/settings'
import styles from './AccountPage.module.scss'

const SettingsEmailNotifications = ({ classes = {}, description }) => {
  const { user } = useUser()
  const {
    settings: { signalNotifyEmail }
  } = useUserSettings()

  const [updateUserSettings] = useUpdateUserSettings()

  return (
    <div className={cx(classes.container, styles.settingBlock)}>
      <Label className={classes.left}>Email notifications</Label>
      <div className={cx(styles.setting__right, classes.right)}>
        {description}
        {user && user.email ? (
          <Toggle
            isActive={signalNotifyEmail}
            onClick={() =>
              updateUserSettings({ signalNotifyEmail: !signalNotifyEmail })
            }
          />
        ) : (
          'Please add email to enable notifications'
        )}
      </div>
    </div>
  )
}

export default SettingsEmailNotifications

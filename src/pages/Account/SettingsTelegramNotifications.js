import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import {
  useUpdateUserSettings,
  useUserSettings
} from '../../stores/user/settings'
import styles from './AccountPage.module.scss'

const SettingsTelegramNotifications = ({ classes = {}, description }) => {
  const {
    settings: { signalNotifyTelegram, hasTelegramConnected }
  } = useUserSettings()

  const [updateUserSettings] = useUpdateUserSettings()

  return (
    <div className={cx(classes.container, styles.settingBlock)}>
      <Label className={classes.left}>Telegram notifications</Label>

      <div className={cx(styles.setting__right, classes.right)}>
        {description}
        {hasTelegramConnected ? (
          <Toggle
            isActive={signalNotifyTelegram}
            onClick={() =>
              updateUserSettings({
                signalNotifyTelegram: !signalNotifyTelegram
              })
            }
          />
        ) : (
          'Please connect to telegram bot to enable notifications'
        )}
      </div>
    </div>
  )
}

export default SettingsTelegramNotifications

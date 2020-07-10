import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import EmailSetting from '../../../../../../pages/Account/EmailSetting'
import ConnectTelegramBlock from '../../../../../../pages/Account/ConnectTelegramBlock'
import SettingsTelegramNotifications from '../../../../../../pages/Account/SettingsTelegramNotifications'
import SettingsEmailNotifications from '../../../../../../pages/Account/SettingsEmailNotifications'
import SettingsSonarWebPushNotifications from '../../../../../../pages/Account/SettingsSonarWebPushNotifications'
import ShowIf from '../../../../../../components/ShowIf/ShowIf'
import {
  DEFAULT_SETTINGS,
  useUserSettings
} from '../../../../../../contexts/user/settings'
import styles from './TriggerChannelSettings.module.scss'

const DefaultTrigger = <div className={styles.connect}>Enable in settings</div>

const TriggerChannelSettings = ({
  recheckBrowserNotifications,
  trigger = DefaultTrigger,
  showTrigger = true
}) => {
  const { settings } = useUserSettings()
  const [open, setOpen] = useState(false)

  const { signalNotifyEmail, signalNotifyTelegram, hasTelegramConnected } =
    settings || DEFAULT_SETTINGS

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={showTrigger && trigger}
        title='Notification settings'
      >
        <Dialog.ScrollContent>
          <EmailSetting classes={styles} hideIfEmail />
          <SettingsEmailNotifications
            classes={styles}
            isEmailNotificationEnabled={signalNotifyEmail}
          />

          <ConnectTelegramBlock classes={styles} />
          <SettingsTelegramNotifications
            classes={styles}
            signalNotifyTelegram={signalNotifyTelegram}
            hasTelegramConnected={hasTelegramConnected}
          />

          <ShowIf beta>
            <SettingsSonarWebPushNotifications
              classes={styles}
              className={styles.notifications}
              recheckBrowserNotifications={recheckBrowserNotifications}
            />
          </ShowIf>
        </Dialog.ScrollContent>
      </Dialog>
    </>
  )
}

export default TriggerChannelSettings

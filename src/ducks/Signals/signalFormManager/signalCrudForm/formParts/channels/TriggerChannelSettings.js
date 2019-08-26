import React, { useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import EmailSetting from '../../../../../../pages/Account/EmailSetting'
import ConnectTelegramBlock from '../../../../../../pages/Account/ConnectTelegramBlock'
import SettingsTelegramNotifications from '../../../../../../pages/Account/SettingsTelegramNotifications'
import SettingsEmailNotifications from '../../../../../../pages/Account/SettingsEmailNotifications'
import SettingsSonarWebPushNotifications from '../../../../../../pages/Account/SettingsSonarWebPushNotifications'
import ShowIf from '../../../../../../components/ShowIf/ShowIf'
import styles from './TriggerChannelSettings.module.scss'

const TriggerChannelSettings = ({ recheckBrowserNotifications, trigger }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={
          trigger || <span className={styles.connect}>Open settings</span>
        }
        title='Notification settings'
      >
        <Dialog.ScrollContent>
          <EmailSetting classes={styles} hideIfEmail />
          <SettingsEmailNotifications classes={styles} />

          <ConnectTelegramBlock classes={styles} />
          <SettingsTelegramNotifications classes={styles} />

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

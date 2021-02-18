import React from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import EmailSetting from '../../../../../../pages/Account/EmailSetting'
import ConnectTelegramBlock from '../../../../../../pages/Account/ConnectTelegramBlock'
import SettingsTelegramNotifications from '../../../../../../pages/Account/SettingsTelegramNotifications'
import SettingsEmailNotifications from '../../../../../../pages/Account/SettingsEmailNotifications'
import SettingsSonarWebPushNotifications from '../../../../../../pages/Account/SettingsSonarWebPushNotifications'
import ShowIf from '../../../../../../components/ShowIf/ShowIf'
import { useDialogState } from '../../../../../../hooks/dialog'
import styles from './TriggerChannelSettings.module.scss'

const DefaultTrigger = <div className={styles.connect}>Enable in settings</div>

const TriggerChannelSettings = ({
  recheckBrowserNotifications,
  trigger = DefaultTrigger,
  showTrigger = true,
  showWebPush = true,
  showTelegram = true
}) => {
  const { closeDialog, openDialog, isOpened } = useDialogState()

  if (!showTrigger) {
    return null
  }

  return (
    <>
      <Dialog
        open={isOpened}
        onClose={closeDialog}
        onOpen={openDialog}
        trigger={showTrigger && trigger}
        title='Notification settings'
        classes={styles}
      >
        <Dialog.ScrollContent>
          <EmailSetting classes={styles} hideIfEmail />
          <SettingsEmailNotifications classes={styles} />

          {showTelegram && (
            <>
              <ConnectTelegramBlock classes={styles} />
              <SettingsTelegramNotifications classes={styles} />
            </>
          )}

          {showWebPush && (
            <>
              <ShowIf beta>
                <SettingsSonarWebPushNotifications
                  classes={styles}
                  className={styles.notifications}
                  recheckBrowserNotifications={recheckBrowserNotifications}
                />
              </ShowIf>
            </>
          )}
        </Dialog.ScrollContent>
      </Dialog>
    </>
  )
}

export default TriggerChannelSettings

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import EmailSetting from '../../../../../../pages/Account/EmailSetting'
import ConnectTelegramBlock from '../../../../../../pages/Account/ConnectTelegramBlock'
import SettingsTelegramNotifications from '../../../../../../pages/Account/SettingsTelegramNotifications'
import SettingsEmailNotifications from '../../../../../../pages/Account/SettingsEmailNotifications'
import SettingsSonarWebPushNotifications, {
  getSanSonarSW
} from '../../../../../../pages/Account/SettingsSonarWebPushNotifications'
import ShowIf from '../../../../../../components/ShowIf/ShowIf'
import styles from './TriggerChannelSettings.module.scss'

const TriggerChannelSettings = ({
  isTelegramSettings,
  isEmailSettings,
  isBeta
}) => {
  const [open, setOpen] = useState(false)
  const [isWebPushEnabled, setWebPushEnabled] = useState(true)

  useEffect(
    () => {
      !isTelegramSettings && !isEmailSettings && setOpen(false)

      if (isBeta) {
        navigator.serviceWorker &&
          navigator.serviceWorker.getRegistrations &&
          navigator.serviceWorker.getRegistrations().then(registrations => {
            const sw = getSanSonarSW(registrations)
            setWebPushEnabled(!!sw)
          })
      }
    },
    [isEmailSettings, isTelegramSettings]
  )

  const showTrigger = isTelegramSettings || isEmailSettings || !isWebPushEnabled

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={
          showTrigger && <span className={styles.connect}>Open settings</span>
        }
        title='Notification settings'
      >
        <Dialog.ScrollContent>
          {isEmailSettings && (
            <>
              <EmailSetting classes={styles} hideIfEmail />
              <SettingsEmailNotifications classes={styles} />
            </>
          )}

          {isTelegramSettings && (
            <>
              <ConnectTelegramBlock classes={styles} />
              <SettingsTelegramNotifications classes={styles} />
            </>
          )}

          {!isWebPushEnabled && (
            <ShowIf beta>
              <SettingsSonarWebPushNotifications classes={styles} />
            </ShowIf>
          )}
        </Dialog.ScrollContent>
      </Dialog>
    </>
  )
}

const mapStateToProps = ({
  user: {
    data: { email = '' }
  },
  rootUi: { isBetaModeEnabled }
}) => ({
  email,
  isBeta: isBetaModeEnabled
})

const enhance = connect(mapStateToProps)

export default enhance(TriggerChannelSettings)

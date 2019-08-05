import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import EmailSetting from '../../../../../../pages/Account/EmailSetting'
import ConnectTelegramBlock from '../../../../../../pages/Account/ConnectTelegramBlock'
import SettingsTelegramNotifications from '../../../../../../pages/Account/SettingsTelegramNotifications'
import SettingsEmailNotifications from '../../../../../../pages/Account/SettingsEmailNotifications'
import styles from './TriggerChannelSettings.module.scss'

const TriggerChannelSettings = ({ isTelegramSettings, isEmailSettings }) => {
  const [open, setOpen] = useState(false)

  useEffect(
    () => {
      !isTelegramSettings && !isEmailSettings && setOpen(false)
    },
    [isEmailSettings, isTelegramSettings]
  )

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={
          (isTelegramSettings || isEmailSettings) && (
            <span className={styles.connect}>Open settings</span>
          )
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
        </Dialog.ScrollContent>
      </Dialog>
    </>
  )
}

const mapStateToProps = ({
  user: {
    data: { email = '' }
  }
}) => ({
  email
})

const enhance = connect(mapStateToProps)

export default enhance(TriggerChannelSettings)

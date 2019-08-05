import React from 'react'
import { connect } from 'react-redux'
import Dialog from '@santiment-network/ui/Dialog'
import EmailSetting from '../../../../../../pages/Account/EmailSetting'
import ConnectTelegramBlock from '../../../../../../pages/Account/ConnectTelegramBlock'
import SettingsTelegramNotifications from '../../../../../../pages/Account/SettingsTelegramNotifications'
import SettingsEmailNotifications from '../../../../../../pages/Account/SettingsEmailNotifications'
import styles from './TriggerChannelSettings.module.scss'

const TriggerChannelSettings = ({ isTelegramSettings, isEmailSettings }) => {
  if (!isTelegramSettings && !isEmailSettings) {
    return ''
  }

  return (
    <>
      <Dialog
        trigger={<span className={styles.connect}>Open settings</span>}
        title='Notification settings'
      >
        <Dialog.ScrollContent>
          {isTelegramSettings && (
            <>
              <EmailSetting hideIfEmail />
              <SettingsEmailNotifications classes={styles} />
            </>
          )}

          {isEmailSettings && (
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
  email: email
})

const enhance = connect(
  mapStateToProps,
  null
)

export default enhance(TriggerChannelSettings)

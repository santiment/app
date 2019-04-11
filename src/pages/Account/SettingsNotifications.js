import React from 'react'
import { Tabs, Toggle, Label, Button, Selector } from '@santiment-network/ui'
import Settings from './Settings'
import styles from './AccountPage.module.scss'

const SettingsNotificationss = () => (
  <Settings id='notifications' header='Notifications'>
    <Settings.Row>
      <Label>Email notifications</Label>
      <div className={styles.setting__right_notifications}>
        <Label className={styles.signalInfo} accent='jungle-green'>
          Manage followed signals (15/25)
        </Label>
        <Toggle />
      </div>
    </Settings.Row>

    <Settings.Row>
      <Label>Telegram notifications</Label>

      <div className={styles.setting__right_notifications}>
        <Label className={styles.signalInfo} accent='jungle-green'>
          Manage followed signals (25/25)
        </Label>
        <Toggle />
      </div>
    </Settings.Row>

    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Digest</Label>
        <Label className={styles.setting__description} accent='waterloo'>
          Receive the best insights and signals on Sanbase
          <br />
          peersonalized based on your interests.
        </Label>
      </div>
      <Selector
        options={['Daily', 'Weekly', 'Off']}
        // onSelectOption={Selected}
        defaultSelected='Off'
      />
    </Settings.Row>
  </Settings>
)

export default SettingsNotificationss

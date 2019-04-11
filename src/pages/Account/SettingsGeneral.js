import React from 'react'
import { Tabs, Toggle, Label, Button, Selector } from '@santiment-network/ui'
import Settings from './Settings'
import styles from './AccountPage.module.scss'

const SettingsGeneral = () => (
  <Settings id='general' header='General'>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Nickname</Label>
      </div>
      <Label accent='jungle-green'>Add your nickname</Label>
    </Settings.Row>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Email</Label>
      </div>
      <Label accent='jungle-green'>Add your email</Label>
    </Settings.Row>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Night mode</Label>
      </div>
      <Toggle />
    </Settings.Row>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Beta mode</Label>
      </div>
      <Toggle />
    </Settings.Row>
  </Settings>
)

export default SettingsGeneral

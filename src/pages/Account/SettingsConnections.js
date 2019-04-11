import React from 'react'
import { Tabs, Toggle, Label, Button, Selector } from '@santiment-network/ui'
import Settings from './Settings'
import styles from './AccountPage.module.scss'

const SettingsConnections = () => (
  <Settings id='connections' header='Connections'>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Metamask</Label>
        <Label className={styles.setting__description} accent='waterloo'>
          You will get the ability to deposit tokens to your Sanbase account.
          <br />
          Please follow futher instructions.
        </Label>
      </div>
      <Button variant='fill' accent='positive'>
        Connect
      </Button>
    </Settings.Row>

    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Telegram</Label>
        <Label className={styles.setting__description} accent='waterloo'>
          You will get the ability to connect the bot and log in through
          Telegram.
          <br />
          Please do not use Telegram Web as it might not be able to link account
          correctly.
        </Label>
      </div>
      <Button variant='fill' accent='positive'>
        Connect
      </Button>
    </Settings.Row>

    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Email</Label>
        <Label className={styles.setting__description} accent='waterloo'>
          You will get the ability to receive notifications and log in through
          your email.
          <br />
          Don't forget to confirm your email address. Follow futher
          instructions.
        </Label>
      </div>
      <Button variant='fill' accent='positive'>
        Connect
      </Button>
    </Settings.Row>
  </Settings>
)

export default SettingsConnections

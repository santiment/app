import React from 'react'
import { Tabs, Toggle, Label, Button, Selector } from '@santiment-network/ui'
import Settings from './Settings'
import styles from './AccountPage.module.scss'

const SettingsAPIKeys = () => (
  <Settings id='api-keys' header='API keys'>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>API Keys</Label>
        <Label className={styles.setting__description} accent='waterloo'>
          The api key will give you access to the data that requires SAN token
          staking.
          <br />
          The api key can only be used to fetch data and not to execute graphql
          mutations.
        </Label>
      </div>
      <Button variant='fill' accent='positive'>
        Generate
      </Button>
    </Settings.Row>
  </Settings>
)

export default SettingsAPIKeys

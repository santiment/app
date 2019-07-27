import React from 'react'
import Settings from './Settings'
import Plans from '../../components/Plans/Plans'
import styles from './SettingsPlans.module.scss'

const SettingsPlans = ({ apikey, generateAPIKey, revokeAPIKey }) => (
  <Settings id='plans' header='Plans'>
    <Settings.Row className={styles.wrapper}>
      <Plans />
    </Settings.Row>
  </Settings>
)

export default SettingsPlans

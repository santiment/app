import React from 'react'
import Settings from './Settings'
import Plans from '../../components/Plans/Plans'

const SettingsPlans = ({ apikey, generateAPIKey, revokeAPIKey }) => (
  <Settings id='api-keys' header='API keys'>
    <Settings.Row>
      <Plans />
    </Settings.Row>
  </Settings>
)

export default SettingsPlans

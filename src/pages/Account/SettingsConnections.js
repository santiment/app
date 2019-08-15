import React from 'react'
import Settings from './Settings'
import ConnectTelegramBlock from './ConnectTelegramBlock'
import ConnectMetamaskBlock from './ConnectMetamaskBlock'

const SettingsConnections = () => (
  <Settings id='connections' header='Connections'>
    <Settings.Row>
      <ConnectMetamaskBlock />
    </Settings.Row>

    <Settings.Row>
      <ConnectTelegramBlock />
    </Settings.Row>
  </Settings>
)

export default SettingsConnections

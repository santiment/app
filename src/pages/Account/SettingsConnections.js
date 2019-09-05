import React from 'react'
import Settings from './Settings'
import ConnectTelegramBlock from './ConnectTelegramBlock'
import ConnectMetamaskBlock from './ConnectMetamaskBlock'
import EmailSetting from './EmailSetting'

const SettingsConnections = () => (
  <Settings id='connections' header='Connections'>
    <Settings.Row>
      <ConnectMetamaskBlock />
    </Settings.Row>

    <Settings.Row>
      <ConnectTelegramBlock />
    </Settings.Row>

    <EmailSetting />
  </Settings>
)

export default SettingsConnections

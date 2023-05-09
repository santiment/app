import React from 'react';
import Settings from './Settings';
import ConnectTelegramBlock from './ConnectTelegramBlock';
import ConnectMetamaskBlock from './ConnectMetamaskBlock';
import EmailSetting from './EmailSetting';

const SettingsConnections = () => /*#__PURE__*/React.createElement(Settings, {
  id: "connections",
  header: "Connections"
}, /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement(ConnectMetamaskBlock, null)), /*#__PURE__*/React.createElement(Settings.Row, null, /*#__PURE__*/React.createElement(ConnectTelegramBlock, null)), /*#__PURE__*/React.createElement(EmailSetting, null));

export default SettingsConnections;
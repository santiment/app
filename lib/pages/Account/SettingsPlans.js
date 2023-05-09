import React from 'react';
import Settings from './Settings';
import Plans from '../../components/Plans/Plans';
import styles from './SettingsPlans.module.css';

const SettingsPlans = ({
  apikey,
  generateAPIKey,
  revokeAPIKey
}) => /*#__PURE__*/React.createElement(Settings, {
  id: "plans",
  header: "Plans"
}, /*#__PURE__*/React.createElement(Settings.Row, {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement(Plans, null)));

export default SettingsPlans;
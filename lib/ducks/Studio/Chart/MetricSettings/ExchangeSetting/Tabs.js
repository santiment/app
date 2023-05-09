import React from 'react';
import UITabs from '@santiment-network/ui/Tabs';
import styles from './Tabs.module.css';
export const Tab = {
  CEX: 'CEX',
  DEX: 'DEX'
};
const TABS = Object.values(Tab);

const Tabs = ({
  activeTab,
  setActiveTab
}) => /*#__PURE__*/React.createElement(UITabs, {
  options: TABS,
  className: styles.tabs,
  classes: styles,
  defaultSelectedIndex: activeTab,
  onSelect: tab => setActiveTab(tab)
});

export default Tabs;
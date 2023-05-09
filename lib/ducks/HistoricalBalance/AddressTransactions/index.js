import React, { useState } from 'react';
import Section from '../Section';
import { TabType } from '../defaults';
import Tab from '../../../components/Tab';
import TopTransactions from './TopTransactions';
import RecentTransactions from './RecentTransactions';
import styles from './index.module.css';

const Tabs = ({
  tabState
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tab, {
  tab: TabType.LATEST_TRANSACTIONS,
  tabState: tabState
}), /*#__PURE__*/React.createElement(Tab, {
  tab: TabType.TOP_TRANSACTIONS,
  tabState: tabState
}));

const AddressTransactions = ({
  settings,
  walletAssets
}) => {
  const tabState = useState(TabType.LATEST_TRANSACTIONS);
  const activeTab = tabState[0];
  return /*#__PURE__*/React.createElement(Section, {
    title: /*#__PURE__*/React.createElement(Tabs, {
      tabState: tabState
    }),
    className: styles.container
  }, activeTab === TabType.LATEST_TRANSACTIONS && /*#__PURE__*/React.createElement(RecentTransactions, {
    settings: settings
  }), activeTab === TabType.TOP_TRANSACTIONS && /*#__PURE__*/React.createElement(TopTransactions, {
    settings: settings,
    walletAssets: walletAssets
  }));
};

export default AddressTransactions;
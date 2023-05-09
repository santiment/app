import React from 'react';
import cx from 'classnames';
import EthStakingRoi from '../../../../ducks/Eth2.0/EthStakingRoi/EthStakingRoi';
import EthTotalStaked from '../../../../ducks/Eth2.0/TotalStaked/EthTotalStaked';
import EthStakedAmountByLabel from '../../../../ducks/Eth2.0/EthStakedAmountByLabel/EthStakedAmountByLabel';
import EthStakedAddressesByLabel from '../../../../ducks/Eth2.0/EthStakedAddressesByLabel/EthStakedAddressesByLabel';
import EthUnlabeledStackerInflow from '../../../../ducks/Eth2.0/EthUnlabeledStackerInflow/EthUnlabeledStackerInflow';
import EthTopStakers from '../../../../ducks/Eth2.0/EthTopStakers/EthTopStakers';
import Info from '../shared/Info/Info';
import Section from '../shared/Section/Section';
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport';
import dashboardsStyles from '../dashboards.module.css';

const Eth2 = () => /*#__PURE__*/React.createElement("section", {
  className: cx(dashboardsStyles.wrapper, 'column')
}, /*#__PURE__*/React.createElement(Info, {
  title: "Ethereum 2.0 Staking Analytics",
  description: ""
}), /*#__PURE__*/React.createElement("main", {
  className: cx(dashboardsStyles.content, 'column')
}, /*#__PURE__*/React.createElement(Section, {
  id: "eth_2_roi",
  title: "Staking Roi"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EthStakingRoi, null))), /*#__PURE__*/React.createElement(Section, {
  id: "eth_2_total_staked",
  title: "Total Staked"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EthTotalStaked, null))), /*#__PURE__*/React.createElement(Section, {
  id: "eth_2_staked_amount_label",
  title: "Staked amount by Label"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EthStakedAmountByLabel, null))), /*#__PURE__*/React.createElement(Section, {
  id: "eth_2_staked_addresses_label",
  title: "Number of Staked Addresses by Label"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EthStakedAddressesByLabel, null))), /*#__PURE__*/React.createElement(Section, {
  id: "eth_2_staker_inflow",
  title: "Unlabeled Staker Inflow Sources"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EthUnlabeledStackerInflow, null))), /*#__PURE__*/React.createElement(Section, {
  id: "eth_2_top_stakers",
  title: "Top Stakers"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EthTopStakers, null)))));

export default withRenderQueueProvider(Eth2);
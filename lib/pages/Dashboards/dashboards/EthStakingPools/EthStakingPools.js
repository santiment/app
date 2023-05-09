import React from 'react';
import cx from 'classnames';
import EthStakingPools from '../../../../ducks/Eth2.0/EthStakingPools/EthStakingPools';
import Info from '../shared/Info/Info';
import Section from '../shared/Section/Section';
import DistributionBtcOnEth from './DistributionBtcOnEth/DistributionBtcOnEth';
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport';
import dashboardsStyles from '../dashboards.module.css';

const EthStakingPoolsPage = () => /*#__PURE__*/React.createElement("section", {
  className: cx(dashboardsStyles.wrapper, 'column')
}, /*#__PURE__*/React.createElement(Info, {
  title: "Ethereum Staking Pools",
  description: "Information all about staking metrics and statistics for the new Ethereum 2.0."
}), /*#__PURE__*/React.createElement("main", {
  className: cx(dashboardsStyles.content, 'column')
}, /*#__PURE__*/React.createElement(Section, {
  id: "eth_validators",
  title: "Number of Validators"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EthStakingPools, null))), /*#__PURE__*/React.createElement(Section, {
  id: "eth_staked_usd",
  title: "Total Staked in USD"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EthStakingPools, {
  metric: "eth2_staking_pools_usd"
}))), /*#__PURE__*/React.createElement(Section, {
  id: "eth_staking_pool_distributions",
  title: "Staking Pool Distributions"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DistributionBtcOnEth, {
  metric: "eth2_staking_pools_validators_count_over_time"
}))), /*#__PURE__*/React.createElement(Section, {
  id: "eth_staking_pool_distributions_delta",
  title: "Staking Pool Distributions Delta"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DistributionBtcOnEth, {
  metric: "eth2_staking_pools_validators_count_over_time_delta"
})))));

export default withRenderQueueProvider(EthStakingPoolsPage);
import React from 'react';
import cx from 'classnames';
import Info from '../shared/Info/Info';
import Section from '../shared/Section/Section';
import StablecoinsMarketCap from '../../../../ducks/Stablecoins/StablecoinsMarketCap/StablecoinsMarketCap';
import WhaleTrendsList from '../../../../ducks/Stablecoins/WhaleTrendsList/WhaleTrendsList';
import FlowToExchangesList from '../../../../ducks/Stablecoins/FlowToExchanges/FlowToExchangesList';
import TopExchangesTable from '../../../../components/Tables/TopExchanges';
import NetExchangeFlow from '../../../../ducks/Stablecoins/NetExchangeFlow/NetExchangeFlow';
import StablecoinsTransactions from '../../../../ducks/Stablecoins/StablecoinsTransactions/StablecoinsTransactions';
import StablecoinHolderDistribution from '../../../../ducks/Stablecoins/HolderDistribution/StablecoinHolderDistribution';
import TransactionsDominance from '../../../../ducks/Stablecoins/TransactionsDominance/TransactionsDominance';
import NetworkActivity from '../../../../ducks/Stablecoins/NetworkActivity/NetworkActivity';
import CurrentPageReport from '../../../../ducks/Stablecoins/StablecoinsReport/CurrentPageReport';
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall';
import { BlockWithRanges } from '../../../StablecoinsPage/StablecoinsPageStructure';
import { withRenderQueueProvider } from '../../../../ducks/renderQueue/viewport';
import { getTimerangePeriod } from '../../../../utils/dates';
import { isStage } from '../../../../utils/utils';
import dashboardsStyles from '../dashboards.module.css';

const Stablecoins = () => /*#__PURE__*/React.createElement("section", {
  className: cx(dashboardsStyles.wrapper, 'column')
}, /*#__PURE__*/React.createElement(Info, {
  title: "Stablecoins",
  description: "Real-time information on the biggest stablecoins\u2019 market size, whale behavior, speculative demand and more."
}), /*#__PURE__*/React.createElement("main", {
  className: cx(dashboardsStyles.content, 'column')
}, /*#__PURE__*/React.createElement(CurrentPageReport, null), /*#__PURE__*/React.createElement(Section, {
  id: "stablecoins_overview",
  title: "Stablecoins Overview"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StablecoinsMarketCap, null))), /*#__PURE__*/React.createElement(Section, {
  id: "stablecoins_whale_trends",
  title: "Whale Trends",
  description: "Recent activity of each stablecoins\u2019 top 100 non-exchange addresses"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckProPaywall, null, /*#__PURE__*/React.createElement(WhaleTrendsList, null)))), /*#__PURE__*/React.createElement(Section, {
  id: "stablecoins_flow_exchanges",
  title: "Flow to Exchanges",
  description: "Estimated level of interest to swap stablecoins for more volatile cryptocurrencies"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckProPaywall, null, /*#__PURE__*/React.createElement(FlowToExchangesList, null)))), /*#__PURE__*/React.createElement(Section, {
  id: "stablecoins_top_exchanges"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopExchangesTable, {
  isStablecoinPage: true,
  selector: {
    watchlistId: isStage ? 1115 : 3985
  }
}))), /*#__PURE__*/React.createElement(Section, {
  id: "stablecoins_net_exchange",
  title: "Stablecoin Net Exchange Flow"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NetExchangeFlow, null))), /*#__PURE__*/React.createElement(Section, {
  id: "stablecoins_largest_transactions",
  title: "Largest Transactions to Exchanges",
  description: "Select an asset to view their largest transactions in the last 24 hours"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StablecoinsTransactions, getTimerangePeriod('24h')))), /*#__PURE__*/React.createElement(Section, {
  id: "stablecoins_holder_distribution",
  title: "Holder Distribution",
  description: "Number of addresses sorted by their stablecoin balance"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StablecoinHolderDistribution, null))), /*#__PURE__*/React.createElement(BlockWithRanges, {
  className: dashboardsStyles.rangePadding,
  title: "Transaction Activity",
  tag: "stablecoins_transaction_activity",
  el: TransactionsDominance,
  description: "Total amount of stablecoins moving between network addresses"
}), /*#__PURE__*/React.createElement(BlockWithRanges, {
  className: dashboardsStyles.rangePadding,
  title: "Network Activity",
  tag: "stablecoins_network_activity",
  description: "On-chain indicators of stablecoin utility and adoption",
  el: NetworkActivity
})));

export default withRenderQueueProvider(Stablecoins);
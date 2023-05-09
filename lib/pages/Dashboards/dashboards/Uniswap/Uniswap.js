import React from 'react';
import cx from 'classnames';
import Info from '../shared/Info/Info';
import Section from '../shared/Section/Section';
import TopExchangesTable from '../../../../components/Tables/TopExchanges';
import UniswapFlowBalances from '../../../../ducks/UniswapProtocol/UniswapFlowBalances';
import UniswapTopTransactions from '../../../../ducks/UniswapProtocol/UniswapTopTransactions/UniswapTopTransactions';
import UniMetricsChart from '../../../../ducks/UniswapProtocol/UniMetricsChart/UniMetricsChart';
import UniswapMetrics from '../../../../ducks/UniswapProtocol/UniswapMetrics/UniswapMetrics';
import UniswapHistoricalBalance from '../../../../ducks/Studio/Tabs/UniswapHistoricalBalance/UniswapHistoricalBalance';
import ClaimersWidgets, { ChartWidget } from '../../../../components/ClaimersWidgets';
import TopClaimersTable from '../../../../components/Tables/TopClaimers';
import UniswapWhoClaimed from '../../../../ducks/UniswapProtocol/UniswapPieChart/WhoClaimedPieChart';
import CheckProPaywall from '../../../../ducks/Stablecoins/CheckProPaywall';
import { Metric } from '../../../../ducks/dataHub/metrics';
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions';
import { useRestrictedInfo } from '../../hooks';
import dashboardsStyles from '../dashboards.module.css';
import styles from './Uniswap.module.css';
const BALANCE_CHART_PADDING = {
  top: 16,
  right: 45,
  bottom: 18,
  left: 45
};
const BALANCE_CHART_TICKS = {
  xTicks: 6,
  yTicks: 6
};
const TOTAL_CLAIMS_METRICS = [Metric.uniswap_total_claims_amount, Metric.uniswap_total_claims_percent];

const UniswapProtocol = () => {
  const areClaimsRestricted = useRestrictedInfo({
    metric: 'uniswap_total_claims_amount'
  });
  const {
    isPro
  } = useUserSubscriptionStatus();
  return /*#__PURE__*/React.createElement("section", {
    className: cx(dashboardsStyles.wrapper, 'column')
  }, /*#__PURE__*/React.createElement(Info, {
    title: "Uniswap Procotol",
    description: "Real-time data on UNI token distribution, total amount of UNI claimed, amount of UNI on centralized and decentralized exchange, top UNI transactions and more."
  }), /*#__PURE__*/React.createElement("main", {
    className: cx(dashboardsStyles.content, 'column')
  }, /*#__PURE__*/React.createElement(Section, {
    id: "uniswap_top_exchanges"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopExchangesTable, {
    slug: "uniswap"
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "uniswap_uni_balances",
    title: "UNI Flow Balances"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckProPaywall, {
    shouldCheck: !isPro
  }, /*#__PURE__*/React.createElement(UniswapFlowBalances, null)))), /*#__PURE__*/React.createElement(Section, {
    id: "uniswap_top_token_transactions"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UniswapTopTransactions, null))), /*#__PURE__*/React.createElement(Section, {
    id: "uniswap_uni_price",
    title: "UNI Price, Age Consumed, Active Addresses (24h)",
    description: "Daily active addresses signal the overall level of speculative (and utilitarian) interest in a digital asset. As a result, sustained price rallies tend to necessitate a strong uptick in active addresses. Spikes in Age Consumed point to a substantial amount of previously idle coins moving addresses, suggesting a shift in the behavior of long-term investors. These shifts are often strong indicators of upcoming price volatility in either direction"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UniMetricsChart, null))), /*#__PURE__*/React.createElement(Section, {
    id: "uniswap_token_distributor",
    title: "Token Distributor"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckProPaywall, {
    shouldCheck: areClaimsRestricted
  }, /*#__PURE__*/React.createElement(UniswapMetrics, null)))), /*#__PURE__*/React.createElement(Section, {
    id: "uniswap_uni_token_claims",
    title: "UNI Token Claims",
    description: "0x090d4613473dee047c3f2706764f49e0821d256e"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.overviewWrapper
  }, /*#__PURE__*/React.createElement(UniswapHistoricalBalance, {
    className: styles.balance__chart,
    headerClassName: styles.balance__header,
    axesTicks: BALANCE_CHART_TICKS,
    padding: BALANCE_CHART_PADDING,
    height: 448
  }), /*#__PURE__*/React.createElement(ChartWidget, {
    height: 448,
    metrics: TOTAL_CLAIMS_METRICS
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "uniswap_top_claimers"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckProPaywall, {
    shouldCheck: areClaimsRestricted
  }, /*#__PURE__*/React.createElement(TopClaimersTable, null)))), /*#__PURE__*/React.createElement(Section, {
    id: "uniswap_uni_claims",
    title: "UNI Claims: Overview"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckProPaywall, {
    shouldCheck: areClaimsRestricted
  }, /*#__PURE__*/React.createElement(ClaimersWidgets, null)))), /*#__PURE__*/React.createElement(Section, {
    id: "uniswap_who_claimed",
    title: "Who claimed UNI?"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UniswapWhoClaimed, null)))));
};

export default UniswapProtocol;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Metric } from '../../../../../../dataHub/metrics';
import { HolderDistributionAbsoluteMetric, HolderDistributionCombinedBalanceAbsoluteMetric, HolderDistributionPercentMetric } from '../../../../../../Studio/Chart/Sidepanel/HolderDistribution/metrics';
export const NO_GROUP = '_';

function makeSignalMetric(key, label, category, node = 'line', group) {
  return {
    key,
    label,
    category,
    node,
    group
  };
}

export const DAILY_METRICS = [Metric.mean_age, Metric.mean_dollar_invested_age, Metric.withdrawal_transactions, ...Object.values(HolderDistributionAbsoluteMetric).map(m => _objectSpread(_objectSpread({}, m), {}, {
  category: 'On-chain',
  node: 'line',
  label: `Supply Distribution Absolute ${m.label}`
})), ...Object.values(HolderDistributionPercentMetric).map(m => _objectSpread(_objectSpread({}, m), {}, {
  category: 'On-chain',
  node: 'line',
  label: `Supply Distribution Percent ${m.label}`
})), ...Object.values(HolderDistributionCombinedBalanceAbsoluteMetric).map(m => _objectSpread(_objectSpread({}, m), {}, {
  category: 'On-chain',
  node: 'line',
  label: `Supply Distribution by Balance of Addresses ${m.label}`
})), Metric.mcd_locked_token, Metric.scd_locked_token, Metric.mcd_collat_ratio, Metric.mcd_collat_ratio_weth, Metric.mcd_collat_ratio_sai, Metric.scd_collat_ratio, Metric.mcd_dsr, Metric.mcd_stability_fee, Metric.bitmex_perpetual_basis, Metric.bitmex_perpetual_basis_ratio, Metric.bitmex_perpetual_funding_rate, Metric.bitmex_perpetual_open_interest, Metric.bitmex_perpetual_open_value];
export const SIGNAL_SUPPORTED_METRICS = [Metric.social_volume_total, Metric.whale_transaction_count_1m_usd_to_inf, Metric.whale_transaction_count_100k_usd_to_inf, makeSignalMetric('social_volume_reddit', 'Social volume (reddit)', 'Social'), makeSignalMetric('social_volume_telegram', 'Social volume (telegram)', 'Social'), makeSignalMetric('social_volume_twitter', 'Social volume (twitter)', 'Social'), Metric.volume_usd, Metric.age_consumed, Metric.exchange_balance, makeSignalMetric('price_btc', 'Price BTC', 'Financial'), makeSignalMetric('price_eth', 'Price ETH', 'Financial'), Metric.marketcap_usd, _objectSpread(_objectSpread({}, Metric.nvt), {}, {
  key: 'nvt_5min'
}), makeSignalMetric('community_messages_count_total', 'Community messages count(total)', 'Social'), makeSignalMetric('community_messages_count_telegram', 'Community messages count(telegram)', 'Social'), // makeSignalMetric('community_messages_count_discord', 'Community messages count(discord)', 'Social'),
makeSignalMetric('social_dominance_total', 'Social dominance (total)', 'Social'), makeSignalMetric('social_dominance_reddit', 'Social dominance (reddit)', 'Social'), makeSignalMetric('social_dominance_telegram', 'Social dominance (telegram)', 'Social'), makeSignalMetric('social_dominance_twitter', 'Social dominance (twitter)', 'Social'), Metric.transaction_volume, makeSignalMetric('exchange_inflow', 'Exchange Inflow', 'On-chain', 'bar', 'Exchanges'), makeSignalMetric('exchange_outflow', 'Exchange Outflow', 'On-chain', 'bar', 'Exchanges'), Metric.dev_activity, makeSignalMetric('github_activity', 'Github Activity', 'Development'), makeSignalMetric('mvrv_usd_intraday', 'MVRV intraday', 'On-chain', 'line', 'Network Value'), Metric.network_profit_loss, makeSignalMetric('active_deposits_5m', 'Daily Active Deposits (5m)', 'On-chain', 'bar', 'Exchanges'), makeSignalMetric('deposit_transactions_5m', 'Deposit Transactions (5m)', 'On-chain', 'line', 'Exchanges'), Metric.mcd_supply, Metric.dai_created, Metric.dai_repaid, Metric.mcd_liquidation, ...DAILY_METRICS];
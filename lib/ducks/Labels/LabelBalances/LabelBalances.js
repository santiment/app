function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import DashboardProjectChart from '../../../components/DashboardMetricChart/DashboardProjectChart/DashboardProjectChart';

function makeMetric(key, label) {
  return {
    key,
    label
  };
}

const SUPPORTED_METRICS = [makeMetric('all_known_balance', 'All labeled addresses'), makeMetric('unlabeled_balance', 'All unlabeled addresses'), makeMetric('miners_balance', 'Miners'), makeMetric('genesis_balance', 'Genesis'), makeMetric('dex_trader_balance', 'DEX Traders'), makeMetric('defi_balance', 'DeFi'), makeMetric('dex_balance', 'DEXes'), makeMetric('cex_balance', 'CEXes'), makeMetric('withdrawal_balance', 'CEX Withdrawals'), makeMetric('deposit_balance', 'CEX Deposits'), makeMetric('proxy_balance', 'Proxies'), makeMetric('whale_balance', 'Whales'), makeMetric('makerdao_bite_keeper_balance', 'MakerDAO Bite Keepers'), makeMetric('makerdao_cdp_owner_balance', 'MakerDAO CDP Owners')];

const metricsBuilder = ({
  slug
}) => {
  return SUPPORTED_METRICS.map(item => {
    return _objectSpread(_objectSpread({}, item), {}, {
      node: 'area',
      reqMeta: {
        slug
      }
    });
  });
};

const LabelBalances = () => /*#__PURE__*/React.createElement(DashboardProjectChart, {
  metricsBuilder: metricsBuilder
});

export default LabelBalances;
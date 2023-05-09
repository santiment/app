function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { percentFormatter, axisPercentFormatter, LABEL_PERCENT_POSTFIX } from './utils';
import { updateTooltipSetting } from '../../../../dataHub/tooltipSettings';
const HOLDER_DISTRIBUTION_TEMPLATE = {
  _0_to_0001: {
    label: '[0 - 0.001) coins',
    queryKey: '_0_to_0.001'
  },
  _0001_to_001: {
    label: '[0.001 - 0.01) coins',
    queryKey: '_0.001_to_0.01'
  },
  _001_to_01: {
    label: '[0.01 - 0.1) coins',
    queryKey: '_0.01_to_0.1'
  },
  _01_to_1: {
    label: '[0.1 - 1) coins',
    queryKey: '_0.1_to_1'
  },
  _1_to_10: {
    label: '[1 - 10) coins'
  },
  _10_to_100: {
    label: '[10 - 100) coins'
  },
  _100_to_1k: {
    label: '[100 - 1,000) coins'
  },
  _1k_to_10k: {
    label: '[1,000 - 10,000) coins'
  },
  _10k_to_100k: {
    label: '[10,000 - 100,000) coins'
  },
  _100k_to_1M: {
    label: '[100,000  - 1,000,000) coins'
  },
  _1M_to_10M: {
    label: '[1,000,000 - 10,000,000) coins'
  },
  _10M_to_inf: {
    label: '[10,000,000 - infinity) coins'
  }
};
const ABSOLUTE_HOLDER_DISTRIBUTION_KEY = 'holders_distribution';
const ABSOLUTE_HOLDER_DISTRIBUTION_COMBINED_BALANCE_KEY = 'holders_distribution_combined_balance';
const PERCENT_HOLDER_DISTRIBUTION_KEY = 'percent_of_holders_distribution_combined_balance';
const HOLDERS_LABELED_DISTRIBUTION_KEY = 'holders_labeled_distribution';
const KEYS = Object.keys(HOLDER_DISTRIBUTION_TEMPLATE);

function buildMetrics(templateKey, type, labelPostfix = '', formatter, axisFormatter) {
  const Metric = {};
  KEYS.forEach(range => {
    const key = templateKey + range;
    const {
      label: tmpLabel,
      queryKey
    } = HOLDER_DISTRIBUTION_TEMPLATE[range];
    const label = tmpLabel + labelPostfix;
    const metric = {
      key,
      type,
      label,
      formatter,
      axisFormatter,
      node: 'line',
      queryKey: queryKey && templateKey + queryKey
    };
    updateTooltipSetting(metric);
    Metric[key] = metric;
  });
  return Metric;
}

export const HoldersLabeledDistributionMetric = buildMetrics(HOLDERS_LABELED_DISTRIBUTION_KEY);
export const HolderDistributionAbsoluteMetric = buildMetrics(ABSOLUTE_HOLDER_DISTRIBUTION_KEY);
export const HolderDistributionPercentMetric = buildMetrics(PERCENT_HOLDER_DISTRIBUTION_KEY, 'percent', LABEL_PERCENT_POSTFIX, percentFormatter, axisPercentFormatter);
export const HolderDistributionCombinedBalanceAbsoluteMetric = buildMetrics(ABSOLUTE_HOLDER_DISTRIBUTION_COMBINED_BALANCE_KEY);
export const HolderDistributionMetric = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, HoldersLabeledDistributionMetric), HolderDistributionAbsoluteMetric), HolderDistributionPercentMetric), HolderDistributionCombinedBalanceAbsoluteMetric);
export const HOLDER_DISTRIBUTION_ABSOLUTE_METRICS = Object.values(HolderDistributionAbsoluteMetric);
export const HOLDER_DISTRIBUTION_PERCENT_METRICS = Object.values(HolderDistributionPercentMetric);
export const HOLDERS_DISTRIBUTION_LABELED_METRICS = Object.values(HoldersLabeledDistributionMetric);
export const HOLDER_DISTRIBUTION_COMBINED_BALANCE_ABSOLUTE_METRICS = Object.values(HolderDistributionCombinedBalanceAbsoluteMetric);
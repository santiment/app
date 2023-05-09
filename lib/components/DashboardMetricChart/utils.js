function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { formatNumber } from '../../utils/formatting';
import { CRYPTO_ERA_START_DATE, DEX_ERA_START_DATE } from '../../utils/dates';
import { formIntervalSettings } from '../../ducks/SANCharts/IntervalSelector';
export const makeIntervalSelectors = ({
  val,
  label,
  interval = '1d',
  from
}) => {
  const requestParams = _objectSpread(_objectSpread({}, formIntervalSettings(val)), {}, {
    interval
  });

  if (from) {
    requestParams.from = from;
  }

  return {
    index: val,
    value: val,
    label: label,
    requestParams
  };
};
export const makeMetric = (key, label, formatter = formatNumber) => {
  return {
    key,
    label,
    formatter
  };
};
export const INTERVAL_30_DAYS = makeIntervalSelectors({
  val: '30d',
  label: 'Last 1 month',
  interval: '3h'
});
export const INTERVAL_6_MONTHS = makeIntervalSelectors({
  val: '183d',
  label: 'Last 6 months',
  interval: '1d'
});
export const INTERVAL_3_MONTHS = makeIntervalSelectors({
  val: '90d',
  label: 'Last 3 months',
  interval: '8h'
});
const INTERVAL_DAY = makeIntervalSelectors({
  val: '1d',
  label: 'Last 1 day',
  interval: '15m'
});
const INTERVAL_1_YEAR = makeIntervalSelectors({
  val: '1y',
  label: 'Last 1 year',
  interval: '1d'
});
const INTERVAL_WEEK = makeIntervalSelectors({
  val: '1w',
  label: 'Last 1 week',
  interval: '1h'
});
const INTERVAL_ALL_TIME = makeIntervalSelectors({
  val: 'all',
  label: 'All time',
  interval: '1d',
  from: CRYPTO_ERA_START_DATE
});
export const NON_DAILY_INTERVAL_SELECTORS = [INTERVAL_WEEK, INTERVAL_30_DAYS, INTERVAL_3_MONTHS, INTERVAL_6_MONTHS, INTERVAL_1_YEAR, INTERVAL_ALL_TIME];
export const ETH2_INTERVAL_SELECTORS = [INTERVAL_DAY, INTERVAL_WEEK, INTERVAL_30_DAYS, INTERVAL_3_MONTHS, INTERVAL_6_MONTHS, INTERVAL_1_YEAR];
export const DEFAULT_INTERVAL_SELECTORS = [INTERVAL_DAY, ...NON_DAILY_INTERVAL_SELECTORS];
export const DEX_INTERVAL_SELECTORS = [INTERVAL_DAY, INTERVAL_WEEK, INTERVAL_30_DAYS, INTERVAL_3_MONTHS, INTERVAL_6_MONTHS, INTERVAL_1_YEAR, makeIntervalSelectors({
  val: 'all',
  label: 'All time',
  interval: '1d',
  from: DEX_ERA_START_DATE
})];
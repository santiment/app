function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Metric } from '../../../ducks/dataHub/metrics';
import { getNewInterval } from '../../../ducks/SANCharts/IntervalSelector';
import { getIntervalByTimeRange } from '../../../utils/dates';
const DEFAULT_TIME_RANGE = '6m';
const {
  from: FROM,
  to: TO
} = getIntervalByTimeRange(DEFAULT_TIME_RANGE);
export const PriceMobileStyles = {
  node: 'area',
  gradientUrl: 'url(#totalUp)',
  hideYAxis: true
};
export const PriceMetric = _objectSpread(_objectSpread({}, Metric.price_usd), PriceMobileStyles);
export const MAX_METRICS_PER_CHART = 3;
export const DEFAULT_SETTINGS = {
  interval: getNewInterval(FROM, TO, '1d', {
    isMobile: true
  }),
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE
};
export const POPULAR_METRICS = [Metric.daily_active_addresses, Metric.dev_activity, Metric.social_volume_total];
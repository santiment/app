function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { getNewInterval } from '../SANCharts/IntervalSelector';
import { getIntervalByTimeRange } from '../../utils/dates';
import { getSavedMulticharts, getSavedToggle } from '../../utils/localStorage';
const DEFAULT_TIME_RANGE = '6m';
const {
  from: FROM,
  to: TO
} = getIntervalByTimeRange(DEFAULT_TIME_RANGE);
export const DEFAULT_SETTINGS = {
  slug: 'bitcoin',
  projectId: 1505,
  ticker: 'BTC',
  title: 'Bitcoin (BTC)',
  interval: getNewInterval(FROM, TO),
  from: FROM.toISOString(),
  to: TO.toISOString(),
  timeRange: DEFAULT_TIME_RANGE
};
export const COMMON_CHART_OPTIONS = {
  isWatermarkLighter: getSavedToggle('isWatermarkLighter', false),
  isWatermarkVisible: getSavedToggle('isWatermarkVisible', true),
  isCartesianGridActive: getSavedToggle('isCartesianGridActive', true)
};
export const DEFAULT_OPTIONS = _objectSpread({
  isLogScale: false,
  isICOPriceActive: false,
  isMultiChartsActive: getSavedMulticharts(),
  isClosestDataActive: getSavedToggle('isClosestDataActive', true)
}, COMMON_CHART_OPTIONS);
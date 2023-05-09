function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { parseIntervalString } from '../../utils/dates';
import { Metric } from '../dataHub/metrics';
const IntervalFormatDividend = {
  h: 24,
  m: 60 * 24
};
const METRIC_WIDGET_SET = new Set([Metric.price_daa_divergence, Metric.adjusted_price_daa_divergence]);
export function mergeMetricSettingMap(oldMap, newMap) {
  const mergedMap = new Map(oldMap);
  newMap.forEach((newSettings, metric) => mergedMap.set(metric, _extends({}, oldMap.get(metric), newSettings)));
  return mergedMap;
}
export function calculateMovingAverageFromInterval(interval) {
  const {
    amount,
    format
  } = parseIntervalString(interval);
  const dividend = IntervalFormatDividend[format] || 1;
  return dividend / amount * 7;
}
export const checkIsMetricWidget = metric => METRIC_WIDGET_SET.has(metric);
export function extractIndicatorDomainGroups(MetricIndicators) {
  const domainGroups = [];
  Object.keys(MetricIndicators).forEach(rootDomain => {
    const indicators = MetricIndicators[rootDomain];

    if (indicators && indicators.size > 0) {
      const indicatorKeys = [...indicators].map(({
        key
      }) => key + '_' + rootDomain);
      indicatorKeys.unshift(rootDomain);
      domainGroups.push(indicatorKeys);
    }
  });
  return domainGroups;
}
export function deduceItems(items, item) {
  const newItems = new Set(items);

  if (newItems.has(item)) {
    newItems.delete(item);
  } else {
    newItems.add(item);
  }

  return [...newItems];
}
export function getMetricSetting(MetricSettingMap, metric) {
  const metricSetting = MetricSettingMap.get(metric);
  if (metricSetting) return metricSetting;
  const newMetricSetting = {};
  MetricSettingMap.set(metric, newMetricSetting);
  return newMetricSetting;
}
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Metric } from '../dataHub/metrics';
import { TooltipSetting } from '../dataHub/tooltipSettings';
const MetricsCache = new Map();
export const metricHash = (metric, selector) => metric + '_' + selector;
export const buildKey = (key, selector) => `${key}_${selector.replace(/[^a-zA-Z0-9]+/g, '')}`;
export function buildMetrics(metrics, topics) {
  const transformedMetrics = [];
  const priceMetric = metrics.find(({
    key
  }) => key === Metric.price_usd.key);
  topics.forEach(topic => {
    metrics.forEach(metric => {
      if (metric.key === Metric.price_usd.key) {
        return;
      }

      const transformedMetric = buildMetric(metric, topic);
      transformedMetrics.push(transformedMetric);
    });
  });
  transformedMetrics.splice(1, 0, priceMetric);
  return transformedMetrics;
}

function buildMetric(metric, text) {
  if (metric === Metric.price_usd) {
    return metric;
  }

  return buildTextBasedMetric(metric, text);
}

export function buildTextBasedMetric(metric, text) {
  const key = buildKey(metric.key, text);
  const cached = MetricsCache.get(key);

  if (cached) {
    return cached;
  }

  const {
    key: metricKey,
    label,
    shortLabel = label,
    formatter
  } = metric;
  const clippedText = text.length > 20 ? text.slice(0, 20) + '...' : text;

  const textMetric = _objectSpread(_objectSpread({}, metric), {}, {
    key,
    queryKey: metricKey,
    domainGroup: metricKey,
    useOriginColor: true,
    label: `${clippedText}, ${shortLabel}`,
    text
  });

  TooltipSetting[key] = {
    formatter,
    label: `${clippedText}, ${shortLabel}`
  };
  MetricsCache.set(key, textMetric);
  return textMetric;
}
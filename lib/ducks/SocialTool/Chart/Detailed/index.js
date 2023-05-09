const _excluded = ["linkedAssets", "allDetectedAssets", "MetricColor", "priceAsset", "settings", "type", "availableMetrics", "children"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect, useMemo } from 'react';
import { graphql } from 'react-apollo';
import Chart from './Chart';
import { Metric } from '../../../dataHub/metrics';
import { PROJECT_METRICS_BY_SLUG_QUERY } from '../../../SANCharts/gql';
import { DetailedMetric } from './metrics';
import styles from './index.module.css';
const GENERAL_CHARTS = [DetailedMetric.social_volume_telegram, DetailedMetric.social_volume_reddit, DetailedMetric.social_volume_twitter, DetailedMetric.social_volume_4chan];
const COMMUNITY_CHARTS = [DetailedMetric.community_messages_count_telegram];
const Colors = {};
GENERAL_CHARTS.forEach(({
  key,
  color
}) => Colors[key] = color);
COMMUNITY_CHARTS.forEach(({
  key,
  color
}) => Colors[key] = color);
const DefaultCharts = {
  general: GENERAL_CHARTS,
  community: []
};

const DetailedBlock = _ref => {
  let {
    linkedAssets,
    allDetectedAssets,
    MetricColor,
    priceAsset,
    settings,
    type,
    availableMetrics,
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [MetricSettingMap, setMetricSettingMap] = useState(new Map());
  const charts = useMemo(() => {
    if (!availableMetrics) {
      return DefaultCharts[type];
    }

    return COMMUNITY_CHARTS.filter(({
      key
    }) => availableMetrics.includes(key));
  }, [availableMetrics], type);
  const detectedAsset = type === 'community' ? allDetectedAssets.get(settings.slug) : linkedAssets.get(settings.slug);
  useEffect(() => {
    const newMetricSettingMap = new Map(MetricSettingMap);
    const metricSetting = {
      selector: detectedAsset ? 'slug' : 'text',
      slug: detectedAsset ? detectedAsset.slug : settings.slug
    };

    if (charts.length > 0) {
      charts.forEach(metric => newMetricSettingMap.set(metric, metricSetting));
      setMetricSettingMap(newMetricSettingMap);
    }
  }, [charts, settings.slug]);

  if (charts.length === 0) {
    return null;
  }

  const shouldShowChart = type !== 'community' || Boolean(detectedAsset);
  return !shouldShowChart || MetricSettingMap.size === 0 || !priceAsset ? null : /*#__PURE__*/React.createElement(React.Fragment, null, charts.length > 0 && children, /*#__PURE__*/React.createElement("div", {
    className: styles.charts
  }, charts.map(chart => /*#__PURE__*/React.createElement("div", {
    className: styles.chart,
    key: chart.key
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.label,
    style: {
      '--color': chart.color
    }
  }, chart.name), /*#__PURE__*/React.createElement(Chart, _extends({}, props, {
    settings: settings,
    colors: _objectSpread(_objectSpread({}, MetricColor), Colors),
    metrics: [chart, _objectSpread(_objectSpread({}, Metric.price_usd), {}, {
      reqMeta: {
        slug: priceAsset.slug
      }
    })],
    MetricSettingMap: MetricSettingMap
  }))))));
};

export default graphql(PROJECT_METRICS_BY_SLUG_QUERY, {
  skip: ({
    allDetectedAssets,
    settings,
    type
  }) => {
    const detectedAsset = allDetectedAssets.get(settings.slug);
    return !detectedAsset || type !== 'community' || settings.addedTopics.length > 0;
  },
  options: ({
    allDetectedAssets,
    settings
  }) => {
    const detectedAsset = allDetectedAssets.get(settings.slug);
    return {
      variables: {
        slug: detectedAsset.slug
      }
    };
  },
  props: ({
    data: {
      project: {
        availableMetrics = []
      } = {}
    }
  }) => {
    return {
      availableMetrics
    };
  }
})(DetailedBlock);
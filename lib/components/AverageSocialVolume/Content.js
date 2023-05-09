function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import Loader from '@santiment-network/ui/Loader/Loader';
import { Metric } from '../../ducks/dataHub/metrics';
import { useTimeseries } from '../../ducks/Studio/timeseries/hooks';
import { SOCIAL_VOLUME_COLORS } from '../../ducks/SocialTool/Chart/colors';
import { getIntervalByTimeRange } from '../../utils/dates';
import { buildExploredMetric, calcAverage, calcPercentage } from './utils';
import DetailsItem from './DetailsItem';
import Column from './Column';
import styles from './index.module.css';

function useSocialTimeseries(metrics, settings, MetricSettingMap) {
  const [activeMetrics, setMetrics] = useState([]);
  useEffect(() => {
    if (MetricSettingMap.size > 0) {
      setMetrics(metrics);
    }
  }, [metrics]);
  useEffect(() => {
    if (activeMetrics.length === 0 && metrics.length !== 0 && MetricSettingMap.size > 0) {
      setMetrics(metrics);
    }
  }, [MetricSettingMap]);
  return useTimeseries(activeMetrics, settings, MetricSettingMap);
}

const Content = ({
  topics: defaultTopics,
  range,
  linkedAssets
}) => {
  const [metrics, setMetrics] = useState([]);
  const [topics, setTopics] = useState();
  const [avg, setAvg] = useState([]);
  const [MetricSettingMap, setMetricSettingMap] = useState(new Map());
  const [settings, setSettings] = useState({
    interval: '1d'
  });
  const [data, loadings] = useSocialTimeseries(metrics, settings, MetricSettingMap);
  useEffect(() => {
    const {
      from: FROM,
      to: TO
    } = getIntervalByTimeRange(range);
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      from: FROM.toISOString(),
      to: TO.toISOString()
    }));
  }, [range]);
  useEffect(() => {
    const newAvg = calcAverage(metrics, data);

    if (JSON.stringify(newAvg) !== JSON.stringify(avg)) {
      setAvg(newAvg);
    }
  }, [data]);
  useEffect(() => {
    if (defaultTopics !== topics) {
      if (JSON.stringify(defaultTopics) === JSON.stringify(topics)) {
        return;
      }

      let newMetrics = defaultTopics.map(topic => buildExploredMetric(topic));
      newMetrics = [Metric.social_volume_total, ...newMetrics];
      setTopics(defaultTopics);
      setMetrics(newMetrics);
      setAvg([]);
    }
  }, [defaultTopics]);
  useEffect(() => {
    rebuildMetricsMap();
  }, [metrics, linkedAssets]);

  function rebuildMetricsMap() {
    const newMetricSettingMap = new Map(new Map());
    metrics.forEach(metric => {
      const topic = metric.text || '*';
      const detectedAsset = linkedAssets.get(topic);
      newMetricSettingMap.set(metric, {
        selector: detectedAsset ? 'slug' : 'text',
        slug: detectedAsset ? detectedAsset.slug : topic
      });
    });
    setMetricSettingMap(newMetricSettingMap);
  }

  const totalAvg = avg[0];
  const remainingAvg = avg.slice(1);
  const max = remainingAvg.length > 1 ? Math.max(...remainingAvg) : totalAvg;
  return MetricSettingMap.size > 0 ? /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, avg.length === 2 && /*#__PURE__*/React.createElement(Column, {
    percent: 100,
    className: styles.column
  }), remainingAvg.map((item, idx) => /*#__PURE__*/React.createElement(Column, {
    key: idx,
    color: SOCIAL_VOLUME_COLORS[idx],
    percent: calcPercentage(max, item),
    className: styles.column
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.details
  }, /*#__PURE__*/React.createElement(DetailsItem, {
    value: totalAvg,
    className: styles.item
  }), remainingAvg.map((item, idx) => /*#__PURE__*/React.createElement(DetailsItem, {
    key: idx,
    value: item,
    color: SOCIAL_VOLUME_COLORS[idx],
    percent: calcPercentage(totalAvg, item),
    title: topics[idx],
    className: styles.item
  }))), (avg.length !== metrics.length || loadings.length > 0) && /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  })) : null;
};

export default Content;
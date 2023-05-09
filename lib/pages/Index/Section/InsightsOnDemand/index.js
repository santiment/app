function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Chart from './Chart';
import { setupMetricColors, mapProjectMetrics } from './insights';
import { Metric } from '../../../../ducks/dataHub/metrics';
import { Section } from '../index';
import { CHARTS_ANCHOR } from '../../Navigation/anchors';
import { useFeaturedTemplates } from '../../../../ducks/Studio/Template/gql/hooks';
import { getTemplateSharePath as prepareTemplateLink } from '../../../../ducks/Studio/Template/utils';
import styles from './index.module.css';
const InsightsOnDemand = /*#__PURE__*/React.memo(() => {
  const [templates] = useFeaturedTemplates();
  const charts = useMemo(() => templates.map(template => {
    const {
      metrics: metricKeys,
      project
    } = template;
    const url = prepareTemplateLink(template);
    const settings = {
      slug: project.slug,
      ticker: project.ticker,
      from: 'utc_now-90d',
      to: 'utc_now',
      interval: '1d'
    };
    const metrics = metricKeys.map(key => Metric[key]).filter(Boolean);
    const metricsArr = mapProjectMetrics(project, metrics);
    const MetricColor = setupMetricColors(metricsArr);
    return _objectSpread(_objectSpread({}, template), {}, {
      url,
      widget: () => /*#__PURE__*/React.createElement(Chart, {
        metrics: metricsArr,
        settings: settings,
        MetricColor: MetricColor
      })
    });
  }), [templates]);
  return /*#__PURE__*/React.createElement(Section, {
    title: "Charts Gallery",
    id: CHARTS_ANCHOR
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.charts
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.scroller
  }, charts.map(({
    title,
    widget,
    url
  }, idx) => /*#__PURE__*/React.createElement("div", {
    className: styles.chart,
    key: idx
  }, /*#__PURE__*/React.createElement(Link, {
    to: url,
    className: styles.hoverChart
  }, "Click to move into charts"), /*#__PURE__*/React.createElement("div", {
    className: styles.widget
  }, widget()), /*#__PURE__*/React.createElement("h4", {
    className: styles.title
  }, title)))))));
});
export default InsightsOnDemand;
const _excluded = ["metrics"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Signal from './Signal';
import Add from './Add';
import { SIGNAL_ABOVE, drawHoveredSignal, findMetricValueByY, findMetricLastValue, makeSignalDrawable, checkPriceMetric, AlertBuilder } from './helpers';
import { useAlertMetrics } from './hooks';
import { useChart } from '../context';
import { clearCtx } from '../utils';
import { getSlugPriceSignals } from '../../SANCharts/utils';
import { Metric } from '../../dataHub/metrics';
import { TooltipSetting } from '../../dataHub/tooltipSettings';
import { useSignals } from '../../Signals/common/getSignals';
import { createTrigger, removeTrigger } from '../../Signals/common/actions';
import { buildValueChangeSuggester } from '../../Studio/Alerts/suggestions/helpers';
import LoginPopup from '../../../components/banners/feature/PopupBanner';
import styles from './index.module.css';
const TEXT_SIGNAL = 'Alert ';
const TEXT_ACTION = 'Click to create an alert ';
const SHORT_TEXT_ACTION = 'Create an alert ';
const TEXT_IFS = {
  daily_active_addresses: ['if DAA count goes below ', 'if DAA count goes above ']
};
const MOVING_TEXT_BY_SIGN = [' drops below ', ' rises above '];

const getTextIf = (metric, index, useShortRecord) => {
  const texts = TEXT_IFS[metric.key];

  if (texts) {
    return texts[index];
  }

  let label = metric.label;

  if (useShortRecord) {
    label = metric.shortLabel || label;
  }

  return `if ${label.toLowerCase()}${MOVING_TEXT_BY_SIGN[index]}`;
};

const priceFormatter = Metric.price_usd.formatter;
const DEFAULT_SIGNALS = [];

const Signals = ({
  width,
  slug,
  asset,
  selector = 'slug',
  chart,
  data,
  createSignal,
  removeSignal,
  metrics,
  useShortRecord
}) => {
  const [isHovered, setIsHovered] = useState();
  const [hoverPoint, setHoverPoint] = useState();
  const {
    data: userSignals
  } = useSignals();
  const [signals, setSignals] = useState(DEFAULT_SIGNALS);
  useEffect(() => {
    chart.isAlertsActive = true;
    return () => chart.isAlertsActive = false;
  }, []);
  useEffect(() => {
    buildSignals(); // TODO: remove observer gaurd check when all charts are migrated [@vanguard | Oct 20, 2020]

    const observer = chart.plotManager || chart.observer;
    return observer && observer.subscribe(buildSignals);
  }, [userSignals, slug]);

  function buildSignals() {
    let signals = [];

    try {
      signals = getSlugPriceSignals(userSignals, slug).map(signal => makeSignalDrawable(signal, chart)).filter(Boolean);
    } catch (e) {
      console.error(e);
    }

    setSignals(signals);
  }

  function onMouseMove({
    target,
    currentTarget,
    nativeEvent: {
      offsetY: y
    }
  }) {
    if (isHovered || data.length === 0 || target !== currentTarget) {
      return;
    }

    const metricValues = metrics.map(metric => ({
      key: metric.base ? metric.base.key : metric.key,
      project: metric.project,
      value: findMetricValueByY(chart, metric, y),
      lastValue: findMetricLastValue(data, metric)
    }));
    const priceIndex = metrics.findIndex(checkPriceMetric);
    const {
      key,
      value,
      lastValue
    } = metricValues[priceIndex === -1 ? 0 : priceIndex];
    if (value === undefined) return;
    setHoverPoint({
      y,
      metricValues
    });
    drawHoveredSignal(chart, y, [useShortRecord ? SHORT_TEXT_ACTION : TEXT_ACTION, getTextIf(Metric[key], +(value > lastValue), useShortRecord), TooltipSetting[key].formatter(value)]);
  }

  function onClick({
    target,
    currentTarget,
    nativeEvent: {
      offsetY: y
    }
  }) {
    if (isHovered || data.length === 0 || target !== currentTarget) {
      return;
    }

    let metric = metrics.find(checkPriceMetric) || metrics[0];
    const value = findMetricValueByY(chart, metric, y);
    const lastValue = findMetricLastValue(data, metric);
    if (value === undefined) return; // TODO: Refactor [@vanguard | Nov  6, 2020]

    const alertSlug = metric.project ? metric.project.slug : slug;
    metric = metric.base ? metric.base : metric;
    const suggester = AlertBuilder[metric.key] || buildValueChangeSuggester;
    const newSignal = suggester(metric)({
      value,
      lastValue,
      metric,
      slug: alertSlug
    });
    createSignal(newSignal.alert);
  }

  function onMouseLeave() {
    setHoverPoint();
    clearCtx(chart, chart.tooltip.ctx);
  }

  function setHoveredSignal(signal) {
    setIsHovered(signal);

    if (signal) {
      const {
        type,
        value,
        y
      } = signal;
      drawHoveredSignal(chart, y, [TEXT_SIGNAL + getTextIf(Metric.price_usd, +(type === SIGNAL_ABOVE), useShortRecord), priceFormatter(value)]);
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    className: styles.wrapper,
    style: {
      width: width || chart.padding.right - (chart.rightAxisMargin || 0),
      height: chart.height + chart.top
    }
  }, signals.map(signal => /*#__PURE__*/React.createElement(Signal, {
    key: signal.id,
    signal: signal,
    setHovered: setHoveredSignal,
    removeSignal: removeSignal
  })), hoverPoint && /*#__PURE__*/React.createElement(Add, {
    hoverPoint: hoverPoint,
    slug: slug,
    selector: selector,
    asset: asset,
    data: data,
    createAlert: createSignal,
    onDialogClose: onMouseLeave
  }));
};

const mapDispatchToProps = dispatch => ({
  createSignal: payload => dispatch(createTrigger(payload)),
  removeSignal: id => dispatch(removeTrigger(id))
});

export default connect(null, mapDispatchToProps)(_ref => {
  let {
    metrics
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const chart = props.chart || useChart();
  const alertMetrics = useAlertMetrics(metrics);

  if (alertMetrics.length === 0 || chart.isSelecting) {
    return null;
  }

  return /*#__PURE__*/React.createElement(LoginPopup, null, /*#__PURE__*/React.createElement(Signals, _extends({
    chart: chart
  }, props, {
    metrics: alertMetrics
  })));
});
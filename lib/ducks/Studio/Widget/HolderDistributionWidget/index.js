const _excluded = ["activeMetrics"],
      _excluded2 = ["widget", "settings", "sidepanelHeader", "TabMetrics", "isWithTabs", "isOpened", "onChangeLabels", "setIsOpened"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import { checkIfWasNotMerged, buildMergedMetric } from './utils';
import Widget from '../Widget';
import ChartWidget, { Chart } from '../ChartWidget';
import { usePhase, Phase } from '../../phases';
import Sidepanel, { CloseButton } from '../../Chart/Sidepanel';
import ChartActiveMetrics from '../../Chart/ActiveMetrics';
import { TOP_HOLDERS_PANE } from '../../Chart/Sidepanel/panes';
import { HolderDistributionMetric, HOLDER_DISTRIBUTION_ABSOLUTE_METRICS } from '../../Chart/Sidepanel/HolderDistribution/metrics';
import { useRenderQueueItem } from '../../../renderQueue/sized';
import { useChartColors } from '../../../Chart/colors';
import { usePressedModifier } from '../../../../hooks/keyboard';
import styles from './index.module.css';
const DEFAULT_CHECKED_METRICS = new Set();

const Title = _ref => {
  let {
    activeMetrics
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(ChartActiveMetrics, _extends({
    activeMetrics: activeMetrics.filter(({
      key,
      baseMetrics
    }) => !(HolderDistributionMetric[key] || baseMetrics))
  }, props));
};

export const HoldersDistributionTitle = ({
  ticker,
  description
}) => {
  return /*#__PURE__*/React.createElement("div", null, ticker, " Supply Distribution", /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description));
};

const HolderDistribution = _ref2 => {
  let {
    widget,
    settings,
    sidepanelHeader,
    TabMetrics,
    isWithTabs,
    isOpened,
    onChangeLabels,
    setIsOpened
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  const MetricColor = useChartColors(widget.metrics, widget.MetricColor);
  const PressedModifier = usePressedModifier();
  const {
    currentPhase,
    setPhase
  } = usePhase();
  const [checkedMetrics, setSelectedMetrics] = useState(DEFAULT_CHECKED_METRICS);
  const [mergedMetrics, setMergedMetrics] = useState(widget.mergedMetrics);

  function toggleWidgetMetric(metric) {
    if (currentPhase !== Phase.IDLE) {
      return checkMetric(metric);
    }

    props.toggleWidgetMetric(widget, PressedModifier.cmdKey ? [metric] : metric);
  }

  function checkMetric(metric) {
    const newCheckedMetrics = new Set(checkedMetrics);

    if (checkedMetrics.has(metric)) {
      newCheckedMetrics.delete(metric);
    } else {
      newCheckedMetrics.add(metric);
    }

    setSelectedMetrics(newCheckedMetrics);
  }

  function toggleSidepane() {
    setIsOpened(!isOpened);
    setPhase(Phase.IDLE);
  }

  function onMergeClick() {
    setPhase(Phase.MAPVIEW);
  }

  function onMergeConfirmClick() {
    if (checkedMetrics.size > 1) {
      const metric = buildMergedMetric([...checkedMetrics]);

      if (checkIfWasNotMerged(metric.key, mergedMetrics)) {
        widget.metrics = [...widget.metrics, metric];
        setMergedMetrics([...mergedMetrics, metric]);
      }
    }

    setPhase(Phase.IDLE);
    setSelectedMetrics(DEFAULT_CHECKED_METRICS);
    props.rerenderWidgets();
  }

  function onUnmergeClick(metric) {
    const metricFilter = m => m !== metric;

    widget.metrics = widget.metrics.filter(metricFilter);
    setMergedMetrics(mergedMetrics.filter(metricFilter));
    props.rerenderWidgets();
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Chart, _extends({}, props, {
    widget: widget,
    settings: settings,
    TopLeftComponent: Title
  })), isOpened ? /*#__PURE__*/React.createElement(Sidepanel, {
    className: styles.sidepanel,
    contentClassName: styles.sidepanel__content,
    header: sidepanelHeader || /*#__PURE__*/React.createElement(HoldersDistributionTitle, {
      ticker: settings.ticker,
      description: "by number of addresses"
    }),
    chartSidepane: TOP_HOLDERS_PANE,
    currentPhase: currentPhase,
    metrics: widget.metrics,
    mergedMetrics: mergedMetrics,
    checkedMetrics: checkedMetrics,
    MetricColor: MetricColor,
    TabMetrics: TabMetrics,
    isWithTabs: isWithTabs,
    onChangeLabels: onChangeLabels ? labels => onChangeLabels(labels, mergedMetrics) : undefined,
    toggleMetric: toggleWidgetMetric,
    toggleChartSidepane: toggleSidepane,
    onMergeClick: onMergeClick,
    onMergeConfirmClick: onMergeConfirmClick,
    onUnmergeClick: onUnmergeClick
  }) : /*#__PURE__*/React.createElement(CloseButton, {
    onClick: toggleSidepane,
    className: styles.toggle
  }));
};

const HolderDistributionWidget = props => {
  const [isOpened, setIsOpened] = useState(true);
  const {
    isRendered,
    onLoad
  } = useRenderQueueItem();
  return /*#__PURE__*/React.createElement(Widget, {
    className: cx(styles.holders, isOpened && styles.holders_opened)
  }, isRendered ? /*#__PURE__*/React.createElement(HolderDistribution, _extends({}, props, {
    isOpened: isOpened,
    setIsOpened: setIsOpened,
    onLoad: onLoad
  })) : null);
};

export const holderDistributionBuilder = (widget, metrics) => props => ChartWidget.new(_objectSpread({
  mergedMetrics: [],
  metrics
}, props), widget);
HolderDistributionWidget.new = holderDistributionBuilder(HolderDistributionWidget, HOLDER_DISTRIBUTION_ABSOLUTE_METRICS);
export default HolderDistributionWidget;
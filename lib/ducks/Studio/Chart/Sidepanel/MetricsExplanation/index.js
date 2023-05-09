const _excluded = ["metrics", "MetricColor", "onClose", "project"],
      _excluded2 = ["onClick"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import Dropdown from '@santiment-network/ui/Dropdown';
import Explanations, { Explanation } from './Explanations';
import DataInfo from './DataInfo';
import { METRICS_EXPLANATION_PANE } from '../panes';
import MetricInsights from '../../../../../components/MetricInsight/MetricInsights';
import MetricIcon from '../../../../SANCharts/MetricIcon';
import { Description } from '../../../../dataHub/metrics/descriptions';
import { Insights } from '../../../../dataHub/metrics/insights';
import Frequences from '../../../../dataHub/metrics/frequences';
import MetricFrequence from '../../../../SANCharts/MetricFrequence/MetricFrequence';
import MetricDescription from '../../../../SANCharts/MetricDescription/MetricDescription';
import { getMetricLabel } from '../../../../dataHub/metrics/labels';
import styles from './index.module.css';
const OPTIONS = [];
const SELECTED = '';
const dropdownClasses = {
  wrapper: styles.dropdown
};
export function filterExplainableMetrics(metrics) {
  return metrics.filter(({
    key
  }) => Description[key] || Insights[key] || Explanation[key] || Frequences[key]);
}

function dedupMetrics(metrics) {
  const dups = new Set();
  return metrics.filter(({
    key
  }) => {
    const description = Description[key];
    return dups.has(description) ? false : dups.add(description);
  });
}

function buildOptions(metrics, colors) {
  return dedupMetrics(filterExplainableMetrics(metrics)).map(metric => ({
    index: metric.key,
    content: /*#__PURE__*/React.createElement(Label, {
      metric: metric,
      colors: colors
    }),
    metric
  }));
}

const Label = ({
  metric,
  colors
}) => {
  const {
    key,
    dataKey = key,
    node
  } = metric;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, /*#__PURE__*/React.createElement(MetricIcon, {
    node: node,
    color: colors[dataKey],
    className: styles.icon
  }), getMetricLabel(metric));
};

const MetricsExplanation = _ref => {
  let {
    metrics,
    MetricColor,
    onClose,
    project
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [options, setOptions] = useState(OPTIONS);
  const [selected, setSelected] = useState(SELECTED);
  useEffect(() => {
    const newOptions = buildOptions(metrics, MetricColor);
    const newSelected = newOptions[0];
    setOptions(newOptions);
    setSelected(newSelected);
  }, [metrics]);
  const {
    metric
  } = selected || {};
  if (!metric) return null;
  const {
    key
  } = metric;
  const description = Description[key];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dropdown, {
    selected: selected,
    options: options,
    classes: dropdownClasses,
    onSelect: setSelected
  }), /*#__PURE__*/React.createElement(DataInfo, _extends({}, rest, {
    metric: metric,
    slug: project.slug
  })), description && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.subtitle
  }, "Description"), /*#__PURE__*/React.createElement("div", {
    className: styles.text
  }, /*#__PURE__*/React.createElement(MetricDescription, {
    metric: metric,
    project: project
  }))), /*#__PURE__*/React.createElement(MetricFrequence, {
    metric: metric
  }), /*#__PURE__*/React.createElement(Explanations, _extends({}, rest, {
    metric: metric
  })), /*#__PURE__*/React.createElement(MetricInsights, {
    insights: Insights[key]
  }));
};

export const MetricsExplanationContainer = props => /*#__PURE__*/React.createElement("div", {
  className: styles.container
}, /*#__PURE__*/React.createElement("div", {
  className: "txt-m mrg-l mrg--b"
}, "Metric Explanations"), /*#__PURE__*/React.createElement(MetricsExplanation, props));

MetricsExplanation.Title = () => 'Metric Explanations';

MetricsExplanation.Button = _ref2 => {
  let {
    onClick
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement(Button, _extends({
    border: true
  }, props, {
    onClick: () => onClick(METRICS_EXPLANATION_PANE)
  }), /*#__PURE__*/React.createElement(Icon, {
    type: "academy",
    className: styles.info
  }), "Explain metrics");
};

MetricsExplanation.defaultProps = {
  MetricColor: {}
};
export default MetricsExplanation;
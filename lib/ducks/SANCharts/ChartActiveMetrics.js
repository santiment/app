import React from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Label from '@santiment-network/ui/Label';
import Button from '@santiment-network/ui/Button';
import MetricExplanation from './MetricExplanation';
import MetricIcon from './MetricIcon';
import { METRIC_COLORS } from './utils';
import styles from './ChartActiveMetrics.module.css';

const ChartActiveMetrics = ({
  activeEvents,
  activeMetrics,
  alwaysShowingMetrics = [],
  toggleMetric,
  isWideChart
}) => {
  let newColorId = 0;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: cx(styles.wrapper, isWideChart && styles.wideChart)
  }, activeMetrics.map(metric => {
    const {
      node,
      color,
      label
    } = metric;
    const isAlwaysShowing = alwaysShowingMetrics.includes(metric.key);
    return /*#__PURE__*/React.createElement(MetricExplanation, {
      key: label,
      metric: metric,
      withChildren: true
    }, /*#__PURE__*/React.createElement(Button, {
      border: true,
      className: styles.btn
    }, /*#__PURE__*/React.createElement(MetricIcon, {
      node: node,
      color: `var(--${color || METRIC_COLORS[newColorId++]})`,
      className: styles.label
    }), label, !isAlwaysShowing && /*#__PURE__*/React.createElement(Icon, {
      type: "close-small",
      className: styles.icon,
      onClick: () => toggleMetric(metric)
    })));
  }), activeEvents.map(event => {
    const {
      label
    } = event;
    return /*#__PURE__*/React.createElement(MetricExplanation, {
      key: label,
      metric: event,
      withChildren: true
    }, /*#__PURE__*/React.createElement(Button, {
      border: true,
      className: styles.btn
    }, /*#__PURE__*/React.createElement(Label, {
      className: styles.label,
      variant: "circle",
      accent: "persimmon"
    }), label, /*#__PURE__*/React.createElement(Icon, {
      type: "close-small",
      className: styles.icon,
      onClick: () => toggleMetric(event)
    })));
  })), /*#__PURE__*/React.createElement(Button, {
    border: true,
    as: "a",
    accent: "positive",
    href: "https://forms.gle/Suz8FVDsKtFiKhBs9",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      padding: '0 16px',
      marginLeft: '20px'
    }
  }, "Feedback"));
};

export default ChartActiveMetrics;
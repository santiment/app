function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef } from 'react';
import cx from 'classnames';
import UniswapChart from './Chart';
import { ProLabel } from '../ProLabel';
import HelpPopup from '../../components/HelpPopup/HelpPopup';
import { Metric } from '../../ducks/dataHub/metrics';
import { useSyncDateObserver, useSyncDateEffect } from '../../ducks/Chart/sync';
import styles from './index.module.css';

const Widget = ({
  title,
  description,
  children,
  showPro = false
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.item
}, /*#__PURE__*/React.createElement("h3", {
  className: styles.subheading
}, title, description && /*#__PURE__*/React.createElement(HelpPopup, {
  triggerClassName: styles.help,
  content: description
}), showPro && /*#__PURE__*/React.createElement(ProLabel, {
  className: styles.pro
})), children);

export const ChartWidget = ({
  metrics,
  syncDate,
  observeSyncDate,
  height
}) => {
  const chartRef = useRef(null);
  useSyncDateEffect(chartRef, observeSyncDate);
  return /*#__PURE__*/React.createElement(Widget, {
    title: metrics[0].label,
    description: metrics[0].description
  }, /*#__PURE__*/React.createElement(UniswapChart, {
    chartRef: chartRef,
    metrics: metrics,
    syncTooltips: syncDate,
    height: height
  }));
};

const ClaimersWidgets = ({
  className
}) => {
  const props = useSyncDateObserver();
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement(ChartWidget, _extends({}, props, {
    metrics: [Metric.uniswap_claims_amount]
  })), /*#__PURE__*/React.createElement(ChartWidget, _extends({}, props, {
    metrics: [Metric.uniswap_user_claims_amount]
  })), /*#__PURE__*/React.createElement(ChartWidget, _extends({}, props, {
    metrics: [Metric.uniswap_lp_claims_amount]
  })), /*#__PURE__*/React.createElement(ChartWidget, _extends({}, props, {
    metrics: [Metric.uniswap_claims_count]
  })), /*#__PURE__*/React.createElement(ChartWidget, _extends({}, props, {
    metrics: [Metric.uniswap_user_claims_count]
  })), /*#__PURE__*/React.createElement(ChartWidget, _extends({}, props, {
    metrics: [Metric.uniswap_lp_claims_count]
  })));
};

export default ClaimersWidgets;
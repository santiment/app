import React, { useState } from 'react';
import MetricIcons from '../metricTypes/MetricIcons';
import HelpPopup from '../../../../../../components/HelpPopup/HelpPopup';
import metricStyles from '../metricTypes/TriggerFormMetricTypes.module.css';

const MetricTypeRenderer = ({
  metric = {},
  onClick,
  showLabel = true
}) => {
  const {
    label,
    description
  } = metric;
  const [isHovered, setHovered] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onClick(metric),
    className: metricStyles.metric,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: metricStyles.iconBlock
  }, /*#__PURE__*/React.createElement(MetricIcons, {
    metric: metric,
    isActive: isHovered
  })), /*#__PURE__*/React.createElement("div", {
    className: metricStyles.textBlocks
  }, /*#__PURE__*/React.createElement("div", {
    className: metricStyles.texts
  }, /*#__PURE__*/React.createElement("div", {
    className: metricStyles.type
  }, label), !showLabel && /*#__PURE__*/React.createElement(HelpPopup, {
    on: "hover"
  }, description)), showLabel && /*#__PURE__*/React.createElement("div", {
    className: metricStyles.label
  }, "Change alert type")));
};

export default MetricTypeRenderer;
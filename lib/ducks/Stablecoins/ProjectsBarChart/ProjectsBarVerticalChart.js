function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import cx from 'classnames';
import { CartesianGrid, ComposedChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { SanWatermark } from './resources';
import { getProjectsMarkup, renderVerticalLabel, VerticalCategoryTick } from './utils';
import styles from './ProjectsBarChart.module.css';
const DESKTOP_MARGIN = {
  top: 20,
  right: 34,
  left: 44,
  bottom: 0
};
const MOBILE_MARGIN = {
  top: 0,
  right: 56,
  left: 44,
  bottom: 0
};

const ProjectsBarVerticalChart = ({
  isDesktop,
  data,
  dataKey = 'value',
  onProjectClick,
  MetricColor,
  settings: {
    valueFormatter = v => v
  } = {}
}) => {
  const markup = getProjectsMarkup({
    MetricColor,
    data,
    dataKey,
    onProjectClick,
    radius: [0, 8, 8, 0],
    labelRenderer: renderVerticalLabel,
    barSize: 40,
    maxBarSize: 40,
    isDesktop
  });
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.chart, styles.verticalChart),
    style: {
      height: `${data.length * 40}px`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.watermark
  }, SanWatermark), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(ComposedChart, {
    cursor: "pointer",
    data: data,
    layout: "vertical",
    margin: isDesktop ? DESKTOP_MARGIN : MOBILE_MARGIN
  }, isDesktop && /*#__PURE__*/React.createElement(CartesianGrid, {
    horizontal: false,
    stroke: "var(--porcelain)"
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    dataKey: dataKey,
    fontSize: 10,
    fontWeight: 500,
    stroke: 'var(--casper)',
    tickCount: 12,
    minTickGap: 8,
    interval: 0,
    domain: ['auto', 'auto'],
    tickLine: false,
    axisLine: isDesktop,
    height: 40,
    textAnchor: "end",
    verticalAnchor: "end",
    tickFormatter: valueFormatter
  }), /*#__PURE__*/React.createElement(YAxis, {
    dataKey: "slug",
    type: "category",
    domain: ['auto', 'auto'],
    tickLine: false,
    axisLine: isDesktop,
    textAnchor: "end",
    verticalAnchor: "end",
    onClick: onProjectClick,
    tick: props => /*#__PURE__*/React.createElement(VerticalCategoryTick, _extends({}, props, {
      data: data
    }))
  }), markup)));
};

export default ProjectsBarVerticalChart;
import React, { useMemo } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, ReferenceDot } from 'recharts';
import cx from 'classnames';
import Gradients from '../../../components/Gradients';
import { generateMetricsMarkup } from '../../SANCharts/utils';
import CustomTooltip from './../../SANCharts/CustomTooltip';
import { useChartColors } from '../../Chart/colors';
import { ActiveDot } from '../../SANCharts/tooltip/ActiveLine';
import chartStyles from './../../SANCharts/Chart.module.css';
import sharedStyles from './../../SANCharts/ChartPage.module.css';
import styles from './preview/SignalPreview.module.css';
export function GetReferenceDots(signals, yAxisId) {
  return signals.map(({
    date,
    yCoord
  }, idx) => /*#__PURE__*/React.createElement(ReferenceDot, {
    x: date,
    y: yCoord,
    yAxisId: yAxisId,
    key: idx,
    ifOverflow: "extendDomain",
    r: 3,
    isFront: true,
    stroke: "var(--white)",
    strokeWidth: "2px",
    fill: "var(--persimmon)"
  }));
}

const RenderChart = ({
  data,
  dataKeys: {
    key,
    dataKey = key
  },
  markup,
  referenceDots,
  classes,
  gradientParams = {},
  height,
  hideTooltip
}) => {
  return /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: height
  }, /*#__PURE__*/React.createElement(ComposedChart, {
    data: data,
    margin: {
      left: 0,
      right: 0,
      top: 16
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement(Gradients, gradientParams)), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "datetime",
    type: "number",
    scale: "time",
    tick: false,
    allowDataOverflow: true,
    domain: ['dataMin', 'dataMax'],
    hide: true
  }), /*#__PURE__*/React.createElement(YAxis, {
    hide: true,
    domain: ['auto', 'dataMax'],
    dataKey: dataKey,
    interval: "preserveStartEnd"
  }), markup, referenceDots, !hideTooltip && /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(CustomTooltip, {
      classes: classes
    }),
    cursor: false,
    position: {
      x: 12,
      y: -22
    },
    isAnimationActive: false
  })));
};

const VisualBacktestChart = ({
  triggeredSignals,
  metrics,
  label,
  data,
  dataKeys,
  referenceDots,
  showTitle,
  height = 120,
  classes = {},
  metricsColor,
  activeDotColor,
  gradientParams = {},
  activeEl = ActiveDot,
  hideTooltip
}) => {
  const colors = useChartColors(metrics, metricsColor);
  const markup = useMemo(() => generateMetricsMarkup(metrics, {
    syncedColors: colors,
    activeDotEl: activeEl,
    hideYAxis: true,
    activeDotColor
  }), [metrics, colors, activeEl]);
  const titleEnabled = showTitle && triggeredSignals && triggeredSignals.length > 0;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.preview
  }, titleEnabled && /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.fired
  }, "Alert was fired:"), /*#__PURE__*/React.createElement("span", {
    className: styles.times
  }, triggeredSignals.length, " times in ", label)), data.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: styles.chartBlock
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(chartStyles.wrapper, sharedStyles.chart, styles.wrapper, !titleEnabled && styles.noTitle)
  }, /*#__PURE__*/React.createElement(RenderChart, {
    data: data,
    dataKeys: dataKeys,
    markup: markup,
    referenceDots: referenceDots,
    classes: classes,
    gradientParams: gradientParams,
    height: height,
    hideTooltip: hideTooltip
  })))) : /*#__PURE__*/React.createElement("div", null, "No data"));
};

export default VisualBacktestChart;
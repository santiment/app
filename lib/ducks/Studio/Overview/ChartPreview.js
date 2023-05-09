import React, { useRef, useEffect, useState } from 'react';
import cx from 'classnames';
import { initChart } from '@santiment-network/chart';
import { useWidgetMessageEffect } from '../widgetMessage';
import { Phase } from '../phases';
import { clearCtx } from '../../Chart/utils';
import ActiveMetrics from '../Chart/ActiveMetrics';
import styles from './Overview.module.css';
const loadings = [];

const ChartPreview = ({
  widget,
  selectedMetrics,
  currentPhase,
  onClick
}) => {
  let [chart, setChart] = useState();
  const canvasRef = useRef(null);
  const {
    metrics,
    comparedMetrics,
    isBlocked
  } = widget;
  useEffect(() => {
    const {
      current: canvas
    } = canvasRef;
    chart = initChart(canvas, canvas.clientWidth, canvas.clientHeight);
    setChart(chart);
    drawChart();
  }, []);
  useWidgetMessageEffect(widget, drawChart);

  function drawChart() {
    const {
      current: widgetChart
    } = widget.chartRef;
    if (!widgetChart || !chart) return;
    clearCtx(chart);
    chart.ctx.drawImage(widgetChart.canvas, 0, 0, chart.canvasWidth, chart.canvasHeight + 25);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.item, styles[currentPhase], currentPhase === Phase.MAPVIEW_SELECTION && isBlocked && styles.block),
    onClick: () => onClick(widget)
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.metrics, currentPhase === Phase.MAPVIEW_SELECTION && styles.metrics_visible, isBlocked && styles.metrics_blocked)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.metrics__list
  }, isBlocked ? "New metrics can't be added to this widget" : /*#__PURE__*/React.createElement(ActiveMetrics, {
    className: styles.metric,
    activeMetrics: metrics.concat(comparedMetrics),
    loadings: loadings,
    MetricColor: widget.MetricColor
  }))));
};

export default ChartPreview;
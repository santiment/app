function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, useEffect } from 'react';
import { initChart, updateChartDimensions, updateSize } from '@santiment-network/chart';
import { withChartContext, useChart, useChartSetter } from './context';
import { paintConfigs } from './paintConfigs';
import { useTheme } from '../../stores/ui/theme';
import styles from './index.module.css';

const cx = (...classes) => classes.filter(Boolean).join(' ');

export const Chart = ({
  className,
  width,
  height,
  padding,
  chartRef,
  children
}) => {
  const chart = useChart();
  const setChart = useChartSetter();
  const canvasRef = useRef(null);
  const {
    isNightMode
  } = useTheme();
  useEffect(() => {
    const {
      current: canvas
    } = canvasRef;

    const _width = width || canvas.parentNode.offsetWidth;

    const _height = height || canvas.parentNode.offsetHeight;

    const chart = initChart(canvas, _width, _height, padding);
    setChart(chart);

    if (chartRef) {
      chartRef.current = chart;
    }
  }, []);
  useEffect(() => {
    if (chart) {
      _extends(chart, paintConfigs[+isNightMode]);

      chart.redraw();
    }
  }, [chart, isNightMode]);
  useEffect(() => {
    if (!chart) return;
    const {
      tooltip,
      brush,
      drawer,
      canvasWidth,
      canvasHeight
    } = chart;

    const _width = width || canvasWidth;

    const _height = height || canvasHeight;

    updateChartDimensions(chart, _width, _height, padding);

    if (tooltip) {
      updateSize(tooltip.canvas, tooltip.ctx, chart.dpr, _width, _height);
    }

    if (brush) {
      brush.updateWidth(_width);
    }

    if (drawer) {
      updateSize(drawer.canvas, drawer.ctx, chart.dpr, _width, _height);
      drawer.redraw();
    }

    chart.redraw();
  }, [chart, width, height, padding]);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className)
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef
  }), chart && children);
};
export default withChartContext(Chart);
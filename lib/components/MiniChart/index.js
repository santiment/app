import React, { useMemo } from 'react';
import cx from 'classnames';
import styles from './index.module.css';

const MiniChart = ({
  className,
  data,
  valueKey,
  change,
  width,
  height,
  gradientId,
  gradientColor,
  gradientOpacity
}) => {
  const [linePoints, areaPoints] = useMemo(() => {
    const dataLength = data.length;
    if (!dataLength) return '';
    let min = data[0][valueKey];
    let max = data[0][valueKey];
    data.forEach(item => {
      const value = item[valueKey];

      if (value < min) {
        min = value;
      }

      if (value > max) {
        max = value;
      }
    });

    if (min === max) {
      min = 0;
    }

    const xAxisFactor = width / (dataLength - 1);
    const yAxisFactor = height / (max - min);
    const points = data.map((item, index) => `${index * xAxisFactor},${(max - item[valueKey]) * yAxisFactor}`);
    const [startX, startY] = points[0].split(',');
    const [lastX] = points[dataLength - 1].split(',');
    const linePoints = points.join(' ');
    return [linePoints, `${linePoints} ${lastX},${height} ${startX},${height}, ${startX},${startY}`];
  }, [data]);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    height: height,
    className: cx(styles.chart, change > 0 && styles.chart_positive, className)
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gradientId,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "2"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: `var(--${gradientColor})`,
    stopOpacity: gradientOpacity
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "var(--white)",
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "positive-change",
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "2"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--lima)",
    stopOpacity: "0.3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "var(--white)",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("polyline", {
    points: linePoints,
    className: styles.line
  }), /*#__PURE__*/React.createElement("polyline", {
    points: areaPoints,
    className: styles.area
  }));
};

MiniChart.defaultProps = {
  data: [],
  width: 72,
  height: 32,
  gradientId: 'negative-change',
  gradientColor: 'persimmon',
  gradientOpacity: '0.3'
};
export default MiniChart;
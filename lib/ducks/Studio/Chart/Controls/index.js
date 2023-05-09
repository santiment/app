import React, { useEffect } from 'react';
import Button from './Button';
import LineActions from './LineActions';
import { CursorType } from '../../../Chart/cursor';
import styles from './index.module.css';

const CursorControl = ({
  cursorType,
  toggleCursorType
}) => /*#__PURE__*/React.createElement(Button, {
  stroke: true,
  isActive: cursorType === CursorType.FREE,
  onClick: toggleCursorType
}, /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  stroke: "none",
  d: "M.5 8.5h6v1h-6zM11.5 8.5h6v1h-6zM9.5.5v6h-1v-6zM9.5 11.5v6h-1v-6z"
})));

const LineDrawControl = ({
  isNewDrawingState
}) => {
  const [isNewDrawing, setIsNewDrawing] = isNewDrawingState;
  return /*#__PURE__*/React.createElement(Button, {
    stroke: true,
    isActive: isNewDrawing,
    onClick: () => setIsNewDrawing(!isNewDrawing),
    className: styles.drawing
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    stroke: "none",
    d: "M4.4 12.9l8.5-8.6.7.7-8.5 8.6z"
  }), /*#__PURE__*/React.createElement("circle", {
    fill: "none",
    cx: "3",
    cy: "15",
    r: "2.5"
  }), /*#__PURE__*/React.createElement("circle", {
    fill: "none",
    cx: "15",
    cy: "3",
    r: "2.5"
  })));
};

const Controls = ({
  chartRef,
  chartCursor,
  selectedLineState,
  isDrawingState,
  isNewDrawingState,
  rerenderWidgets
}) => {
  useEffect(rerenderWidgets, [isDrawingState[0]]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(CursorControl, chartCursor), /*#__PURE__*/React.createElement(LineDrawControl, {
    isNewDrawingState: isNewDrawingState
  }), selectedLineState[0] && /*#__PURE__*/React.createElement(LineActions, {
    chartRef: chartRef,
    selectedLineState: selectedLineState
  }));
};

export default Controls;
import React from 'react';
export const ActiveDot = ({
  cy,
  cx,
  activeDotColor = 'var(--jungle-green-hover)'
}) => {
  return cy !== null ? /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: 4,
    strokeWidth: "2px",
    stroke: activeDotColor,
    fill: "var(--white)"
  }) : null;
};

const ActiveLine = ({
  cy
}) => {
  return cy !== null ? /*#__PURE__*/React.createElement("line", {
    y1: cy,
    y2: cy,
    x1: "0",
    x2: "100%",
    stroke: "var(--casper)"
  }) : null;
};

export default ActiveLine;
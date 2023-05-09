import React from 'react';

const Gradients = ({
  downColor = 'var(--persimmon)',
  upColor = 'var(--lima)',
  verticalLineColor = 'var(--persimmon)'
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("linearGradient", {
  id: "totalDown",
  x1: "0",
  x2: "0",
  y1: "0",
  y2: "1"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "5%",
  stopColor: downColor,
  stopOpacity: 0.3
}), /*#__PURE__*/React.createElement("stop", {
  offset: "95%",
  stopColor: "#fff",
  stopOpacity: 0
})), /*#__PURE__*/React.createElement("linearGradient", {
  id: "totalUp",
  x1: "0",
  x2: "0",
  y1: "0",
  y2: "1"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "5%",
  stopColor: upColor,
  stopOpacity: 0.3
}), /*#__PURE__*/React.createElement("stop", {
  offset: "95%",
  stopColor: "#fff",
  stopOpacity: 0
})), /*#__PURE__*/React.createElement("linearGradient", {
  id: "lineGradient",
  x1: "0",
  x2: "0",
  y1: "0",
  y2: "1"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "0%",
  stopColor: verticalLineColor,
  stopOpacity: "0"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "40%",
  stopColor: verticalLineColor
}), /*#__PURE__*/React.createElement("stop", {
  offset: "60%",
  stopColor: verticalLineColor
}), /*#__PURE__*/React.createElement("stop", {
  offset: "100%",
  stopColor: verticalLineColor,
  stopOpacity: "0"
})));

export default Gradients;
import React from 'react';
import Tabs from '@santiment-network/ui/Tabs';
import styles from './index.module.css';
const TABS = [{
  index: 'and',
  content: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "16",
    viewBox: "0 0 18 16"
  }, /*#__PURE__*/React.createElement("path", {
    className: styles.combinatorFill,
    d: "M6.5 12a6 6 0 005.67-7.96A6.06 6.06 0 006.5 12z"
  }), /*#__PURE__*/React.createElement("path", {
    className: styles.combinatorStroke,
    d: "M5.57 10.91a6 6 0 015.52-6.9 5 5 0 10-5.52 6.9zm.26 1.05a6 6 0 116.34-7.92 6 6 0 11-6.34 7.92zM6.9 12a5 5 0 105.52-6.9 6 6 0 01-5.52 6.9zM11.4 5a5 5 0 00-4.8 6 5 5 0 004.8-6z"
  })), "All")
}, {
  index: 'or',
  content: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "16",
    viewBox: "0 0 18 16"
  }, /*#__PURE__*/React.createElement("g", {
    className: styles.combinatorFill
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12.5 6a6 6 0 11-12 0 6 6 0 0112 0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17.5 10a6 6 0 11-12 0 6 6 0 0112 0z"
  })), /*#__PURE__*/React.createElement("g", {
    className: styles.combinatorStroke,
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.5 11a5 5 0 100-10 5 5 0 000 10zm0 1a6 6 0 100-12 6 6 0 000 12z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 15a5 5 0 100-10 5 5 0 000 10zm0 1a6 6 0 100-12 6 6 0 000 12z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 11a5 5 0 100-10 5 5 0 000 10zm0 1a6 6 0 100-12 6 6 0 000 12z"
  }))), "Any")
}];

const Combinators = ({
  onSelect,
  isANDCombinator
}) => /*#__PURE__*/React.createElement(Tabs, {
  className: styles.tabs,
  options: TABS,
  defaultSelectedIndex: isANDCombinator ? TABS[0].index : TABS[1].index,
  onSelect: onSelect,
  classes: styles
});

export default Combinators;
const _excluded = ["className", "isChecked"],
      _excluded2 = ["className", "metric", "color", "isActive", "onClick", "onUnmerge"],
      _excluded3 = ["metric", "isChecked", "onClick"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import cx from 'classnames';
import UIButton from '@santiment-network/ui/Button';
import { Checkbox } from '@santiment-network/ui/Checkboxes';
import Tabs, { Tab, TabMetrics } from './Tabs';
import MetricIcon from '../../../../SANCharts/MetricIcon';
import styles from './index.module.css';
import LabelsSelector from '../../../../../components/LabelsSelector/LabelsSelector';

const Icon = props => /*#__PURE__*/React.createElement("svg", _extends({}, props, {
  width: "18",
  height: "14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}), /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M14.93 4.66a.57.57 0 00-.79 0l-1.98 1.95a.55.55 0 000 .78l1.98 1.95c.22.21.57.21.8 0a.55.55 0 000-.78l-1.03-1h3.53c.31 0 .56-.26.56-.56 0-.3-.25-.55-.56-.55h-3.53l1.02-1a.55.55 0 000-.79zM3.07 9.34c.22.21.57.21.79 0l1.98-1.95a.55.55 0 000-.78L3.86 4.66a.57.57 0 00-.8 0 .55.55 0 000 .78l1.03 1H.56C.25 6.45 0 6.7 0 7c0 .3.25.55.56.55h3.53l-1.02 1a.55.55 0 000 .79z",
  fill: "#7A859E"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8.5.5a.5.5 0 011 0v13a.5.5 0 01-1 0V.5z",
  fill: "#7A859E"
}), /*#__PURE__*/React.createElement("path", {
  d: "M1.5 1a.5.5 0 010-1h15a.5.5 0 010 1h-15zM1.5 14a.5.5 0 010-1h15a.5.5 0 010 1h-15z",
  fill: "#7A859E"
}));

const Button = _ref => {
  let {
    className,
    isChecked
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(UIButton, _extends({
    fluid: true,
    className: cx(styles.btn, className)
  }, props));
};

const ToggleButton = _ref2 => {
  let {
    className,
    metric,
    color,
    isActive,
    onClick,
    onUnmerge
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/React.createElement(Button, _extends({
    className: cx(styles.toggle, className, isActive && styles.active),
    onClick: () => onClick(metric)
  }, props), /*#__PURE__*/React.createElement(MetricIcon, {
    node: "line",
    color: color,
    className: styles.icon
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.label
  }, metric.label, onUnmerge && /*#__PURE__*/React.createElement("span", {
    className: styles.unmerge,
    onClick: e => {
      e.stopPropagation();
      onUnmerge(metric);
    }
  }, "Unmerge")));
};

const CheckboxButton = _ref3 => {
  let {
    metric,
    isChecked,
    onClick
  } = _ref3,
      props = _objectWithoutProperties(_ref3, _excluded3);

  return /*#__PURE__*/React.createElement(Button, _extends({
    className: isChecked && styles.active,
    onClick: () => onClick(metric)
  }, props), /*#__PURE__*/React.createElement(Checkbox, {
    className: styles.checkbox,
    isActive: isChecked
  }), metric.label);
};

const Merge = ({
  onClick
}) => /*#__PURE__*/React.createElement(UIButton, {
  border: true,
  className: styles.merge,
  onClick: onClick
}, /*#__PURE__*/React.createElement(Icon, {
  className: styles.icon
}), "Merge");

const Confirm = ({
  checkedMetrics,
  onClick
}) => {
  const isMergeable = checkedMetrics.size > 1;
  return /*#__PURE__*/React.createElement(UIButton, {
    border: true,
    className: cx(styles.merge, isMergeable ? styles.confirm : styles.cancel),
    onClick: onClick
  }, isMergeable ? 'Confirm' : 'Cancel');
};

const HolderDistribution = ({
  header,
  metrics,
  mergedMetrics,
  checkedMetrics,
  MetricColor,
  TabMetrics,
  toggleMetric,
  currentPhase,
  isWithTabs,
  onChangeLabels,
  onMergeClick,
  onMergeConfirmClick,
  onUnmergeClick
}) => {
  const [activeTab, setActiveTab] = useState(Tab.PERCENTS);
  const isIdlePhase = currentPhase === 'idle';
  const MetricButton = isIdlePhase ? ToggleButton : CheckboxButton;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.top
  }, header, isIdlePhase ? /*#__PURE__*/React.createElement(Merge, {
    onClick: onMergeClick
  }) : /*#__PURE__*/React.createElement(Confirm, {
    checkedMetrics: checkedMetrics,
    onClick: onMergeConfirmClick
  })), isWithTabs && /*#__PURE__*/React.createElement(Tabs, {
    activeTab: activeTab,
    isIdlePhase: isIdlePhase,
    setActiveTab: setActiveTab
  }), onChangeLabels && /*#__PURE__*/React.createElement(LabelsSelector, {
    onChange: onChangeLabels
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.metrics
  }, isIdlePhase && mergedMetrics.map(metric => {
    const {
      key
    } = metric;
    return /*#__PURE__*/React.createElement(MetricButton, {
      key: key,
      metric: metric,
      color: MetricColor[key],
      isActive: metrics.includes(metric),
      onClick: toggleMetric,
      onUnmerge: onUnmergeClick
    });
  }), TabMetrics[activeTab].map(metric => {
    const {
      key
    } = metric;
    return /*#__PURE__*/React.createElement(MetricButton, {
      key: key,
      metric: metric,
      color: MetricColor[key],
      isActive: metrics.includes(metric),
      isChecked: checkedMetrics && checkedMetrics.has(metric),
      onClick: toggleMetric
    });
  })));
};

HolderDistribution.defaultProps = {
  TabMetrics,
  mergedMetrics: [],
  currentPhase: 'idle',
  header: 'Supply Distribution'
};
export default HolderDistribution;
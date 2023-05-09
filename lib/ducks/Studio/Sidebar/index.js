const _excluded = ["activeTab", "project", "ProjectMetrics", "setActiveTab", "onProjectSelect"],
      _excluded2 = ["children", "hiddenMetrics", "noMarketSegments", "isPeeked", "isLocked", "isOverviewOpened", "setIsPeeked", "setIsLocked"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Tabs from '@santiment-network/ui/Tabs';
import Icon from '@santiment-network/ui/Icon';
import { saveIsSidebarLocked } from './utils';
import ProjectSelector from './ProjectSelector';
import MetricSelector from './MetricSelector';
import InsightAlertSelector from './InsightAlertSelector';
import Search from './Search';
import { HOLDER_DISTRIBUTION_NODE, HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE, HOLDER_LABELED_DISTRIBUTION_NODE } from './nodes';
import { useProjectMetrics } from '../withMetrics';
import styles from './index.module.css';
const TRANSITION_CLASSES = {
  enter: cx(styles.wrapper_opened, styles.wrapper_transition),
  enterDone: styles.wrapper_opened,
  exit: styles.wrapper_transition
};
const ON_CHAIN_DEFAULT = [HOLDER_DISTRIBUTION_NODE, HOLDER_DISTRIBUTION_COMBINED_BALANCE_NODE, HOLDER_LABELED_DISTRIBUTION_NODE];
const TABS = ['Metrics', 'Insights'];
const DEFAULT_TAB = TABS[0];
const TabToComponent = {
  [TABS[0]]: MetricSelector,
  [TABS[1]]: InsightAlertSelector
};

const Header = _ref => {
  let {
    activeTab,
    project,
    ProjectMetrics,
    setActiveTab,
    onProjectSelect
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement(Tabs, {
    options: TABS,
    className: styles.tabs,
    classes: styles,
    defaultSelectedIndex: activeTab // NOTE: Not passed as a reference, since more than 1 argument is passed to a callback [@vanguard | Aug  4, 2020]
    ,
    onSelect: tab => setActiveTab(tab)
  }), /*#__PURE__*/React.createElement(ProjectSelector, {
    project: project,
    onProjectSelect: onProjectSelect
  }), /*#__PURE__*/React.createElement(Search, _extends({
    onChainDefault: ON_CHAIN_DEFAULT
  }, props, ProjectMetrics, {
    project: project
  })));
};

const CloseButton = ({
  isLocked,
  onClick,
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.toggle, className),
  onClick: onClick
}, /*#__PURE__*/React.createElement("div", {
  className: styles.close
}, /*#__PURE__*/React.createElement(Icon, {
  type: "sidebar",
  className: styles.icon
})));

const Sidebar = _ref2 => {
  let {
    children,
    hiddenMetrics,
    noMarketSegments,
    isPeeked,
    isLocked,
    isOverviewOpened,
    setIsPeeked,
    setIsLocked
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  const {
    settings
  } = props;
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
  const [metricProject, setMetricProject] = useState(settings);
  const [isDraggingMetric, setIsDraggingMetric] = useState(false);
  const ProjectMetrics = useProjectMetrics(metricProject.slug, hiddenMetrics, noMarketSegments);
  const isOpened = isPeeked || isDraggingMetric;
  const TabComponent = TabToComponent[activeTab];
  useEffect(() => setMetricProject(settings), [settings.slug, settings.name]);
  useEffect(() => saveIsSidebarLocked(isLocked), [isLocked]);
  return /*#__PURE__*/React.createElement(CSSTransition, {
    in: isOpened,
    timeout: 200,
    classNames: TRANSITION_CLASSES
  }, /*#__PURE__*/React.createElement("aside", {
    className: cx(styles.wrapper, isOpened && styles.wrapper_opened, (isLocked || isOverviewOpened) && styles.wrapper_locked),
    onMouseEnter: () => setIsPeeked(true),
    onMouseLeave: () => setIsPeeked(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement(Header, _extends({
    activeTab: activeTab,
    setActiveTab: setActiveTab
  }, props, {
    project: metricProject,
    ProjectMetrics: ProjectMetrics,
    onProjectSelect: setMetricProject
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.selector
  }, /*#__PURE__*/React.createElement(TabComponent, _extends({}, props, ProjectMetrics, {
    project: metricProject,
    setIsDraggingMetric: setIsDraggingMetric
  }))), /*#__PURE__*/React.createElement(CloseButton, {
    isLocked: isLocked,
    onClick: () => setIsLocked(!isLocked)
  }))));
};

export default Sidebar;
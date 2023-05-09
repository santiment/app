const _excluded = ["comparable", "project", "metric", "projects", "colors", "hiddenMetricsMap", "setComparables", "activeSlug"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import ComparableMetric from './Metric';
import { buildCompareKey, getProjectHiddenMetrics, makeComparableObject } from '../utils';
import ProjectSelectDialog from '../ProjectSelectDialog';
import { DEFAULT_TABS } from '../ProjectSelectTabs';
import { FIAT_MARKET_ASSETS } from '../../../dataHub/fiat';
import ProjectIcon from '../../../../components/ProjectIcon/ProjectIcon';
import styles from './index.module.css';
const CUSTOM_CATEGORY = {
  Fiat: () => Promise.resolve(FIAT_MARKET_ASSETS)
};
const CUSTOM_TABS = DEFAULT_TABS.concat(Object.keys(CUSTOM_CATEGORY));
const CategoryModifier = {
  All: assets => assets.concat(FIAT_MARKET_ASSETS)
};
export default (_ref => {
  let {
    comparable,
    project,
    metric,
    projects,
    colors,
    hiddenMetricsMap,
    setComparables,
    activeSlug
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [selectedProject, setSelectedProject] = useState(project || projects[0]);
  const [selectedMetric, setSelectedMetric] = useState(metric);
  const [opened, setOpened] = useState();
  const {
    slug,
    ticker,
    logoUrl
  } = selectedProject || {};
  useEffect(() => {
    if (comparable) {
      comparable.key = buildCompareKey(selectedMetric, selectedProject);
      comparable.metric = selectedMetric;
      comparable.project = selectedProject;
      return setComparables(state => state.slice());
    }

    return selectedMetric && setComparables(state => [...state, makeComparableObject({
      metric: selectedMetric,
      project: selectedProject
    })]);
  }, [selectedProject, selectedMetric]);

  function selectProject(project) {
    setSelectedProject(project);
    closeDialog();
  }

  function removeComparable() {
    setComparables(state => state.filter(comp => comp !== comparable));
  }

  function closeDialog() {
    setOpened(false);
  }

  function openDialog() {
    setOpened(true);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.row
  }, /*#__PURE__*/React.createElement(ProjectSelectDialog, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true
    }, /*#__PURE__*/React.createElement(ProjectIcon, {
      className: styles.icon,
      size: 16,
      slug: slug,
      logoUrl: logoUrl
    }), ticker, /*#__PURE__*/React.createElement(Icon, {
      type: "arrow-down",
      className: styles.arrow
    })),
    open: opened,
    activeSlug: activeSlug,
    projects: projects,
    customTabs: CUSTOM_TABS,
    CustomCategory: CUSTOM_CATEGORY,
    CategoryModifier: CategoryModifier,
    onOpen: openDialog,
    onClose: closeDialog,
    onSelect: selectProject
  }), /*#__PURE__*/React.createElement(ComparableMetric, _extends({}, rest, {
    comparable: comparable,
    slug: slug,
    colors: colors,
    hiddenMetrics: getProjectHiddenMetrics(hiddenMetricsMap, selectedProject),
    onSelect: setSelectedMetric
  })), comparable && /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    className: styles.remove,
    onClick: removeComparable
  }));
});
const _excluded = ["metricsBuilder", "type", "project"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useState, useMemo } from 'react';
import { useProject } from '../../../hooks/project';
import { QueuedDashboardMetricChart as DashboardMetricChart } from '../DashboardMetricChart';
import { DashboardProjectSelector } from '../../../ducks/Stablecoins/StablecoinSelector/ProjectsSelectors';
import styles from './DashboardProjectChart.module.css';
const DEFAULT_PROJECT = {
  slug: 'maker',
  ticker: 'Maker'
};

const DashboardProjectChart = _ref => {
  let {
    metricsBuilder,
    type,
    project: defaultProject = DEFAULT_PROJECT
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [targetProject, setProject] = useState(defaultProject);
  const onChange = useCallback(project => {
    setProject(project);
  }, [setProject]);
  const [project = {}] = useProject(targetProject.slug);
  const metrics = useMemo(() => {
    return metricsBuilder(targetProject);
  }, [metricsBuilder, targetProject]);
  return /*#__PURE__*/React.createElement(DashboardMetricChart, _extends({}, rest, {
    metrics: metrics,
    projectSelector: /*#__PURE__*/React.createElement("div", {
      className: styles.project
    }, /*#__PURE__*/React.createElement(DashboardProjectSelector, {
      type: type,
      setAsset: onChange,
      asset: project,
      triggerProps: {
        size: 20
      },
      classes: styles
    }))
  }));
};

export default DashboardProjectChart;
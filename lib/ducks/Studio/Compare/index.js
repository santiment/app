const _excluded = ["slug", "comparables", "activeMetrics", "className", "MetricColor"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import ContextMenu from '@santiment-network/ui/ContextMenu';
import Panel from '@santiment-network/ui/Panel';
import Comparable from './Comparable';
import { hashComparable, buildHiddenMetrics } from './utils';
import { MAX_METRICS_AMOUNT } from '../constraints';
import { FIAT_MARKET_ASSETS } from '../../dataHub/fiat';
import { useProjects } from '../../../stores/projects';
import styles from './index.module.css';

const Compare = _ref => {
  let {
    slug,
    comparables,
    activeMetrics,
    className,
    MetricColor
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const {
    projects: allProjects
  } = useProjects();
  const [projects, setProjects] = useState(allProjects);
  const canSelectMoreMetrics = activeMetrics.length < MAX_METRICS_AMOUNT;
  const hiddenMetricsMap = buildHiddenMetrics(comparables);
  useEffect(() => {
    setProjects(allProjects.concat(FIAT_MARKET_ASSETS).filter(project => project.slug !== slug));
  }, [allProjects, slug]);
  return /*#__PURE__*/React.createElement(ContextMenu, {
    passOpenStateAs: "isActive",
    position: "bottom",
    align: "end",
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true,
      className: cx(styles.btn, className),
      classes: styles
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "compare",
      className: styles.icon
    }), "Compare")
  }, /*#__PURE__*/React.createElement(Panel, {
    variant: "modal",
    padding: true
  }, /*#__PURE__*/React.createElement("div", null, "Compare with"), comparables.map(comparable => /*#__PURE__*/React.createElement(Comparable, _extends({}, rest, comparable, {
    key: hashComparable(comparable),
    projects: projects,
    comparable: comparable,
    colors: MetricColor,
    hiddenMetricsMap: hiddenMetricsMap,
    activeSlug: slug
  }))), canSelectMoreMetrics ? /*#__PURE__*/React.createElement(Comparable, _extends({}, rest, {
    projects: projects,
    colors: MetricColor,
    hiddenMetricsMap: hiddenMetricsMap,
    activeSlug: slug
  })) : /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, "You have selected the maximum amount of metrics")));
};

export default Compare;
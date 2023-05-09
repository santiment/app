const _excluded = ["title", "groups", "counter", "isActiveFiltersOnly", "isViewMode", "isOpen", "totalCounter"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import FilterMetric from '../Metric';
import { NO_GROUP } from '../../../../Studio/Sidebar/utils';
import styles from './index.module.css';

const Category = _ref => {
  let {
    title,
    groups,
    counter,
    isActiveFiltersOnly,
    isViewMode,
    isOpen,
    totalCounter
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [isCollapsed, setIsCollapsed] = useState(isViewMode && !counter && totalCounter > 0);

  function onToggleClick() {
    setIsCollapsed(!isCollapsed);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.category, isCollapsed && styles.category__collapsed, isActiveFiltersOnly && styles.category__onlyActive)
  }, /*#__PURE__*/React.createElement("h3", {
    className: styles.title,
    onClick: onToggleClick
  }, /*#__PURE__*/React.createElement("div", null, title, !isActiveFiltersOnly && counter > 0 && /*#__PURE__*/React.createElement("span", {
    className: styles.counter
  }, "(", counter, ")")), !isActiveFiltersOnly && /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-right",
    className: styles.toggle
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.metrics
  }, groups && isOpen && Object.keys(groups).map(group => /*#__PURE__*/React.createElement("div", {
    key: group,
    className: styles.group
  }, group !== NO_GROUP && /*#__PURE__*/React.createElement("h3", {
    className: styles.group__title
  }, group), groups[group].map(({
    item: metric
  }) => metric.Widget ? /*#__PURE__*/React.createElement(metric.Widget, _extends({}, rest, {
    key: metric.key,
    baseMetric: metric,
    isViewMode: isViewMode
  })) : /*#__PURE__*/React.createElement(FilterMetric, _extends({}, rest, {
    key: metric.key,
    baseMetric: metric,
    isViewMode: isViewMode
  })))))));
};

export default Category;
const _excluded = ["title", "groups", "project", "NewMetricsCategory", "GroupNode", "children"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Group from './Group';
import styles from './MetricSelector/index.module.css';
const DEFAULT_OPENED_CATEGORY = {
  Favorites: true,
  Financial: true,
  'Santiment Insights': true,
  'Santiment Alerts': true
};

const Category = _ref => {
  let {
    title,
    groups,
    project,
    NewMetricsCategory,
    GroupNode,
    children
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const [hidden, setHidden] = useState(!DEFAULT_OPENED_CATEGORY[title]);

  function onToggleClick() {
    setHidden(!hidden);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.category, hidden && styles.category_hidden)
  }, /*#__PURE__*/React.createElement("h3", {
    className: cx(styles.title, NewMetricsCategory[title] && styles.news),
    onClick: onToggleClick
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-right-small",
    className: styles.toggle
  }), title), /*#__PURE__*/React.createElement("div", {
    className: styles.metrics
  }, Object.keys(groups).map(group => /*#__PURE__*/React.createElement(GroupNode, _extends({
    key: group,
    title: group,
    nodes: groups[group],
    project: project
  }, rest))), children));
};

Category.defaultProps = {
  NewMetricsCategory: {},
  NewMetricsGroup: {},
  NewMetric: {},
  GroupNode: Group
};
export default Category;
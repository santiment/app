const _excluded = ["slug", "categories", "loading", "className"],
      _excluded2 = ["comparable", "slug", "colors", "hiddenMetrics", "onSelect"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useRef } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import withMetrics from '../../withMetrics';
import { getCategoryGraph } from '../../Sidebar/utils';
import Search, { checkMatch, getMetricSuggestions } from '../../Sidebar/Search';
import MetricIcon from '../../../SANCharts/MetricIcon';
import { METRIC } from '../../Sidebar/Button/types';
import styles from './Metric.module.css';
const DEFAULT_COLOR = '#9faac4';
const CustomProjectCategories = {
  gold: getCategoryGraph(['price_usd']),
  's-and-p-500': getCategoryGraph(['price_usd']),
  'crude-oil': getCategoryGraph(['price_usd']),
  dxy: getCategoryGraph(['price_usd'])
};
export const SEARCH_PREDICATE_ONLY_METRICS = searchTerm => {
  const upperCaseSearchTerm = searchTerm ? searchTerm.toUpperCase() : '';
  return ({
    label,
    abbreviation,
    type
  }) => {
    if (type && type !== METRIC) {
      return false;
    }

    return checkMatch(upperCaseSearchTerm, abbreviation, label);
  };
};
const MetricSearch = withMetrics(_ref => {
  let {
    slug,
    categories,
    loading,
    className
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Search, _extends({}, rest, {
    searchPredicate: SEARCH_PREDICATE_ONLY_METRICS,
    className: cx(className, loading && styles.loading),
    categories: CustomProjectCategories[slug] || categories,
    emptySuggestions: getMetricSuggestions(CustomProjectCategories[slug] || categories, SEARCH_PREDICATE_ONLY_METRICS),
    inputProps: {
      placeholder: 'Type to search metrics...'
    }
  }));
});

const Label = ({
  comparable,
  editMetric,
  colors
}) => {
  const {
    node,
    label
  } = comparable.metric;
  const color = colors[comparable.key];
  return /*#__PURE__*/React.createElement("div", {
    className: styles.selected,
    onClick: editMetric
  }, /*#__PURE__*/React.createElement(MetricIcon, {
    node: node,
    color: color || DEFAULT_COLOR,
    className: styles.label
  }), label, /*#__PURE__*/React.createElement(Icon, {
    type: "edit-small",
    className: styles.edit
  }));
};

export default (_ref2 => {
  let {
    comparable,
    slug,
    colors,
    hiddenMetrics,
    onSelect
  } = _ref2,
      rest = _objectWithoutProperties(_ref2, _excluded2);

  const [isEditing, setEditing] = useState();
  const metricSelectorRef = useRef(null);

  function onMetricSelect(metric) {
    if (comparable) {
      stopEditing();
    }

    return onSelect(metric);
  }

  function editMetric() {
    setEditing(true);
    metricSelectorRef.current.firstElementChild.firstElementChild.focus();
  }

  function stopEditing() {
    setEditing();
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.metric,
    ref: metricSelectorRef
  }, /*#__PURE__*/React.createElement(MetricSearch, {
    noMarketSegments: true,
    slug: slug,
    hiddenMetrics: hiddenMetrics,
    toggleMetric: onMetricSelect,
    onBlur: stopEditing
  }), isEditing || comparable && /*#__PURE__*/React.createElement(Label, _extends({}, rest, {
    comparable: comparable,
    editMetric: editMetric,
    colors: colors
  })));
});
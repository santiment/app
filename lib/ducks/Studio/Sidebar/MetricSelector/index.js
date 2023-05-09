const _excluded = ["onDragEnd", "onDragStart"],
      _excluded2 = ["categories", "availableMetrics", "setIsDraggingMetric"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useMemo, useEffect } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Category from '../Category';
import Group from '../Group';
import MetricButton from '../Button';
import { NO_GROUP } from '../utils';
import { rebuildDescriptions } from '../../../dataHub/metrics/descriptions';
import { useFavoriteMetrics, mutateFavoriteMetrics } from '../../../../stores/user/metrics';
import styles from '../Button/index.module.css';

const convertMetricToSidebarItem = item => ({
  item
});

const SortableItem = SortableElement(props => /*#__PURE__*/React.createElement(MetricButton, props));
const SortableList = SortableContainer(props => /*#__PURE__*/React.createElement(Group, _extends({}, props, {
  Button: SortableItem
})));

const SortableGroup = _ref => {
  let {
    onDragEnd,
    onDragStart
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(SortableList, _extends({}, props, {
    axis: "y",
    distance: 10,
    helperClass: styles.dragged,
    onSortStart: onDragStart,
    onSortEnd: onDragEnd
  }));
};

const MetricSelector = _ref2 => {
  let {
    categories = {},
    availableMetrics,
    setIsDraggingMetric
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  const {
    Submetrics
  } = props;
  const {
    favoriteMetrics
  } = useFavoriteMetrics();
  const [favorites, setFavorites] = useState(favoriteMetrics);
  const favoritesGroup = useMemo(() => ({
    [NO_GROUP]: favorites.map(convertMetricToSidebarItem)
  }), [favorites]);
  useEffect(() => setFavorites(favoriteMetrics), [favoriteMetrics]);
  useEffect(() => {
    rebuildDescriptions(Submetrics);
  }, [Submetrics]);

  function onDragEnd({
    oldIndex,
    newIndex
  }) {
    const newFavoriteMetrics = favoriteMetrics.slice();
    newFavoriteMetrics.splice(oldIndex, 1);
    newFavoriteMetrics.splice(newIndex, 0, favoriteMetrics[oldIndex]);
    mutateFavoriteMetrics(newFavoriteMetrics);
    setFavorites(newFavoriteMetrics);
    setIsDraggingMetric(false);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Category, _extends({
    title: "Favorites",
    groups: favoritesGroup
  }, props, {
    GroupNode: SortableGroup,
    onDragEnd: onDragEnd,
    onDragStart: () => setIsDraggingMetric(true)
  }), favoriteMetrics.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.favorites
  }, "Save any metric to 'Favorites' for quick access")), Object.keys(categories).map(key => /*#__PURE__*/React.createElement(Category, _extends({
    key: key,
    title: key,
    groups: categories[key]
  }, props))));
};

export default MetricSelector;
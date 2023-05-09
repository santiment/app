const _excluded = ["columns"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, useState, useEffect } from 'react';
import cx from 'classnames';
import isEqual from 'lodash.isequal';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import { NO_GROUP } from '../../../../../Studio/Sidebar/utils';
import Column from './Columns/Column';
import AssetsList from './AssetsList';
import styles from './Category.module.css';
const DragHandle = sortableHandle(() => /*#__PURE__*/React.createElement("div", {
  className: styles.draggable
}, /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "11",
  height: "12",
  viewBox: "0 0 16 12"
}, /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  d: "M0 .5zC0 .22.23 0 .5 0h15a.5.5 0 110 1H.5A.5.5 0 010 .5zM0 6c0-.28.23-.5.5-.5h15a.5.5 0 110 1H.5A.5.5 0 010 6zm.5 5a.5.5 0 000 1H15.5a.5.5 0 100-1H.5z",
  clipRule: "evenodd"
}))));
const SortableItem = SortableElement(({
  column,
  currentSearch,
  filteredColumns,
  onColumnToggle
}) => {
  const {
    key
  } = column;
  const isHide = currentSearch && !filteredColumns.includes(key);
  return /*#__PURE__*/React.createElement(Column, {
    key: key,
    draggable: true,
    isHide: isHide,
    column: column,
    DragHandle: DragHandle,
    onColumnToggle: onColumnToggle,
    isActive: true,
    className: cx(styles.column, styles.column__active, currentSearch && styles.searchedColumn)
  });
});
const SortableList = SortableContainer(_ref => {
  let {
    columns
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", {
    className: styles.columns
  }, columns.map((column, index) => /*#__PURE__*/React.createElement(SortableItem, _extends({
    key: column.key,
    index: index,
    column: column,
    disabled: !!props.currentSearch
  }, props))));
});

const Category = ({
  title,
  groups,
  columns,
  onColumnToggle,
  activeKeys,
  currentSearch,
  reorder
}) => {
  const [activeColumns, setActiveColumns] = useState(columns);
  const rawItems = useMemo(() => groups ? Object.values(groups).flat().map(({
    item
  }) => item) : columns, [columns, groups]);
  const filteredColumns = useMemo(() => {
    const searchInput = currentSearch.toLowerCase();
    return rawItems.filter(({
      label,
      shortLabel = label
    }) => label.toLowerCase().includes(searchInput) || shortLabel.toLowerCase().includes(searchInput)).map(({
      key
    }) => key);
  }, [currentSearch]);
  useEffect(() => {
    setActiveColumns(columns);
  }, [columns]);
  const isShowCategory = !currentSearch || currentSearch && filteredColumns.length !== 0;

  function onSortEnd({
    newIndex,
    oldIndex
  }) {
    if (newIndex === oldIndex) return;
    const newActiveColumns = Array.from(activeColumns);
    newActiveColumns.splice(oldIndex, 1);
    newActiveColumns.splice(newIndex, 0, activeColumns[oldIndex]);
    setActiveColumns(newActiveColumns);
    setTimeout(() => reorder(newActiveColumns.map(({
      key
    }) => key), !isEqual(columns, newActiveColumns)), 200);
  }

  return isShowCategory ? /*#__PURE__*/React.createElement("div", {
    className: styles.category
  }, /*#__PURE__*/React.createElement("h3", {
    className: styles.title
  }, title), groups ? /*#__PURE__*/React.createElement(React.Fragment, null, Object.keys(groups).map(group => /*#__PURE__*/React.createElement("div", {
    key: group,
    className: cx(styles.group, currentSearch && styles.flatGroup)
  }, group !== NO_GROUP && !currentSearch && /*#__PURE__*/React.createElement("h3", {
    className: styles.group__title
  }, group), groups[group].length > 0 && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.columns, currentSearch && styles.flat)
  }, title === 'Assets' ? /*#__PURE__*/React.createElement(AssetsList, {
    items: groups[group],
    activeKeys: activeKeys,
    currentSearch: currentSearch,
    filteredColumns: filteredColumns,
    onColumnToggle: onColumnToggle
  }) : groups[group].map(({
    item
  }) => {
    const {
      key
    } = item;
    const isActive = activeKeys && activeKeys.includes(key);
    const isHide = isActive || currentSearch && !filteredColumns.includes(key);
    return isHide ? null : /*#__PURE__*/React.createElement(Column, {
      key: key,
      column: item,
      onColumnToggle: onColumnToggle,
      isActive: false,
      className: cx(styles.column, currentSearch && styles.searchedColumn)
    });
  }))))) : /*#__PURE__*/React.createElement(SortableList, {
    lockAxis: "y",
    useDragHandle: true,
    columns: activeColumns,
    onSortEnd: onSortEnd,
    currentSearch: currentSearch,
    filteredColumns: filteredColumns,
    onColumnToggle: onColumnToggle,
    helperClass: styles.dragged
  })) : null;
};

export default Category;
const _excluded = ["widgets", "onNewChartClick"],
      _excluded2 = ["widgets", "children", "onClose", "setWidgets"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cx from 'classnames';
import React, { useEffect } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Header from './Header';
import ChartPreview from './ChartPreview';
import { Phase } from '../phases';
import { useKeyDown } from '../hooks';
import { SvgNew } from '../../../components/Illustrations/NewCard';
import styles from './Overview.module.css';
const SortableItem = SortableElement(({
  widget,
  currentPhase,
  selectedMetrics,
  onWidgetClick,
  useWidgetMessage
}) => /*#__PURE__*/React.createElement(ChartPreview, {
  key: widget.id,
  widget: widget,
  currentPhase: currentPhase,
  selectedMetrics: selectedMetrics,
  onClick: onWidgetClick,
  useWidgetMessage: useWidgetMessage
}));
const SortableList = SortableContainer(_ref => {
  let {
    widgets,
    onNewChartClick
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const isSelectionPhase = props.currentPhase === Phase.MAPVIEW_SELECTION;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.grid
  }, widgets.map((widget, index) => /*#__PURE__*/React.createElement(SortableItem, _extends({}, props, {
    key: widget.id,
    index: index,
    disabled: isSelectionPhase,
    widget: widget
  }))), isSelectionPhase && /*#__PURE__*/React.createElement("div", {
    className: cx(styles.item, styles.item_new, styles.idle),
    onClick: () => onNewChartClick() // NOTE: Not passing `onNewChartClick` as a reference since arguments will be mapped incorrectly [@vanguard | Aug  5, 2020]

  }, /*#__PURE__*/React.createElement(SvgNew, {
    className: styles.iconNew
  }), "Add new chart"));
});

const Overview = _ref2 => {
  let {
    widgets,
    children,
    onClose,
    setWidgets
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  useKeyDown(onClose, 'Escape');
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = null;
    };
  }, []);

  function onSortEnd({
    newIndex,
    oldIndex
  }) {
    if (newIndex === oldIndex) return;
    const newWidgets = widgets.slice();
    newWidgets.splice(oldIndex, 1);
    newWidgets.splice(newIndex, 0, widgets[oldIndex]);
    setWidgets(newWidgets);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.sticky
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("div", {
    className: styles.visible
  }, /*#__PURE__*/React.createElement(SortableList, _extends({}, props, {
    widgets: widgets,
    axis: "xy",
    lockToContainerEdges: true,
    distance: 20,
    onSortEnd: onSortEnd,
    helperClass: styles.dragged
  })), children)));
};

export default Overview;
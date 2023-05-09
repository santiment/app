const _excluded = ["widget", "index", "datesRange"],
      _excluded2 = ["settings", "widgets", "sidepanel", "shortUrlHashState", "isOverviewOpened", "setWidgets", "toggleSidepanel", "toggleOverview", "changeTimePeriod", "onProjectSelect"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useMemo } from 'react';
import StudioHeader from '../Header';
import Sidepanel from '../Chart/Sidepanel';
import { useSyncDateObserver } from '../../Chart/sync';
import { newRenderQueue, withRenderQueueProvider } from '../../renderQueue/sized';
import { ONE_HOUR_IN_MS } from '../../../utils/dates';
import { usePressedModifier } from '../../../hooks/keyboard';
import styles from './Widgets.module.css';
const RANGE_SELECT_SENSITIVITY = 7;

const Widget = _ref => {
  let {
    widget,
    index,
    datesRange
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(widget.Widget, _extends({}, props, {
    widget: widget,
    index: index
  })), widget.connectedWidgets.map(connectedWidget => /*#__PURE__*/React.createElement(connectedWidget.Widget, _extends({}, props, {
    key: connectedWidget.id,
    widget: connectedWidget,
    parentWidget: widget,
    datesRange: datesRange
  }))));
};

const Widgets = _ref2 => {
  let {
    settings,
    widgets,
    sidepanel,
    shortUrlHashState,
    isOverviewOpened,
    setWidgets,
    toggleSidepanel,
    toggleOverview,
    changeTimePeriod,
    onProjectSelect
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDatesRange, setSelectedDatesRange] = useState();
  const PressedModifier = usePressedModifier();
  const isSingleWidget = widgets.length === 1;
  const onWidgetPointClick = sidepanel ? onPointMouseUp : undefined;
  const allMetrics = useMemo(() => widgets.map(({
    metrics
  }) => metrics).flat(), [widgets]);
  const {
    syncDate,
    observeSyncDate
  } = useSyncDateObserver();

  function changeDatesRange(from, to) {
    setSelectedDate();
    setSelectedDatesRange([from, to]);
  }

  function onRangeSelected({
    x: x1,
    value: leftDate
  }, {
    x: x2,
    value: rightDate
  }) {
    setIsSelectingRange(false);
    if (leftDate === rightDate) return;
    const dates = leftDate < rightDate ? [leftDate, rightDate] : [rightDate, leftDate];
    const from = new Date(dates[0]);
    const to = new Date(dates[1]);

    if (PressedModifier.cmdKey) {
      return changeDatesRange(from, to);
    }

    if (Math.abs(x2 - x1) > RANGE_SELECT_SENSITIVITY && to - from >= ONE_HOUR_IN_MS) {
      changeTimePeriod(from, to);
    }
  }

  function onRangeSelecting() {
    setIsSelectingRange(true);
  }

  function onPointMouseUp({
    value
  }) {
    if (isSelectingRange) return;
    setSelectedDate(new Date(value));
    setSelectedDatesRange();
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StudioHeader, {
    settings: settings,
    widgets: widgets,
    sidepanel: sidepanel,
    metrics: allMetrics,
    shortUrlHash: shortUrlHashState && shortUrlHashState[0],
    isOverviewOpened: isOverviewOpened,
    setWidgets: setWidgets,
    changeTimePeriod: changeTimePeriod,
    toggleSidepanel: toggleSidepanel,
    toggleOverview: toggleOverview,
    onProjectSelect: onProjectSelect
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.widgets
  }, widgets.map((widget, index) => /*#__PURE__*/React.createElement(Widget, _extends({}, props, {
    key: widget.id,
    index: index,
    widget: widget,
    settings: settings,
    datesRange: selectedDatesRange,
    isSingleWidget: isSingleWidget,
    isSelectingRange: isSelectingRange,
    changeTimePeriod: changeTimePeriod,
    syncTooltips: syncDate,
    observeSyncDate: observeSyncDate,
    onPointMouseUp: onWidgetPointClick,
    onRangeSelected: onRangeSelected,
    onRangeSelecting: onRangeSelecting
  })))), sidepanel && /*#__PURE__*/React.createElement(Sidepanel, {
    className: styles.side,
    project: settings,
    chartSidepane: sidepanel,
    metrics: allMetrics,
    toggleChartSidepane: toggleSidepanel,
    date: selectedDate,
    datesRange: selectedDatesRange
  })));
};

export default withRenderQueueProvider(Widgets, newRenderQueue(2));
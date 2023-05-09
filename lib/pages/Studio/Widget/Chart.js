function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useStore } from '../stores';
import Insights from '../Insights';
import Signals from '../../../ducks/Chart/Signals';
import Calendar from '../../../components/Calendar/Calendar';

const Settings = () => {
  const [target, setTarget] = useState();
  const [dates, setDates] = useState();
  const [maxDate, setMaxDate] = useState();
  useEffect(() => {
    window.mountSettingsCalendar = (target, dates, maxDate) => {
      setTarget(target);
      setDates(dates);
      setMaxDate(maxDate);
    };

    return () => delete window.mountSettingsCalendar;
  }, []);
  return target ? /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(Calendar, {
    selectRange: true,
    value: dates,
    maxDate: maxDate,
    onChange: dates => window.setSettingsCalendarDate(dates)
  }), target) : null;
};

const metricsImmute = metrics => metrics.slice();

function useWidgetMetrics(widget) {
  return useStore(widget.Metrics, metricsImmute);
}

const drawerImmute = v => _extends({}, v);

const ChartWidget = ({
  widget,
  target,
  settings,
  InsightsStore
}) => {
  const {
    isDrawing
  } = useStore(widget.ChartDrawer, drawerImmute);
  const metrics = useWidgetMetrics(widget);
  const chartContainer = widget.chart && widget.chart.canvas.parentNode;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Insights, {
    widget: widget,
    InsightsStore: InsightsStore
  }), !isDrawing && chartContainer && /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(Signals, _extends({}, settings, {
    metrics: metrics,
    data: [{}],
    chart: widget.chart
  })), chartContainer), /*#__PURE__*/React.createElement(Settings, null));
};

export default ChartWidget;
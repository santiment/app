import React, { useMemo } from 'react';
import { useDropdown } from '../../../ducks/Studio/Chart/MetricSettings/Dropdown';
import { isAvailableInterval, useMetricIntervals } from '../../../ducks/Studio/Chart/MetricSettings/hooks';
import { IntervalSettingsTemplate } from '../../../ducks/Studio/Chart/MetricSettings/IntervalSetting';
import styles from './DashIntervalSettings.module.css';

const DashIntervalSettings = ({
  metrics,
  updateInterval,
  settings
}) => {
  const metric = useMemo(() => metrics[0], [metrics]);
  const {
    activeRef,
    close,
    Dropdown
  } = useDropdown();
  const intervals = useMetricIntervals(metric);
  const interval = useMemo(() => {
    const {
      interval
    } = settings || {};
    return isAvailableInterval(interval, intervals) ? interval : intervals[0].key;
  }, [settings, intervals, metric]);

  function onChange(newInterval) {
    updateInterval({
      interval: newInterval
    });
    close();
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.settings
  }, /*#__PURE__*/React.createElement(IntervalSettingsTemplate, {
    intervals: intervals,
    interval: interval,
    onChange: onChange,
    activeRef: activeRef,
    dd: Dropdown
  }));
};

export default DashIntervalSettings;
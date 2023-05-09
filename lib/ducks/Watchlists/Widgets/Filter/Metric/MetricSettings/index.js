import React, { useRef } from 'react';
import TypeDropdown from './TypeDropdown';
import TimeRangeDropdown from './TimeRangeDropdown';
import ValueInput from './ValueInput';
import { Filter } from '../../dataHub/types';
import { DEFAULT_TIMERANGES } from '../../dataHub/timeranges';
import Suggestions from '../Suggestions';
import styles from './index.module.css';

const FilterMetricSettings = ({
  isPro,
  percentTimeRanges,
  metric,
  onFilterTypeChange,
  onTimeRangeChange,
  onFirstThresholdChange,
  onSecondThresholdChange,
  onSuggestionClick,
  settings: {
    firstThreshold,
    secondThreshold,
    timeRange,
    type
  }
}) => {
  const inputRef = useRef(null);
  const isShowTimeRange = Filter[type].showTimeRange || metric.showTimeRange;
  let timeRanges = null;

  if (isShowTimeRange) {
    if (Filter[type].showTimeRange) {
      timeRanges = percentTimeRanges;
    } else if (metric.showTimeRange) {
      timeRanges = DEFAULT_TIMERANGES;
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.settings
  }, /*#__PURE__*/React.createElement(TypeDropdown, {
    isPro: isPro,
    type: type,
    onChange: props => {
      onFilterTypeChange(props);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    showPercentFilters: percentTimeRanges && percentTimeRanges.length > 0,
    isOnlyPercentFilters: metric.isOnlyPercentFilters
  }), /*#__PURE__*/React.createElement(ValueInput, {
    type: type,
    metric: metric,
    defaultValue: firstThreshold,
    onChange: onFirstThresholdChange,
    forwardedRef: inputRef
  }), Filter[type].showSecondInput && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: styles.connector
  }, "to"), /*#__PURE__*/React.createElement(ValueInput, {
    type: type,
    metric: metric,
    defaultValue: secondThreshold,
    onChange: onSecondThresholdChange
  })), timeRanges && /*#__PURE__*/React.createElement(TimeRangeDropdown, {
    timeRange: timeRange,
    timeRanges: timeRanges,
    withInput: metric.showTimeRange && !Filter[type].showTimeRange,
    onChange: onTimeRangeChange
  })), /*#__PURE__*/React.createElement(Suggestions, {
    hints: metric.hints,
    onSuggestionClick: onSuggestionClick
  }));
};

export default FilterMetricSettings;
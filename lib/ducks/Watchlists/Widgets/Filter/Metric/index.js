const _excluded = ["filters", "baseMetric"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import { getFilterType, extractParams, extractFilterByMetricType } from '../detector';
import MetricState from './MetricState';
import { Filter } from '../dataHub/types';
import { useMetricSettings } from './hooks';
import MetricSettings from './MetricSettings';
import { DEFAULT_SETTINGS } from '../defaults';
import { getTimeRangesByMetric } from '../dataHub/metrics';

function fakeFormatter(value) {
  return value;
}

const FilterMetric = ({
  baseMetric,
  isNoFilters,
  defaultSettings,
  updMetricInFilter,
  isViewMode,
  availableMetrics,
  toggleMetricInFilter,
  isPro
}) => {
  if (!defaultSettings.isActive && baseMetric.isDeprecated) {
    return null;
  }

  const {
    settings,
    setSettings,
    selectSuggest,
    clickCheckbox
  } = useMetricSettings(defaultSettings);
  const [percentTimeRanges, setPercentTimeRanges] = useState(getTimeRangesByMetric(baseMetric, availableMetrics));
  const shouldIncludeSecondInput = Filter[settings.type].showSecondInput;
  const isFinishedState = shouldIncludeSecondInput ? settings.firstThreshold !== '' && settings.secondThreshold !== '' : settings.firstThreshold !== '';
  useEffect(() => {
    if (isNoFilters) {
      setSettings(DEFAULT_SETTINGS);
    }
  }, [isNoFilters]);
  useEffect(() => {
    if (percentTimeRanges.length === 0) {
      const timeRanges = getTimeRangesByMetric(baseMetric, availableMetrics);
      setPercentTimeRanges(timeRanges);

      if (Filter[settings.type].showTimeRange && !timeRanges.some(item => item.type === settings.timeRange) && timeRanges[0]) {
        setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
          timeRange: timeRanges[0].type
        }));
      }
    }
  }, [availableMetrics]);
  useEffect(() => {
    if (settings !== defaultSettings) {
      const {
        firstThreshold,
        secondThreshold,
        type,
        timeRange,
        isActive
      } = settings;
      const {
        isActive: previousIsActive
      } = defaultSettings; // dynamicFrom

      const dynamicFrom = Filter[type].showTimeRange || baseMetric.showTimeRange ? timeRange : '1d'; // aggregation

      const aggregation = Filter[type].aggregation || baseMetric.aggregation || 'last'; // metric

      const metric = Filter[type].showTimeRange ? `${baseMetric.percentMetricKey || baseMetric.key}_change_${timeRange}` : baseMetric.key; // operator

      const operator = Filter[type].operator; // formatter

      const formatter = Filter[type].serverValueFormatter || baseMetric.serverValueFormatter || fakeFormatter; // threshold

      const threshold = shouldIncludeSecondInput ? [formatter(firstThreshold), formatter(secondThreshold)] : formatter(firstThreshold);
      const newFilter = {
        args: {
          aggregation,
          dynamicFrom,
          dynamicTo: 'now',
          metric,
          operator,
          threshold
        },
        name: 'metric'
      };

      if (isFinishedState) {
        if (previousIsActive !== isActive) {
          toggleMetricInFilter(newFilter, baseMetric.key, baseMetric.percentMetricKey);
        } else {
          updMetricInFilter(newFilter, baseMetric.key, baseMetric.percentMetricKey);
        }
      }

      if (!isFinishedState && isActive && defaultSettings.isActive) {
        toggleMetricInFilter(newFilter, baseMetric.key, baseMetric.percentMetricKey);
      }
    }
  }, [settings]);

  function onFilterTypeChange(type) {
    if (Filter[type].showTimeRange && !percentTimeRanges.some(item => item.type === settings.timeRange) && percentTimeRanges[0]) {
      setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
        type,
        timeRange: percentTimeRanges[0].type
      }));
    } else {
      setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
        type
      }));
    }
  }

  function onFirstThresholdChange(value) {
    const newValue = isNaN(parseFloat(value)) ? '' : parseFloat(value);
    setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
      firstThreshold: newValue
    }));
  }

  function onSecondThresholdChange(value) {
    const newValue = isNaN(parseFloat(value)) ? '' : parseFloat(value);
    setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
      secondThreshold: newValue
    }));
  }

  function onTimeRangeChange(timeRange) {
    setSettings(state => _objectSpread(_objectSpread({}, state), {}, {
      timeRange
    }));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetricState, {
    isViewMode: isViewMode,
    isPro: isPro,
    metric: baseMetric,
    settings: settings,
    isActive: settings.isActive,
    onCheckboxClicked: clickCheckbox,
    isFinishedState: isFinishedState
  }), settings.isActive && !isViewMode && /*#__PURE__*/React.createElement(MetricSettings, {
    isPro: isPro,
    metric: baseMetric,
    settings: settings,
    autoFocus: settings.isActive && !defaultSettings.isActive,
    percentTimeRanges: percentTimeRanges,
    onFilterTypeChange: onFilterTypeChange,
    onTimeRangeChange: onTimeRangeChange,
    onFirstThresholdChange: onFirstThresholdChange,
    onSecondThresholdChange: onSecondThresholdChange,
    onSuggestionClick: selectSuggest
  }));
};

export default (_ref => {
  let {
    filters,
    baseMetric
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const filter = extractFilterByMetricType(filters, baseMetric);
  const filterType = getFilterType(filter, baseMetric);
  const settings = extractParams(filter, filterType, baseMetric);
  return /*#__PURE__*/React.createElement(FilterMetric, _extends({}, props, {
    baseMetric: baseMetric,
    defaultSettings: _objectSpread(_objectSpread(_objectSpread({}, DEFAULT_SETTINGS), {}, {
      timeRange: baseMetric.defaultTimeRange || DEFAULT_SETTINGS.timeRange
    }, settings), {}, {
      type: filterType.key
    })
  }));
});
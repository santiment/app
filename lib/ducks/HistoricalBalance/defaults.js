const _excluded = ["defaultSettings"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { getNewInterval } from '../SANCharts/IntervalSelector';
import { getIntervalByTimeRange } from '../../utils/dates';
export const ASSETS_LIMIT = 5;
const DEFAULT_TIME_RANGE = '6m';
const {
  from: FROM,
  to: TO
} = getIntervalByTimeRange(DEFAULT_TIME_RANGE);
const SETTINGS = {
  address: '',
  from: FROM.toISOString(),
  to: TO.toISOString(),
  interval: getNewInterval(FROM, TO),
  timeRange: DEFAULT_TIME_RANGE.toUpperCase()
};
export const withDefaults = Component => _ref => {
  let {
    defaultSettings
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Component, _extends({}, props, {
    defaultSettings: _extends({}, SETTINGS, defaultSettings)
  }));
};
export const TabType = {
  LATEST_TRANSACTIONS: 'Latest transactions',
  TOP_TRANSACTIONS: 'Top transactions'
};
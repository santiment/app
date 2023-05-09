const _excluded = ["title", "data", "events", "activeMetrics", "activeEvents"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { CSVLink } from 'react-csv';
import Button from '@santiment-network/ui/Button';
import { getDateFormats, getTimeFormats } from '../../utils/dates';
import { mergeTimeseries } from '../Studio/timeseries/utils';

const DownloadCSVBtn = _ref => {
  let {
    title,
    data,
    events,
    activeMetrics,
    activeEvents
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const date = new Date();
  const {
    DD,
    MMM,
    YYYY
  } = getDateFormats(date);
  const {
    HH,
    mm,
    ss
  } = getTimeFormats(date);
  const filename = `${title} [${HH}.${mm}.${ss}, ${DD} ${MMM}, ${YYYY}].csv`;
  const headers = [{
    label: 'Date',
    key: 'datetime'
  }, ...activeMetrics.concat(activeEvents).map(({
    label,
    key,
    dataKey = key
  }) => ({
    label,
    key: dataKey
  }))];
  const mergedData = mergeTimeseries([data, events]).map(item => _objectSpread(_objectSpread({}, item), {}, {
    datetime: new Date(item.datetime).toISOString()
  }));
  return /*#__PURE__*/React.createElement(Button, _extends({
    filename: filename,
    headers: headers,
    data: mergedData
  }, props, {
    as: CSVLink
  }));
};

DownloadCSVBtn.defaultProps = {
  title: '',
  activeMetrics: [],
  activeEvents: [],
  data: [],
  events: []
};
export default DownloadCSVBtn;
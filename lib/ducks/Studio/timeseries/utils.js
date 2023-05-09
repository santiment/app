const _excluded = ["datetime"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { getIntervalMilliseconds } from '../../../utils/dates';
const OLD_DATE = {
  datetime: 0
};

const newDataMapper = data => _extends({}, data); // TODO: Remove this after moving to dynamic query aliasing instead of preTransform [@vanguard | March 4, 2020]


export const aliasTransform = (key, dataKey = key) => alias => data => extractTimeseries(key)(data).map(_ref => {
  let {
    datetime
  } = _ref,
      value = _objectWithoutProperties(_ref, _excluded);

  return {
    datetime,
    [alias]: value[dataKey]
  };
});
export const extractTimeseries = name => ({
  data
}) => data[name];
export const normalizeDatetimes = data => _objectSpread(_objectSpread({}, data), {}, {
  datetime: +new Date(data.datetime)
});
export const normalizeInterval = (interval, minInterval) => getIntervalMilliseconds(interval) > getIntervalMilliseconds(minInterval) ? interval : minInterval;

function findDatetimeBorder(baseTs, cursor, targetDatetime) {
  const baseTsLength = baseTs.length;

  do {
    cursor++;
  } while (cursor < baseTsLength && targetDatetime > new Date(baseTs[cursor].datetime));

  return cursor;
}

export function mergeTimeseries(timeseries) {
  const timeseriesAmount = timeseries.length;

  if (timeseriesAmount === 1) {
    return timeseries[0];
  } // Finding longest timeserie


  let longestTS = timeseries[0];

  for (let i = 0; i < timeseriesAmount; i++) {
    longestTS = longestTS.length > timeseries[i].length ? longestTS : timeseries[i];
  }

  let baseTs = longestTS.map(newDataMapper);

  for (let i = 0; i < timeseriesAmount; i++) {
    const timeserie = timeseries[i];
    if (timeserie === longestTS) continue;
    const tsLength = timeserie.length;

    for (let timeserieCursor = 0, baseTsCursor = 0; timeserieCursor < tsLength; timeserieCursor++, baseTsCursor++) {
      const isBaseInBounds = baseTsCursor < baseTs.length;
      const timeserieData = timeserie[timeserieCursor];
      const baseTsData = isBaseInBounds ? baseTs[baseTsCursor] : OLD_DATE;

      if (timeserieData.datetime === baseTsData.datetime) {
        _extends(baseTsData, timeserieData);

        continue;
      }

      const timeserieDatetime = new Date(timeserieData.datetime);
      const baseTsDatetime = new Date(baseTsData.datetime);

      if (timeserieDatetime > baseTsDatetime) {
        // current timeserie's datetime is greater than the base
        baseTsCursor = findDatetimeBorder(baseTs, baseTsCursor, timeserieDatetime);

        if (baseTsCursor >= baseTs.length) {
          // Base doesn't have data after this datetime
          baseTs = baseTs.concat(timeserie.slice(timeserieCursor).map(newDataMapper));
          break;
        } else {
          // Found potentially similar base to datetime
          const foundBaseTs = baseTs[baseTsCursor];

          if (timeserieData.datetime === foundBaseTs.datetime) {
            // Merging timeseries with same datetime
            _extends(foundBaseTs, timeserieData);
          } else {
            // Inserting it before found base
            baseTs.splice(baseTsCursor, 0, newDataMapper(timeserieData));
          }
        }
      } else {
        // current timeserie's datetime is less than the base
        const timeserieLeftCursor = timeserieCursor;
        timeserieCursor = findDatetimeBorder(timeserie, timeserieCursor, baseTsDatetime);

        if (timeserieCursor >= timeserie.length) {
          // No base found with similar datetime
          baseTs.splice(baseTsCursor, 0, ...timeserie.slice(timeserieLeftCursor).map(newDataMapper));
          break;
        } else {
          // Found potentially similar datetime to base
          baseTs.splice(baseTsCursor, 0, ...timeserie.slice(timeserieLeftCursor, timeserieCursor).map(newDataMapper));
          const foundTimeserieData = timeserie[timeserieCursor];

          if (baseTsData.datetime === foundTimeserieData.datetime) {
            _extends(baseTsData, foundTimeserieData);
          }
        }
      }
    }
  }

  return baseTs;
}
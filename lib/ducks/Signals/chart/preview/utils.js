function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export const mapWithTimeseries = items => items.map(item => _objectSpread(_objectSpread({}, item), {}, {
  datetime: +new Date(item.datetime),
  index: item.datetime
}));
export const mapWithMidnightTime = date => {
  const datetime = new Date(date);
  datetime.setUTCHours(0, 0, 0, 0);
  return +new Date(datetime);
};
export const mapWithTimeseriesAndYCoord = (triggered, triggersBy, timeseries, toDayConversion = true) => {
  const {
    key,
    dataKey = key,
    historicalTriggersDataKey: mappingKey = dataKey
  } = triggersBy;
  const mapped = triggered.map(point => {
    const date = toDayConversion ? mapWithMidnightTime(point.datetime) : +new Date(point.datetime);
    const item = timeseries.find(({
      datetime
    }) => datetime === date);
    const fromTimeseries = item ? item[dataKey] || item[key] : undefined;
    const yCoord = fromTimeseries || point[mappingKey] || point['current'];
    return _objectSpread({
      date,
      yCoord
    }, point);
  });
  return mapped;
};
export const cleanByDatakeys = (timeseries, dataKey) => {
  return timeseries.filter(item => item[dataKey] !== undefined);
};
export const makeSameRange = (points, base) => {
  if (!base[0]) {
    return points;
  }

  const date = base[0].datetime;
  return points.filter(({
    datetime
  }) => +new Date(datetime) > date);
};
export const mapToRequestedMetrics = (metrics, settings) => metrics.map(({
  key,
  alias: name = key,
  reqMeta,
  fetch
}) => _objectSpread(_objectSpread({
  key,
  name,
  fetch
}, settings), reqMeta));
export const getAvailableCooldown = baseCooldown => {
  if (baseCooldown && (baseCooldown.indexOf('d') !== -1 || baseCooldown.indexOf('w') !== -1)) {
    return '1d';
  }

  return baseCooldown && baseCooldown.indexOf('m') !== -1 ? '1h' : baseCooldown;
};
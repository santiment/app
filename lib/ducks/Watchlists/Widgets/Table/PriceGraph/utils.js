function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PriceGraphCache = new Map();
export function normalizeGraphData(graph, items = [], key = 'price_usd_chart_7d', loading) {
  if (loading) {
    return items;
  }

  const normalizedItems = items.map(item => {
    const cached = PriceGraphCache.get(item.slug);

    if (cached && cached[key]) {
      const res = _objectSpread({}, item);

      res[key] = cached[key];
      return res;
    } else {
      const graphData = [];
      graph.forEach(tick => {
        const tickData = tick.data.find(({
          slug
        }) => slug === item.slug) || {};
        graphData.push({
          value: tickData.value,
          datetime: tick.datetime
        });
      });
      const realData = graphData.filter(({
        value
      }) => value !== undefined);
      const res = {};
      res[key] = realData.length > 0 ? graphData : null;

      if (realData.length > 0) {
        PriceGraphCache.set(item.slug, _objectSpread(_objectSpread({}, cached), res));
        return _objectSpread(_objectSpread({}, item), res);
      } else {
        return _objectSpread(_objectSpread({}, item), res);
      }
    }
  });
  return normalizedItems;
}
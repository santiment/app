function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { getIntervalByTimeRange } from '../../../utils/dates';
export const WhaleAssets = [{
  slug: 'tether'
}, {
  slug: 'binance-usd'
}];
export const WHALES_DEFAULT_SETTINGS = _objectSpread(_objectSpread({}, getIntervalByTimeRange('30d')), {}, {
  interval: '1d'
});
const WHALE_TRENDS_QUERY = gql`
  query getMetric($from: DateTime!, $to: DateTime!, $slug: String!, $interval: interval!) {
    getMetric(metric: "amount_in_non_exchange_top_holders") {
      timeseriesData(
        slug: $slug
        from: $from
        to: $to
        includeIncompleteData: true
        interval: $interval
      ) {
        datetime
        value
      }
    }
  }
`;
export const useWhaleTrends = ({
  slug,
  from,
  to,
  interval
}) => {
  const {
    data: {
      getMetric
    } = {},
    loading,
    error
  } = useQuery(WHALE_TRENDS_QUERY, {
    variables: {
      slug,
      from,
      to,
      interval
    }
  });
  return {
    data: getMetric ? getMetric.timeseriesData : [],
    loading,
    error
  };
};
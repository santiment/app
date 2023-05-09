function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { getTimerangePeriod } from '../../../utils/dates';
export const EXCHANGE_INTERESTS = {
  high: 'Very High',
  normal: 'Normal',
  low: 'Low'
};
export const EXCHANGES_DEFAULT_SETTINGS = _objectSpread(_objectSpread({}, getTimerangePeriod('1d')), {}, {
  interval: '1h'
});
const EXCHANGES_INFLOW_AGGREGATED_QUERY = gql`
  query allProjects($from: DateTime!, $to: DateTime!) {
    allProjects(
      selector: {
        filters: { name: "market_segments", args: "{\\"market_segments\\": [\\"Stablecoin\\"]}" }
      }
    ) {
      slug
      ticker
      name
      exchange_inflow_centralized: aggregatedTimeseriesData(
        selector: { label: "centralized_exchange" }
        from: $from
        to: $to
        metric: "exchange_inflow_per_exchange"
        aggregation: SUM
      )

      exchange_inflow_decentralized: aggregatedTimeseriesData(
        selector: { label: "decentralized_exchange" }
        from: $from
        to: $to
        metric: "exchange_inflow_per_exchange"
        aggregation: SUM
      )
    }
  }
`;
export const useFlowToExchanges = ({
  from,
  to
}) => {
  const {
    data: {
      allProjects
    } = {},
    loading,
    error
  } = useQuery(EXCHANGES_INFLOW_AGGREGATED_QUERY, {
    variables: {
      from,
      to
    }
  });
  return {
    data: allProjects || [],
    loading,
    error
  };
};
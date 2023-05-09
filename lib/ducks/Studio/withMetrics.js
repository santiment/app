function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { getCategoryGraph } from './Sidebar/utils';
import { getMarketSegment } from './timeseries/marketSegments';
import { getMergedTimeboundSubmetrics } from '../dataHub/timebounds';
import { getAssetNewMetrics } from '../dataHub/metrics/news';
import { useIsBetaMode } from '../../stores/ui';
const PROJECT_METRICS_QUERIES_SEGMENTS_BY_SLUG_QUERY = gql`
  query projectBySlug($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      availableMetrics
      availableQueries
      marketSegments
    }
  }
`;
export const PROJECT_METRICS_BY_SLUG_QUERY = gql`
  query projectBySlug($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      availableMetrics
    }
  }
`;
export const DEFAULT_METRICS = ['price_usd', 'volume_usd', 'marketcap_usd', 'twitter_followers', 'dev_activity', 'age_consumed', 'transaction_volume', 'exchange_balance', 'age_distribution', 'nvt', 'mean_age', 'mean_realized_price_usd', 'exchange_token_supply', 'daily_active_addresses', 'mvrv_usd', 'realized_value_usd', 'nvt_transaction_volume', 'circulation', 'mean_dollar_invested_age', 'percent_of_total_supply_on_exchanges', 'velocity', 'social_dominance_total', 'social_volume_total'];
const DEFAULT_HIDDEN_METRICS = [];
const DEFAULT_STATE = {
  Submetrics: [],
  availableMetrics: [],
  categories: getCategoryGraph(DEFAULT_METRICS)
};
export function useProjectMetrics(slug, hiddenMetrics = DEFAULT_HIDDEN_METRICS, noMarketSegments) {
  const isBeta = useIsBetaMode();
  const {
    data
  } = useQuery(PROJECT_METRICS_QUERIES_SEGMENTS_BY_SLUG_QUERY, {
    variables: {
      slug
    }
  });
  return useMemo(() => {
    if (!data) return DEFAULT_STATE;
    const {
      availableMetrics,
      availableQueries,
      marketSegments
    } = data.project;
    const Submetrics = getMergedTimeboundSubmetrics(availableMetrics);
    const categories = getCategoryGraph(availableQueries.concat(availableMetrics).concat(noMarketSegments ? [] : marketSegments.map(getMarketSegment)), hiddenMetrics, Submetrics, isBeta);
    return _objectSpread({
      categories,
      Submetrics,
      availableMetrics
    }, getAssetNewMetrics(availableMetrics, {
      slug,
      isBeta
    }));
  }, [data, isBeta, hiddenMetrics, noMarketSegments]);
}
export default (Component => props => {
  const {
    slug,
    hiddenMetrics,
    noMarketSegments
  } = props;
  const projectMetrics = useProjectMetrics(slug, hiddenMetrics, noMarketSegments);
  return /*#__PURE__*/React.createElement(Component, _extends({}, props, projectMetrics));
});
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { getMetricByKey } from '../../ducks/Studio/metrics';
import { client } from '../../apollo';
export const USER_SETTINGS_QUERY = gql`
  {
    currentUser {
      id
      settings {
        favoriteMetrics
      }
    }
  }
`;
const UPDATE_USER_FAVORIT_METRICS_MUTATION = gql`
  mutation updateUserSettings($metrics: [String]!) {
    updateUserSettings(settings: { favoriteMetrics: $metrics }) {
      favoriteMetrics
    }
  }
`;
const QUERY = {
  query: USER_SETTINGS_QUERY
};
const ARRAY = [];
const DEFAULT = {
  favoriteMetrics: ARRAY,
  isLoading: true
};
const DEFAULT_LOADED = {
  favoriteMetrics: ARRAY,
  isLoading: false
};

const keyAccessor = ({
  key
}) => key;

let isInFlight = false;
export function useFavoriteMetrics() {
  const {
    data
  } = useQuery(USER_SETTINGS_QUERY);
  return useMemo(() => {
    if (!data) return DEFAULT;
    const {
      currentUser
    } = data;
    if (!currentUser) return DEFAULT_LOADED;
    const {
      favoriteMetrics
    } = data.currentUser.settings;
    return {
      favoriteMetrics: favoriteMetrics.map(getMetricByKey),
      isLoading: false
    };
  }, [data]);
}

function updateFavoriteMetricsCache(_, {
  data
}) {
  const {
    currentUser
  } = client.readQuery(QUERY);
  client.writeQuery({
    query: USER_SETTINGS_QUERY,
    data: {
      currentUser: _objectSpread(_objectSpread({}, currentUser), {}, {
        settings: data.updateUserSettings
      })
    }
  });
}

export const mutateFavoriteMetrics = metrics => client.mutate({
  mutation: UPDATE_USER_FAVORIT_METRICS_MUTATION,
  variables: {
    metrics: metrics.map(keyAccessor)
  },
  update: updateFavoriteMetricsCache
});
export function toggleFavoriteMetric(metric) {
  if (isInFlight) return;
  isInFlight = true;
  return client.query(QUERY).then(({
    data: {
      currentUser
    }
  }) => {
    if (!currentUser) return;
    const favoriteMetricsSet = new Set(currentUser.settings.favoriteMetrics.map(getMetricByKey));

    if (favoriteMetricsSet.has(metric)) {
      favoriteMetricsSet.delete(metric);
    } else {
      favoriteMetricsSet.add(metric);
    }

    return mutateFavoriteMetrics([...favoriteMetricsSet]);
  }).then(() => {
    isInFlight = false;
  }).catch(console.warn);
}
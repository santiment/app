const _excluded = ["useWatchlistMarketcap", "skipMarketcap", "onMarketcapLoad", "chartWidth"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { DesktopOnly } from '../../../components/Responsive';
import MiniChart from '../../../components/MiniChart';
import PercentChanges from '../../../components/PercentChanges';
import Card from './Card';
import { calcPercentageChange } from '../../../utils/utils';
import { millify } from '../../../utils/formatting';
import emptyChartSvg from './emptyChart.svg';
export const WATCHLIST_MARKETCAP_HISTORY_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      id
      historicalStats(from: "utc_now-7d", to: "utc_now", interval: "6h") {
        marketcap
      }
    }
  }
`;
const NULL_MARKETCAP = '$ 0';
const LOADING = {
  isLoading: true
};
const DEFAULT = {
  marketcap: NULL_MARKETCAP
};
export function useMarketcap(data, watchlist, onLoad, accessor) {
  return useMemo(() => {
    if (!data) return LOADING;
    if (onLoad) onLoad();
    const source = accessor ? accessor(data, watchlist) : data.watchlist;

    if (!source) {
      return LOADING;
    }

    const {
      historicalStats
    } = source;
    const {
      length
    } = historicalStats;
    if (length === 0) return DEFAULT;
    const lastMarketcap = historicalStats[length - 1].marketcap;
    const firstMarketcap = historicalStats[0].marketcap;
    return {
      data: historicalStats,
      marketcap: `$ ${millify(lastMarketcap)}`,
      change: calcPercentageChange(firstMarketcap, lastMarketcap)
    };
  }, [data]);
}

function useWatchlistMarketcap(variables, skip, onLoad) {
  const {
    data
  } = useQuery(WATCHLIST_MARKETCAP_HISTORY_QUERY, {
    variables,
    skip
  });
  return useMarketcap(data, variables, onLoad);
}

const ProjectCard = _ref => {
  let {
    useWatchlistMarketcap,
    skipMarketcap,
    onMarketcapLoad,
    chartWidth
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    data,
    marketcap,
    change
  } = useWatchlistMarketcap(props.watchlist, skipMarketcap, onMarketcapLoad);
  const noMarketcap = marketcap === NULL_MARKETCAP;
  return /*#__PURE__*/React.createElement(Card, _extends({}, props, {
    simplifiedChildren: /*#__PURE__*/React.createElement(PercentChanges, {
      changes: change
    }),
    middleChildren: /*#__PURE__*/React.createElement(React.Fragment, null, marketcap, /*#__PURE__*/React.createElement(DesktopOnly, null, noMarketcap ? /*#__PURE__*/React.createElement("img", {
      src: emptyChartSvg,
      alt: "empty chart"
    }) : /*#__PURE__*/React.createElement(MiniChart, {
      valueKey: "marketcap",
      data: data,
      change: change,
      width: chartWidth || 90
    }))),
    bottomChildren: noMarketcap ? 'No assets' : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PercentChanges, {
      changes: change
    }), /*#__PURE__*/React.createElement("span", {
      className: "body-2"
    }, "\xA0\xA0 total cap, 7d")),
    chart: noMarketcap ? /*#__PURE__*/React.createElement("img", {
      src: emptyChartSvg,
      alt: "empty chart",
      width: 104,
      height: 64
    }) : /*#__PURE__*/React.createElement(MiniChart, {
      valueKey: "marketcap",
      data: data,
      change: change,
      width: 104,
      height: 64
    })
  }));
};

ProjectCard.defaultProps = {
  useWatchlistMarketcap,
  path: '/watchlist/projects/'
};
export default ProjectCard;
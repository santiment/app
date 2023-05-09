function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { millify } from '../../../utils/formatting';
import { BlockHeader } from '../../../pages/StablecoinsPage/StablecoinsPageStructure';
import ProjectsBarChartWrapper from '../../Stablecoins/ProjectsBarChart/ProjectsBarChartWrapper';
import { formIntervalSettings } from '../../SANCharts/IntervalSelector';
import PageLoader from '../../../components/Loader/PageLoader';
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions';
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard';
import { getTimePeriod } from '../../../pages/TrendsExplore/utils';
import DaysSelector from './DaySelector';
import ChartWidget from '../Widget/ChartWidget';
import styles from './FeesDistribution.module.css';
export const FEE_RANGES = [{
  value: '1h',
  label: '1h'
}, {
  value: '1d',
  label: '24h'
}, {
  value: '7d',
  label: '7d'
}, {
  value: '30d',
  label: '30d'
}];
const FEES_DISTRIBUTION = gql`
  query ethFeesDistribution($from: DateTime!, $to: DateTime!) {
    ethFeesDistribution(from: $from, to: $to) {
      address
      fees
      project {
        logoUrl
        slug
        ticker
      }
    }
  }
`;

const useFeeDistributions = ({
  from,
  to
}) => {
  const {
    data,
    loading,
    error
  } = useQuery(FEES_DISTRIBUTION, {
    variables: {
      from,
      to
    }
  });
  return {
    data: data ? data.ethFeesDistribution.map(item => _objectSpread(_objectSpread({}, item.project), item)) : [],
    loading,
    error
  };
};

const FeesDistribution = ({
  onDisable,
  deleteWidget,
  widget
}) => {
  const [interval, setInterval] = useState('1d');
  const [settings, setSettings] = useState(formIntervalSettings(interval));

  function onCloseClick() {
    deleteWidget(widget);
  }

  useEffect(() => {
    setSettings(_objectSpread(_objectSpread({}, interval), formIntervalSettings(interval)));
  }, [interval]);
  const {
    isPro
  } = useUserSubscriptionStatus();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockHeader, {
    setInterval: setInterval,
    defaultIndex: 1,
    ranges: FEE_RANGES,
    title: "Fees Distribution",
    className: styles.header,
    onCloseClick: onCloseClick
  }), isPro ? /*#__PURE__*/React.createElement(FeesDistributionChart, {
    className: styles.chart,
    settings: settings,
    interval: interval,
    onDisable: onDisable
  }) : /*#__PURE__*/React.createElement(MakeProSubscriptionCard, null));
};

export const FeesDistributionChart = ({
  className,
  settings,
  onDisable,
  interval
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const {
    data,
    loading,
    error
  } = useFeeDistributions(selectedPeriod ? _objectSpread(_objectSpread({}, settings), selectedPeriod) : _objectSpread({}, settings));
  const prepared = useMemo(() => {
    return data.map(item => {
      return _objectSpread(_objectSpread({}, item), {}, {
        key: item.slug || item.address,
        clickable: !!item.slug
      });
    });
  }, [data]);
  useEffect(() => {
    if (interval !== '1d' && selectedPeriod) {
      setSelectedPeriod(null);
    }
  }, [interval]);

  if (!loading && error) {
    onDisable && onDisable();
    return null;
  }

  function changeDay(date) {
    setSelectedPeriod(getTimePeriod(date));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.container, className)
  }, interval === '1d' && /*#__PURE__*/React.createElement(DaysSelector, {
    className: styles.daysSelector,
    onDayChange: changeDay
  }), loading ? /*#__PURE__*/React.createElement(PageLoader, null) : /*#__PURE__*/React.createElement(ProjectsBarChartWrapper, {
    data: prepared,
    settings: {
      valueFormatter: val => `${millify(val)}`
    },
    dataKey: "fees",
    layout: "vertical"
  }));
};

FeesDistribution.new = props => ChartWidget.new(_objectSpread({
  mergedMetrics: [],
  metrics: []
}, props), FeesDistribution);

export default FeesDistribution;
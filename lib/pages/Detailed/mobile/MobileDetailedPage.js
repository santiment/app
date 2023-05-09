const _excluded = ["data"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import { graphql } from 'react-apollo';
import { useTrackEvents } from '../../../hooks/tracking';
import { PROJECT_BY_SLUG_MOBILE_QUERY } from '../../../ducks/SANCharts/gql';
import Title from './MobileAssetTitle';
import AssetChart from './MobileAssetChart';
import PriceBlock from './MobileAssetPriceInfo';
import FullscreenChart from './MobileFullscreenChart';
import ChartSelector from './MobileAssetChartSelector';
import MobilePopularMetrics from './MobilePopularMetrics';
import { useTimeseries } from '../../../ducks/Studio/timeseries/hooks';
import ChartMetricsTool from '../../../ducks/SANCharts/ChartMetricsTool';
import { getNewInterval, INTERVAL_ALIAS } from '../../../ducks/SANCharts/IntervalSelector';
import { Metric } from '../../../ducks/dataHub/metrics';
import { PriceMetric, DEFAULT_SETTINGS, MAX_METRICS_PER_CHART } from './defaults';
import PageLoader from '../../../components/Loader/PageLoader';
import MobileHeader from '../../../components/MobileHeader/MobileHeader';
import MobileMetricCard from '../../../components/MobileMetricCard/MobileMetricCard';
import MobileProPopup from '../../../components/MobileProPopup/MobileProPopup';
import { useChartColors } from '../../../ducks/Chart/colors';
import RecentlyUsedMetrics from './RecentlyUsedMetrics';
import { getIntervalByTimeRange } from '../../../utils/dates';
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions';
import { addRecentAssets, addRecentMetric } from '../../../utils/recent';
import styles from './MobileDetailedPage.module.css';

const MobileDetailedPage = _ref => {
  let {
    data: {
      project = {},
      loading
    }
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    isPro: hasPremium
  } = useUserSubscriptionStatus();
  const [trackEvent] = useTrackEvents();
  const slug = props.match.params.slug;
  addRecentAssets(slug);
  const [metrics, setMetrics] = useState([PriceMetric]);
  const [PriceCurrency] = useState(Metric.price_usd);
  const [settings, setSettings] = useState(_objectSpread(_objectSpread({}, DEFAULT_SETTINGS), {}, {
    slug
  }));
  const [icoPricePos, setIcoPricePos] = useState(null);
  const [fullscreen, toggleFullscreen] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [width, setWidth] = useState();
  const [isOuterEvent, setIsOuterEvent] = useState(false);
  const MetricColor = useChartColors(metrics);
  const [data, loadings, ErrorMsg] = useTimeseries(metrics, settings);

  function toggleMetric(metric) {
    const newMetrics = new Set(metrics);

    if (!newMetrics.delete(metric)) {
      newMetrics.add(metric);
      Metric[metric.key] && addRecentMetric(metric.key);
      trackEvent({
        category: 'Chart',
        action: `Showing "${metric.label} on mobile"`
      });
    } else {
      trackEvent({
        category: 'Chart',
        action: `Removing "${metric.label} on mobile"`
      });
    } // NOTE: +1 because we don't count price metric


    if (newMetrics.size > MAX_METRICS_PER_CHART + 1) {
      setIsLimitReached(true);
      return;
    } else if (isLimitReached) {
      setIsLimitReached(false);
    }

    setMetrics([...newMetrics]);
  }

  function onChangeTimeRange(timeRange) {
    const {
      from: FROM,
      to: TO
    } = getIntervalByTimeRange(timeRange);
    const interval = getNewInterval(FROM, TO, '1d', {
      isMobile: true
    });
    setSettings(_objectSpread(_objectSpread({}, settings), {}, {
      timeRange,
      interval: INTERVAL_ALIAS[interval] || interval,
      from: FROM.toISOString(),
      to: TO.toISOString()
    }));
  }

  const commonChartProps = {
    MetricColor,
    isLoading: loadings.length > 0,
    slug,
    data,
    metrics
  };
  const commonMetricsToolProps = {
    slug,
    toggleMetric,
    showLimitMessage: isLimitReached,
    activeMetrics: metrics.slice(1),
    hiddenMetrics: [PriceCurrency],
    isMobile: true
  };
  return loading ? /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.wrapper)
  }, /*#__PURE__*/React.createElement(MobileHeader, {
    title: /*#__PURE__*/React.createElement(Title, {
      slug: slug
    })
  }), /*#__PURE__*/React.createElement(PageLoader, null)) : /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.wrapper)
  }, /*#__PURE__*/React.createElement(MobileHeader, {
    title: /*#__PURE__*/React.createElement(Title, {
      slug: project.name,
      ticker: project.ticker
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.main,
    onTouchStart: () => setIsOuterEvent(true),
    onTouchCancel: () => setIsOuterEvent(false),
    onTouchEnd: () => setIsOuterEvent(false),
    ref: el => {
      if (!el) return;

      if (!width) {
        setWidth(el.getBoundingClientRect().width);
      }
    }
  }, /*#__PURE__*/React.createElement(PriceBlock, _extends({}, project, {
    slug: slug
  })), !fullscreen && /*#__PURE__*/React.createElement(AssetChart, _extends({
    icoPrice: project.icoPrice,
    icoPricePos: icoPricePos,
    setIcoPricePos: setIcoPricePos
  }, commonChartProps)), /*#__PURE__*/React.createElement("div", {
    className: styles.bottom
  }, !fullscreen && /*#__PURE__*/React.createElement(ChartSelector, {
    onChangeTimeRange: value => {
      onChangeTimeRange(value);
      setIcoPricePos(null);
    },
    timeRange: settings.timeRange,
    className: styles.selector
  }), /*#__PURE__*/React.createElement(FullscreenChart, {
    isOpen: fullscreen,
    toggleOpen: toggleFullscreen,
    project: project,
    onChangeTimeRange: onChangeTimeRange,
    timeRange: settings.timeRange,
    chartProps: commonChartProps,
    metricsToolProps: commonMetricsToolProps
  })), !hasPremium && metrics.length > 0 && /*#__PURE__*/React.createElement(MobileProPopup, null), /*#__PURE__*/React.createElement(ChartMetricsTool, _extends({
    classes: styles,
    addMetricBtnText: "Add metrics",
    className: styles.metricsPopup
  }, commonMetricsToolProps)), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.selected, metrics.length === 0 && styles.hide)
  }, metrics.length > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: styles.heading
  }, "Selected Metrics"), metrics.map(metric => metric.key === PriceCurrency.key ? null : /*#__PURE__*/React.createElement(MobileMetricCard, {
    metric: metric,
    ticker: project.ticker,
    isSelected: true,
    onToggleMetric: () => toggleMetric(metric),
    key: metric.label + 'selected',
    hasPremium: hasPremium,
    errorsMetricsKeys: ErrorMsg,
    colors: MetricColor,
    width: width,
    project: project,
    slug: slug,
    isOuterEvent: isOuterEvent
  })))), isLimitReached && /*#__PURE__*/React.createElement("div", {
    className: styles.limit
  }, "To add a new metric, please de-select another one"), /*#__PURE__*/React.createElement(RecentlyUsedMetrics, {
    slug: slug,
    metrics: metrics,
    width: width,
    hasPremium: hasPremium,
    errorsMetricsKeys: ErrorMsg,
    isOuterEvent: isOuterEvent,
    project: project,
    onToggleMetric: toggleMetric
  }), /*#__PURE__*/React.createElement(MobilePopularMetrics, {
    slug: slug,
    metrics: metrics,
    width: width,
    hasPremium: hasPremium,
    errorsMetricsKeys: ErrorMsg,
    isOuterEvent: isOuterEvent,
    project: project,
    onToggleMetric: toggleMetric
  })));
};

export default graphql(PROJECT_BY_SLUG_MOBILE_QUERY, {
  skip: ({
    match
  }) => !match.params.slug,
  options: ({
    match
  }) => ({
    variables: {
      slug: match.params.slug
    }
  })
})(MobileDetailedPage);
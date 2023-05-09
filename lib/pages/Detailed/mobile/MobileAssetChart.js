const _excluded = ["data", "slug", "icoPrice", "metrics", "MetricColor", "setIcoPricePos", "icoPricePos", "chartHeight", "isLoading", "isLandscapeMode"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import withSizes from 'react-sizes';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import throttle from 'lodash.throttle';
import Gradients from '../../../components/Gradients';
import { Metric } from '../../../ducks/dataHub/metrics';
import { tooltipLabelFormatter } from '../../../ducks/SANCharts/CustomTooltip';
import { generateMetricsMarkup } from '../../../ducks/SANCharts/utils';
import { clearCache } from '../../../ducks/Chart/Synchronizer';
import Loader from '../../../ducks/Chart/Loader/Loader';
import CommonChartTooltip from '../../../ducks/SANCharts/tooltip/CommonChartTooltip';
import MobilePriceTooltip from '../../../ducks/SANCharts/tooltip/MobilePriceTooltip';
import IcoPriceTooltip from '../../../ducks/SANCharts/tooltip/IcoPriceTooltip';
import styles from './MobileAssetChart.module.css';

const MobileAssetChart = _ref => {
  let {
    data = [],
    slug: asset,
    icoPrice,
    metrics = [],
    MetricColor,
    setIcoPricePos,
    icoPricePos,
    chartHeight,
    isLoading = true,
    isLandscapeMode
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [isTouch, setIsTouch] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const markup = generateMetricsMarkup(metrics, {
    syncedColors: MetricColor,
    useShortName: true,
    activeLineDataKey: Metric.price_usd.key,
    showActiveDot: false
  });
  const chartMediumIndex = data.length / 2;

  const hideTooltipItem = key => key === Metric.price_usd.key;

  const setCurrentIndex = throttle(evt => setActiveIndex(evt ? evt.activeTooltipIndex : null), 800);
  useEffect(() => clearCache);
  return /*#__PURE__*/React.createElement("div", {
    onTouchStart: () => setIsTouch(true),
    onTouchEnd: () => setIsTouch(false),
    onTouchCancel: () => setIsTouch(false),
    className: styles.chart
  }, icoPrice && icoPricePos !== null && !isTouch && /*#__PURE__*/React.createElement(IcoPriceTooltip, {
    y: icoPricePos,
    value: icoPrice
  }), isLoading && /*#__PURE__*/React.createElement(Loader, {
    className: styles.loader
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: chartHeight
  }, /*#__PURE__*/React.createElement(ComposedChart, {
    data: data,
    onMouseMove: setCurrentIndex,
    margin: {
      left: 0,
      right: 0
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement(Gradients, null)), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "datetime",
    hide: true
  }), /*#__PURE__*/React.createElement(YAxis, {
    hide: true,
    domain: [dataMin => {
      if (isFinite(dataMin) && icoPrice - dataMin < 0) {
        setIcoPricePos(0);
      }

      return dataMin;
    }, dataMax => {
      if (isFinite(dataMax) && icoPrice - dataMax > 0) {
        setIcoPricePos(0);
      }

      return dataMax;
    }],
    dataKey: Metric.price_usd.key
  }), isTouch && /*#__PURE__*/React.createElement(Tooltip, {
    wrapperStyle: {
      zIndex: 999999,
      position: 'fixed'
    },
    isAnimationActive: false,
    cursor: {
      stroke: 'var(--casper)'
    },
    position: {
      x: 0,
      y: 0
    },
    content: props => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MobilePriceTooltip, _extends({}, props, {
      labelFormatter: tooltipLabelFormatter
    })), /*#__PURE__*/React.createElement(CommonChartTooltip, _extends({}, props, {
      withLabel: false,
      className: cx(styles.tooltip, activeIndex < chartMediumIndex && metrics.length > 2 && styles.rightAlign),
      hideItem: hideTooltipItem,
      metrics: metrics
    })))
  }), markup, icoPrice && /*#__PURE__*/React.createElement(ReferenceLine, {
    strokeDasharray: "5 5",
    stroke: isTouch ? 'transparent' : 'var(--waterloo)',
    yAxisId: "axis-price_usd",
    y: icoPrice,
    label: ({
      viewBox: {
        y
      }
    }) => setIcoPricePos(y)
  }))));
};

const mapSizesToProps = ({
  width,
  height
}) => ({
  chartHeight: (width > height ? height : width) / 2,
  isLandscapeMode: width > height
});

export default withSizes(mapSizesToProps)(MobileAssetChart);
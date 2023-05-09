function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { SignalTypeIcon } from '../../../../components/SignalCard/controls/SignalControls';
import SignalPreviewChart from '../../../Signals/chart/preview/SignalPreviewChart';
import StatusLabel from '../../../../components/StatusLabel';
import AlertChannelsTooltip from '../AlertChannelsTooltip/AlertChannelsTooltip';
import Share from './Share/Share';
import { prepareAlertTitle } from '../../../Signals/link/utils';
import { useHistoricalTriggerPoints } from '../../hooks/useHistoricalTriggerPoints';
import { filterPoints } from '../AlertPreview/AlertPreview';
import { useSignal } from '../../hooks/useSignal';
import externalStyles from '../../../../ducks/Signals/link/OpenSignalLink.module.css';
import styles from './AlertMobilePreview.module.css';
import PageLoader from '../../../../components/Loader/PageLoader';

const Chart = ({
  signalData
}) => {
  const {
    settings: {
      type,
      target: {
        slug
      } = {},
      target,
      selector
    } = {}
  } = signalData;
  const shouldRenderChart = type === 'wallet_movement' ? selector.slug : slug;
  const {
    data: {
      historicalTriggerPoints: points = []
    } = {},
    error,
    loading
  } = useHistoricalTriggerPoints(_objectSpread(_objectSpread({}, signalData), {}, {
    skip: !shouldRenderChart
  }));
  let chart = null;

  if (!loading && !error && shouldRenderChart) {
    chart = /*#__PURE__*/React.createElement(SignalPreviewChart, {
      type: type,
      points: filterPoints(points, signalData),
      showTitle: true,
      target: target,
      trigger: signalData,
      hideTooltip: true
    });
  }

  return chart && /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, chart);
};

const AlertMobilePreview = ({
  id,
  signal,
  isRecommendedSignal,
  isAuthor = false
}) => {
  const [signalData, setSignalData] = useState(signal);
  const {
    data,
    loading: loadingSignalData
  } = useSignal({
    id,
    skip: !id || signal
  });
  useEffect(() => {
    if (data) {
      setSignalData(data.trigger.trigger);
    }
  }, [loadingSignalData]);

  if (loadingSignalData || !signalData) {
    return /*#__PURE__*/React.createElement(PageLoader, null);
  }

  const {
    isFrozen,
    settings: {
      type,
      metric
    } = {},
    title,
    isPublic
  } = signalData;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(SignalTypeIcon, {
    type: type,
    metric: metric,
    isFrozen: isFrozen
  }), /*#__PURE__*/React.createElement("div", {
    className: "column mrg-m mrg--l"
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(externalStyles.link, styles.link)
  }, prepareAlertTitle(title, isFrozen)), !isRecommendedSignal && /*#__PURE__*/React.createElement("div", {
    className: "row v-center mrg-m mrg--t mrg--b"
  }, /*#__PURE__*/React.createElement(StatusLabel, {
    isPublic: isPublic,
    isFrozen: isFrozen,
    isPreview: true
  }), signalData && signalData.settings && signalData.settings.channel && /*#__PURE__*/React.createElement(AlertChannelsTooltip, {
    signal: signalData,
    isPreview: true
  })))), /*#__PURE__*/React.createElement(Chart, {
    signalData: signalData
  }), /*#__PURE__*/React.createElement("div", {
    className: "mrg-m mrg--t"
  }, /*#__PURE__*/React.createElement(Share, {
    signal: signalData,
    isAuthor: isAuthor
  })));
};

export default AlertMobilePreview;
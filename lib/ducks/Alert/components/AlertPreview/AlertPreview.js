function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cx from 'classnames';
import Button from '@santiment-network/ui/Button';
import NoSignalPreview from '../../../Signals/chart/preview/NoSignalPreview';
import CopySignal from '../../../../components/SignalCard/controls/CopySignal';
import EmptySection from '../../../../components/EmptySection/EmptySection';
import { SignalTypeIcon } from '../../../../components/SignalCard/controls/SignalControls';
import SignalPreviewChart from '../../../Signals/chart/preview/SignalPreviewChart';
import PageLoader from '../../../../components/Loader/PageLoader';
import { prepareAlertTitle } from '../../../Signals/link/utils';
import { isUnsupportedTrigger } from './utils';
import { useHistoricalTriggerPoints } from '../../hooks/useHistoricalTriggerPoints';
import alertMasterFormStyles from '../../AlertModalFormMaster.module.css';
import styles from './AlertPreview.module.css';
export const filterPoints = (points, {
  settings: {
    metric
  } = {}
}) => {
  switch (metric) {
    case 'mvrv_usd_intraday':
      {
        const last = points[points.length - 1];

        if (last && last.current !== 0) {
          return points;
        }

        return points.slice(0, points.length - 1);
      }

    default:
      {
        return points;
      }
  }
};

const AlertPreview = ({
  setIsPreview,
  signal,
  handleCloseDialog,
  shouldDisableActions
}) => {
  const {
    id,
    title,
    settings: {
      target: {
        slug
      },
      target,
      selector
    },
    settings
  } = signal;
  const shouldRenderChart = settings.type === 'wallet_movement' ? selector.slug : slug;
  const isUnsupported = isUnsupportedTrigger(signal);
  const {
    data: {
      historicalTriggerPoints: points = []
    } = {},
    error,
    loading
  } = useHistoricalTriggerPoints(_objectSpread(_objectSpread({}, signal), {}, {
    skip: !shouldRenderChart
  }));
  let children = null;
  let chart = /*#__PURE__*/React.createElement(NoSignalPreview, {
    className: styles.noChart
  });

  if (!loading && !error && shouldRenderChart) {
    chart = /*#__PURE__*/React.createElement(SignalPreviewChart, {
      type: settings.type,
      points: filterPoints(points, signal),
      showExpand: true,
      showTitle: true,
      target: target,
      trigger: signal
    });
  }

  if (loading) {
    chart = /*#__PURE__*/React.createElement(PageLoader, {
      containerClass: "row hv-center",
      className: styles.loader
    });
  }

  if (settings && settings.type) {
    const {
      type,
      metric
    } = settings;
    children = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "row mrg--b mrg-xl"
    }, /*#__PURE__*/React.createElement(SignalTypeIcon, {
      type: type,
      metric: metric
    }), /*#__PURE__*/React.createElement("div", {
      className: "btn c-black body-1 mrg--l mrg-l"
    }, prepareAlertTitle(title))), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.chartWrapper, 'row h-center mrg--b mrg-xl', !shouldRenderChart && !loading && styles.noChartWrapper)
    }, chart), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.divider, 'mrg--b mrg-xl')
    }), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.actions, 'row')
    }, /*#__PURE__*/React.createElement(CopySignal, {
      signal: signal,
      label: "Copy to my alerts",
      onClose: handleCloseDialog,
      classes: {
        copyBtn: cx('btn-1 btn--green', styles.copyBtn, shouldDisableActions && 'c-waterloo')
      },
      btnParams: {
        disabled: shouldDisableActions
      }
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: shouldDisableActions,
      onClick: () => setIsPreview(false),
      border: true
    }, "Open alert")));
  }

  if (!id) {
    children = /*#__PURE__*/React.createElement(EmptySection, {
      className: cx(alertMasterFormStyles.notSignalInfo, 'column hv-center body-3')
    }, "Alert doesn't exist", /*#__PURE__*/React.createElement("br", null), "or it's a private alert.");
  }

  if (isUnsupported) {
    return /*#__PURE__*/React.createElement(EmptySection, {
      className: cx(alertMasterFormStyles.notSignalInfo, 'column hv-center body-3')
    }, "This type of alerts is deprecated.");
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, 'column')
  }, children);
};

export default AlertPreview;
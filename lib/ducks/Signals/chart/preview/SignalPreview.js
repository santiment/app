import React from 'react';
import { Query } from '@apollo/react-components';
import { getAvailableCooldown } from './utils';
import SignalPreviewChart from './SignalPreviewChart';
import PreviewLoader from './Loader';
import { skipHistoricalPreview } from '../../utils/utils';
import { HISTORICAL_TRIGGER_POINTS_QUERY } from '../../epics';
import styles from './SignalPreview.module.css';

const filterPoints = (points, {
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

const SignalPreview = ({
  type,
  trigger = {},
  showExpand = true,
  showTitle = true
}) => {
  const {
    settings: {
      target,
      asset
    } = {},
    cooldown
  } = trigger;

  if (!target && !asset) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Query, {
    query: HISTORICAL_TRIGGER_POINTS_QUERY,
    skip: skipHistoricalPreview(trigger),
    variables: {
      cooldown: getAvailableCooldown(cooldown),
      settings: JSON.stringify(trigger.settings)
    }
  }, ({
    data: {
      historicalTriggerPoints: points = [],
      error,
      loading
    } = {}
  }) => {
    if (loading) {
      return PreviewLoader;
    }

    const isError = error && (!points || points.length === 0);

    if (isError) {
      return /*#__PURE__*/React.createElement("div", {
        className: styles.loaderWrapper
      }, "Something's gone wrong.", /*#__PURE__*/React.createElement("br", null), "Backtesting chart is unavailable.");
    }

    return /*#__PURE__*/React.createElement(SignalPreviewChart, {
      type: type,
      points: filterPoints(points, trigger),
      showExpand: showExpand,
      showTitle: showTitle,
      target: target,
      trigger: trigger
    });
  });
};

export default SignalPreview;
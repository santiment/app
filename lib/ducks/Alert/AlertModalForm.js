function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect } from 'react';
import { Form } from 'formik';
import AlertModalSidebar from './components/AlertModalSidebar/AlertModalSidebar';
import AlertModalContent from './components/AlertModalContent/AlertModalContent';
import { useUpdateFinishedSteps } from './hooks/useUpdateFinishedSteps';
import { useUpdateNameAndDescription } from './hooks/useUpdateNameAndDescription';
import { ALERT_TYPES } from './constants';
import styles from './AlertModalForm.module.css';

const AlertModalForm = ({
  selectorSettings,
  values,
  setValues,
  initialValues,
  hasSignal,
  signal,
  isEdited,
  isModalOpen,
  isSharedTrigger,
  isRecommendedSignal,
  isRestrictedMessageClosed
}) => {
  const {
    setSelectedType,
    selectedType,
    visitedSteps,
    finishedSteps,
    setFinishedSteps,
    selectedStep,
    setFormPreviousValues,
    setInitialState
  } = selectorSettings;
  useUpdateFinishedSteps({
    selectedType,
    visitedSteps,
    finishedSteps,
    setFinishedSteps,
    values,
    isModalOpen
  });
  useUpdateNameAndDescription({
    selectedType,
    selectedStep,
    values,
    hasSignal,
    isEdited
  });
  useEffect(() => {
    setFormPreviousValues(values);
  }, [values]);
  useEffect(() => {
    if (signal) {
      const channel = signal.settings.channel;
      const channelSetting = Array.isArray(channel) ? channel : [channel];
      setSelectedType(ALERT_TYPES.find((item, index) => {
        if (signal.settings.type === 'metric_signal' || signal.settings.type === 'daily_metric_signal') {
          if (signal.settings.target.slug) {
            return index === 0;
          }

          if (signal.settings.target.watchlist_id) {
            return index === 1;
          }
        }

        if (signal.settings.type === 'wallet_usd_valuation' || signal.settings.type === 'wallet_assets_held') {
          return index === 3;
        }

        return item.settings.type === signal.settings.type;
      }));

      if (signal.id) {
        setValues(_objectSpread(_objectSpread({}, signal), {}, {
          settings: _objectSpread(_objectSpread({}, signal.settings), {}, {
            channel: channelSetting
          })
        }));
        setFormPreviousValues(_objectSpread(_objectSpread({}, signal), {}, {
          settings: _objectSpread(_objectSpread({}, signal.settings), {}, {
            channel: channelSetting
          })
        }));
        setInitialState(_objectSpread(_objectSpread({}, signal), {}, {
          settings: _objectSpread(_objectSpread({}, signal.settings), {}, {
            channel: channelSetting
          })
        }));
      } else {
        setValues(_objectSpread(_objectSpread(_objectSpread({}, initialValues), signal), {}, {
          settings: _objectSpread(_objectSpread({}, signal.settings), {}, {
            channel: channelSetting
          })
        }));
        setFormPreviousValues(_objectSpread(_objectSpread(_objectSpread({}, initialValues), signal), {}, {
          settings: _objectSpread(_objectSpread({}, signal.settings), {}, {
            channel: channelSetting
          })
        }));
        setInitialState(_objectSpread(_objectSpread(_objectSpread({}, initialValues), signal), {}, {
          settings: _objectSpread(_objectSpread({}, signal.settings), {}, {
            channel: channelSetting
          })
        }));
      }
    }

    return () => {
      setValues(initialValues);
    };
  }, [signal]);
  let isMetricsDisabled;
  const hasTarget = values.settings.target;

  if (selectedType) {
    switch (selectedType.title) {
      case 'Asset':
        const slug = hasTarget && values.settings.target.slug;
        isMetricsDisabled = typeof slug === 'string' ? !slug : slug && slug.length === 0;
        break;

      case 'Watchlist':
        const watchlist = hasTarget && values.settings.target.watchlist_id;
        isMetricsDisabled = !watchlist;
        break;

      case 'Screener':
        const screener = values.settings.operation.selector && values.settings.operation.selector.watchlist_id;
        isMetricsDisabled = !screener;
        break;

      default:
        isMetricsDisabled = false;
    }

    return /*#__PURE__*/React.createElement(Form, {
      className: styles.wrapper
    }, /*#__PURE__*/React.createElement(AlertModalSidebar, {
      isRestrictedMessageClosed: isRestrictedMessageClosed,
      isRecommendedSignal: isRecommendedSignal,
      isEdited: isEdited,
      isSharedTrigger: isSharedTrigger,
      isMetricsDisabled: isMetricsDisabled,
      selectorSettings: selectorSettings,
      values: values,
      hasSignal: hasSignal
    }), /*#__PURE__*/React.createElement(AlertModalContent, {
      selectorSettings: selectorSettings
    }));
  } else {
    return null;
  }
};

export default AlertModalForm;
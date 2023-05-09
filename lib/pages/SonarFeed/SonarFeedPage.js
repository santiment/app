const _excluded = ["id", "params"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import SignalMasterModalForm from '../../ducks/Signals/signalModal/SignalMasterModalForm';
import { ALERT_ROUTES } from '../../ducks/Signals/common/constants';
import { getShareSignalParams, useSignal } from '../../ducks/Signals/common/getSignal';
import { METRIC_TYPES } from '../../ducks/Signals/utils/constants';
import ScreenerSignalDialog from '../../ducks/Signals/ScreenerSignal/ScreenerSignalDialog';
export const SignalModal = _ref => {
  let {
    id: triggerId,
    params
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const shareSignalParams = getShareSignalParams(params);
  const isOpen = !!triggerId;
  const {
    data = {},
    loading
  } = useSignal({
    triggerId,
    skip: !isOpen
  });

  if (loading || !data) {
    return null;
  }

  const {
    trigger: {
      trigger = {}
    } = {}
  } = data;
  const {
    settings: {
      type
    } = {}
  } = trigger;

  switch (type) {
    case METRIC_TYPES.SCREENER_SIGNAL:
      {
        return /*#__PURE__*/React.createElement(ScreenerSignalDialog, {
          signal: trigger,
          defaultOpen: isOpen,
          goBackTo: ALERT_ROUTES.ALERTS
        });
      }

    default:
      {
        return /*#__PURE__*/React.createElement(SignalMasterModalForm, _extends({
          id: triggerId,
          shareParams: shareSignalParams,
          defaultOpen: isOpen
        }, rest));
      }
  }
};
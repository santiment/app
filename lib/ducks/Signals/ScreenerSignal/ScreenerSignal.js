function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect, useCallback } from 'react';
import { Formik } from 'formik';
import { mapFormPropsToScreenerTrigger, mapTriggerToFormProps, validateChannels } from '../utils/utils';
import ScreenerAlertForm from './ScreenerAlertForm';
export const SreenerSignal = ({
  signal,
  watchlist,
  onCancel,
  onSubmit
}) => {
  const {
    id = 0
  } = signal;
  const isNew = !(id > 0);
  const [initialValues, setInitialValues] = useState(mapTriggerToFormProps(signal));
  useEffect(() => {
    setInitialValues(mapTriggerToFormProps(signal));
  }, [signal]);
  const toggleSignalActive = useCallback(values => {
    const newValues = _objectSpread(_objectSpread({}, values), {}, {
      isActive: !values.isActive
    });

    setInitialValues(newValues);
  }, [setInitialValues]);
  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: initialValues,
    enableReinitialize: true,
    validate: validateChannels,
    onSubmit: formProps => {
      onSubmit(mapFormPropsToScreenerTrigger({
        formProps,
        signal
      }));
    }
  }, props => /*#__PURE__*/React.createElement(ScreenerAlertForm, {
    toggleSignalActive: toggleSignalActive,
    watchlist: watchlist,
    onCancel: onCancel,
    isNew: isNew,
    form: props,
    setInitialValues: setInitialValues
  }));
};
export default SreenerSignal;
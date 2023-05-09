function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import { push } from 'react-router-redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createTrigger, updateTrigger } from '../../common/actions';
import { mapTriggerToFormProps, mapFormPropsToTrigger, getNewTitle, getNewDescription } from '../../utils/utils';
import { ALERT_ROUTES } from '../../common/constants';
import TriggerForm from '../signalCrudForm/signal/TriggerForm';
import SharedTriggerForm from '../sharedForm/SharedTriggerForm';
import { DEFAULT_FORM_META_SETTINGS, METRIC_DEFAULT_VALUES, PRICE_PERCENT_CHANGE } from '../../utils/constants';
import { checkIsLoggedIn } from '../../../../pages/UserSelectors';
import SignalCard from '../../../../components/SignalCard/card/SignalCard';
import styles from '../signalCrudForm/signal/TriggerForm.module.css';

const mapFormSettings = (baseSettings, meta) => {
  const formMetric = meta && meta.metric ? meta.metric.value.value : PRICE_PERCENT_CHANGE;

  const metaFormSettings = _objectSpread(_objectSpread({}, DEFAULT_FORM_META_SETTINGS), {}, {
    ethAddress: baseSettings.ethAddress
  }, meta);

  let settings = _objectSpread(_objectSpread({}, METRIC_DEFAULT_VALUES[formMetric]), {}, {
    target: metaFormSettings.target.value ? metaFormSettings.target.value : baseSettings.target,
    metric: metaFormSettings.metric.value ? metaFormSettings.metric.value : baseSettings.metric,
    type: metaFormSettings.type.value ? metaFormSettings.type.value : baseSettings.type,
    signalType: metaFormSettings.signalType.value ? metaFormSettings.signalType.value : baseSettings.signalType,
    ethAddress: metaFormSettings.ethAddress
  }, baseSettings);

  if (!settings.title && !settings.description) {
    settings = _objectSpread({
      title: getNewTitle(settings),
      description: getNewDescription(settings)
    }, settings);
  }

  return [settings, metaFormSettings];
};

const getFormData = (stateTrigger, metaFormSettings) => mapFormSettings(mapTriggerToFormProps(stateTrigger), metaFormSettings);

const SignalMaster = ({
  canRedirect = true,
  trigger: {
    trigger: propsTrigger = {},
    userId
  } = {},
  metaFormSettings,
  setTitle,
  onClose,
  redirect,
  updateTrigger,
  createTrigger,
  formChangedCallback,
  setSharedPreview,
  isShared = false,
  isSharedPreview = false,
  toggleAnon,
  isLoggedIn
}) => {
  const [stateTrigger, setStateTrigger] = useState(_objectSpread({
    title: '',
    description: '',
    isActive: true,
    isPublic: false
  }, propsTrigger));
  const [formData, setFormData] = useState(() => getFormData(stateTrigger, metaFormSettings));
  useEffect(() => {
    if (propsTrigger.id && !stateTrigger.id) {
      setStateTrigger(_objectSpread({}, propsTrigger));
    }
  }, [propsTrigger, stateTrigger.id]);
  useEffect(() => {
    setFormData(getFormData(stateTrigger, metaFormSettings));
  }, [stateTrigger, metaFormSettings]);
  const handleSettingsChange = useCallback(formProps => {
    const data = mapFormPropsToTrigger(formProps, stateTrigger);
    const {
      id
    } = data;

    if (id > 0 && !isShared) {
      updateTrigger(data);
    } else {
      delete data.id;
      createTrigger(data);
    }

    onClose && onClose();
    canRedirect && redirect && redirect();
  }, [stateTrigger, updateTrigger, isShared, createTrigger, onClose, canRedirect, redirect, mapFormPropsToTrigger]);
  const [settings, metaForm] = formData;
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, isSharedPreview && styles.sharedForm)
  }, !isSharedPreview && /*#__PURE__*/React.createElement(TriggerForm, {
    setTitle: setTitle,
    id: stateTrigger.id,
    isShared: isShared,
    metaFormSettings: metaForm,
    settings: settings,
    onSettingsChange: handleSettingsChange,
    onRemovedSignal: onClose || redirect,
    formChangedCallback: formChangedCallback
  }), isSharedPreview && /*#__PURE__*/React.createElement(SharedTriggerForm, {
    trigger: stateTrigger,
    onOpen: data => isLoggedIn ? setSharedPreview(data) : toggleAnon(),
    onCreate: () => isLoggedIn ? handleSettingsChange(settings) : toggleAnon(),
    settings: settings,
    originalTrigger: propsTrigger,
    userId: userId,
    SignalCard: SignalCard
  }));
};

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch(createTrigger(payload));
  },
  updateTrigger: payload => {
    dispatch(updateTrigger(payload));
  },
  redirect: () => {
    dispatch(push(ALERT_ROUTES.ALERTS));
  }
});

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));
export default enhance(SignalMaster);
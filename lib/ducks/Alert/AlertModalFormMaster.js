function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo';
import isEqual from 'lodash.isequal';
import { track } from 'san-webkit/lib/analytics';
import { getSavedJson } from 'san-webkit/lib/utils/localStorage';
import PageLoader from '../../components/Loader/PageLoader';
import AlertTypeSelector from './components/AlertTypeSelector/AlertTypeSelector';
import EmptySection from '../../components/EmptySection/EmptySection';
import AlertPreview from './components/AlertPreview/AlertPreview';
import AlertModalForm from './AlertModalForm';
import { createTrigger, updateTrigger } from '../Signals/common/actions';
import { useUser } from '../../stores/user';
import { useSignal } from './hooks/useSignal';
import { getMetricSignalKey, validateFormSteps } from './utils';
import { GET_METRIC_MIN_INTERVAL } from './hooks/queries';
import { AlertsEvents } from './analytics';
import styles from './AlertModalFormMaster.module.css';
const initialValues = {
  cooldown: '1d',
  description: '',
  iconUrl: '',
  isActive: true,
  isPublic: false,
  isRepeating: true,
  settings: {
    type: 'metric_signal',
    metric: '',
    target: {
      slug: ''
    },
    channel: [],
    time_window: '',
    operation: {}
  },
  tags: [],
  title: ''
};

const AlertModalFormMaster = ({
  defaultType,
  createAlert,
  updateAlert,
  handleCloseDialog,
  setIsEdited,
  isEdited,
  signalData,
  id,
  isModalOpen,
  isPreview,
  setIsPreview,
  shouldHideRestrictionMessage,
  shouldDisableActions,
  isRecommendedSignal,
  isRestrictedMessageClosed
}) => {
  const [formPreviousValues, setFormPreviousValues] = useState(initialValues);
  const [selectedType, setSelectedType] = useState(defaultType);
  const [initialState, setInitialState] = useState(initialValues);
  const [selectedStep, setSelectedStep] = useState(undefined);
  const [visitedSteps, setVisitedSteps] = useState([]);
  const [finishedSteps, setFinishedSteps] = useState([]);
  const [invalidSteps, setInvalidSteps] = useState([]);
  const visitedStepsMemo = useMemo(() => new Set(visitedSteps), [visitedSteps]);
  const invalidStepsMemo = useMemo(() => new Set(invalidSteps), [invalidSteps]);
  const finishedStepsMemo = useMemo(() => new Set(finishedSteps), [finishedSteps]);
  const {
    user
  } = useUser();
  const {
    data = {},
    loading,
    error
  } = useSignal({
    id,
    skip: !id || signalData
  });
  const metric = formPreviousValues.settings.metric;
  const {
    refetch
  } = useQuery(GET_METRIC_MIN_INTERVAL, {
    variables: {
      metric
    },
    skip: !metric
  });
  const isSharedTrigger = data && data.trigger && +data.trigger.authorId !== +user.id || signalData && signalData.trigger && +signalData.trigger.authorId !== +signalData.id;
  useEffect(() => {
    track.event(AlertsEvents.OpenAlert);

    if (id || signalData) {
      track.event(AlertsEvents.ClickEditAlert);
      setSelectedStep(0);
    }
  }, [id, signalData]);
  useEffect(() => {
    let lastSavedNotificationSettings = getSavedJson('LAST_TRIGGER_NOTIFICATION_SETTINGS');
    let isFormEdited = !isEqual(formPreviousValues, initialState) && !isPreview;

    if (lastSavedNotificationSettings && lastSavedNotificationSettings.length > 0) {
      const updatedInitialState = _objectSpread(_objectSpread({}, initialState), {}, {
        settings: _objectSpread(_objectSpread({}, initialState.settings), {}, {
          channel: lastSavedNotificationSettings
        })
      });

      isFormEdited = !isEqual(formPreviousValues, updatedInitialState) && !isPreview;
    }

    if (isFormEdited) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }

    if (!isModalOpen) {
      setIsEdited(false);
    }
  }, [formPreviousValues, initialState, isModalOpen, isPreview]);

  async function submitFormValues({
    values,
    setSubmitting
  }) {
    const triggerValues = _objectSpread(_objectSpread({}, values), {}, {
      settings: _objectSpread(_objectSpread({}, values.settings), {}, {
        type: selectedType.settings.type
      })
    });

    if (selectedType.settings.type === 'wallet_movement') {
      triggerValues.settings.type = values.settings.type;
    }

    if (selectedType.settings.type === 'metric_signal') {
      const {
        data
      } = await refetch({
        metric: triggerValues.settings.metric
      });
      triggerValues.settings.type = getMetricSignalKey(data.metric.metadata.minInterval);
    }

    if (id && !isSharedTrigger && !isRecommendedSignal) {
      updateAlert(_objectSpread({
        id
      }, triggerValues));
      track.event(AlertsEvents.EditAlert);
    } else {
      localStorage.setItem('LAST_TRIGGER_NOTIFICATION_SETTINGS', JSON.stringify(triggerValues.settings.channel));
      createAlert(triggerValues);
      track.event(AlertsEvents.CreateAlert);
    }

    setSubmitting(false);
    handleCloseDialog();
  }

  function handleSubmit(values, {
    setSubmitting
  }) {
    validateFormSteps({
      type: selectedType,
      values,
      setInvalidSteps,
      submitForm: () => submitFormValues({
        values,
        setSubmitting
      })
    });
  }

  const selectorSettings = useMemo(() => ({
    selectedType,
    setSelectedType,
    selectedStep,
    setSelectedStep,
    visitedSteps: visitedStepsMemo,
    setVisitedSteps,
    finishedSteps: finishedStepsMemo,
    setFinishedSteps,
    id,
    initialState,
    setInitialState,
    formPreviousValues,
    setFormPreviousValues,
    invalidStepsMemo,
    setInvalidSteps,
    shouldHideRestrictionMessage
  }), [selectedType, setSelectedType, selectedStep, setSelectedStep, visitedStepsMemo, setVisitedSteps, finishedStepsMemo, setFinishedSteps, id, initialState, setInitialState, formPreviousValues, setFormPreviousValues, invalidStepsMemo, setInvalidSteps, shouldHideRestrictionMessage]);

  if (loading) {
    return /*#__PURE__*/React.createElement(PageLoader, {
      containerClass: styles.loaderWrapper,
      className: styles.loader
    });
  }

  if (error) {
    return /*#__PURE__*/React.createElement(EmptySection, {
      className: cx(styles.notSignalInfo, 'column hv-center')
    }, "Alert doesn't exist", /*#__PURE__*/React.createElement("br", null), "or it's a private alert.");
  }

  if (isPreview && signalData) {
    return /*#__PURE__*/React.createElement(AlertPreview, {
      shouldDisableActions: shouldDisableActions,
      setIsPreview: setIsPreview,
      signal: signalData,
      handleCloseDialog: handleCloseDialog
    });
  }

  if (selectedStep === undefined) {
    return /*#__PURE__*/React.createElement(AlertTypeSelector, {
      selectorSettings: selectorSettings,
      isRestrictedMessageClosed: isRestrictedMessageClosed
    });
  }

  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: initialState,
    onSubmit: handleSubmit,
    enableReinitialize: true
  }, formik => /*#__PURE__*/React.createElement(AlertModalForm, _extends({
    isRestrictedMessageClosed: isRestrictedMessageClosed,
    isRecommendedSignal: isRecommendedSignal,
    signal: signalData || data && data.trigger && data.trigger.trigger,
    isModalOpen: isModalOpen,
    selectorSettings: selectorSettings,
    hasSignal: !!id || signalData,
    isEdited: isEdited,
    isSharedTrigger: isSharedTrigger
  }, formik)));
};

const mapDispatchToProps = dispatch => ({
  createAlert: payload => {
    dispatch(createTrigger(payload));
  },
  updateAlert: payload => {
    dispatch(updateTrigger(payload));
  }
});

export default connect(null, mapDispatchToProps)(AlertModalFormMaster);
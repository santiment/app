function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect, Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form } from 'formik';
import isEqual from 'lodash.isequal';
import FormikEffect from '../../../../../components/formik-santiment-ui/FormikEffect';
import FormikLabel from '../../../../../components/formik-santiment-ui/FormikLabel';
import Button from '@santiment-network/ui/Button';
import RadioBtns from '@santiment-network/ui/RadioBtns';
import { METRIC_TO_TYPES, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, TRIGGER_FORM_STEPS, COMMON_PROPS_FOR_METRIC } from '../../../utils/constants';
import { couldShowChart, mapFormPropsToTrigger, validateTriggerForm, getDefaultFormValues, titleMetricValuesHeader, getNewTitle, getNewDescription } from '../../../utils/utils';
import { TriggerFormMetricValues } from '../formParts/TriggerFormMetricValues';
import TriggerFormMetricTypes from '../formParts/metricTypes/TriggerFormMetricTypes';
import { TriggerFormFrequency } from '../formParts/TriggerFormFrequency';
import SignalPreview from '../../../chart/preview/SignalPreview';
import TriggerMetricTypesResolver from '../formParts/TriggerMetricTypesResolver';
import TriggerFormBlock, { TriggerFormBlockDivider } from '../formParts/block/TriggerFormBlock';
import FormikInput from '../../../../../components/formik-santiment-ui/FormikInput';
import TriggerFormChannels from '../formParts/channels/TriggerFormChannels';
import FormikCheckbox from '../../../../../components/formik-santiment-ui/FormikCheckbox';
import SignalFormDescription from '../formParts/description/SignalFormDescription';
import { useUserSettings } from '../../../../../stores/user/settings';
import styles from './TriggerForm.module.css';

const getTitle = (formData, id, isShared) => {
  const isUpdate = id > 0 && !isShared;
  const publicWord = formData.isPublic ? 'public' : 'private';

  if (isUpdate) {
    return `Update ${publicWord} alert`;
  } else {
    return `Create ${publicWord} alert`;
  }
};

const propTypes = {
  onSettingsChange: PropTypes.func.isRequired,
  settings: PropTypes.any,
  metaFormSettings: PropTypes.any,
  triggerMeta: PropTypes.any
};
export const TriggerForm = ({
  id,
  onSettingsChange,
  settings = {},
  metaFormSettings,
  formChangedCallback,
  isShared,
  setTitle
}) => {
  const isNew = !id;
  const [initialValues, setInitialValues] = useState(settings);
  const [canCallFormChangCallback, setCanCallFormChanged] = useState(false);
  const [step, setStep] = useState(TRIGGER_FORM_STEPS.DESCRIPTION);
  useEffect(() => {
    if (!isNew && !isEqual(settings, initialValues)) {
      setInitialValues(settings);
    }
  }, [settings]);
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      !canCallFormChangCallback && setCanCallFormChanged(true);
    });
    return () => {
      clearTimeout(timeOutId);
      setCanCallFormChanged(false);
      formChangedCallback(false);
    };
  }, []);
  useEffect(() => {
    setTitle && setTitle(getTitle(initialValues, id, isShared));
  }, [initialValues.isPublic]);
  const validateAndSetStep = useCallback(newStep => {
    if (isNew) {
      newStep > step && setStep(newStep);
    }
  }, [isNew, step, setStep]);
  const {
    settings: {
      isTelegramAllowAlerts,
      isEmailAllowAlerts
    }
  } = useUserSettings();
  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: initialValues,
    isInitialValid: !isNew,
    enableReinitialize: true,
    validate: validateTriggerForm,
    onSubmit: values => {
      onSettingsChange(values);
    }
  }, ({
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
    isValid,
    validateForm
  }) => {
    const {
      metric,
      type = {},
      target,
      targetWatchlist,
      frequencyType,
      frequencyTimeType,
      isRepeating,
      ethAddress,
      isPublic,
      description,
      channels = []
    } = values;
    const mappedTrigger = mapFormPropsToTrigger(values);
    const showChart = (target || targetWatchlist) && couldShowChart(mappedTrigger.settings);
    const typeSelectors = metric.key ? COMMON_PROPS_FOR_METRIC : METRIC_TO_TYPES[metric.value];
    const showTypes = typeSelectors && typeSelectors.length > 1;
    const {
      dependencies: metricValueBlocks
    } = type;
    const showValues = showTypes || showChart || metricValueBlocks;

    if (!showValues && step === TRIGGER_FORM_STEPS.VALUES) {
      validateAndSetStep(TRIGGER_FORM_STEPS.DESCRIPTION);
    }

    const isValidForm = isValid || !errors || Object.keys(errors).length === 0;
    const showDivider = showTypes || metricValueBlocks;

    function toggleSignalPublic(isPublicTarget) {
      if (isPublicTarget !== isPublic) {
        setFieldValue('isPublic', isPublicTarget);
      }
    }

    return /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormikEffect, {
      onChange: (current, prev) => {
        let {
          values: newValues
        } = current;

        if (!isEqual(newValues, prev.values)) {
          const changedMetric = !prev.values.metric || newValues.metric.value !== prev.values.metric.value || newValues.type.value !== prev.values.type.value;

          if (changedMetric) {
            setInitialValues(getDefaultFormValues(newValues, prev.values.metric));
          }

          validateForm();

          if (isNew && !isShared) {
            !newValues.titleChangedByUser && setFieldValue('title', getNewTitle(newValues));
            !newValues.descriptionChangedByUser && setFieldValue('description', getNewDescription(newValues));
          }

          canCallFormChangCallback && formChangedCallback && formChangedCallback(true);
        }
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.triggerFormItem
    }, step >= TRIGGER_FORM_STEPS.METRICS && /*#__PURE__*/React.createElement(TriggerFormMetricTypes, {
      metaFormSettings: metaFormSettings,
      setFieldValue: setFieldValue,
      metric: metric,
      target: target,
      trigger: mappedTrigger
    }), step >= TRIGGER_FORM_STEPS.TYPES && /*#__PURE__*/React.createElement(TriggerMetricTypesResolver, {
      address: ethAddress,
      values: values,
      metaFormSettings: metaFormSettings,
      setFieldValue: setFieldValue,
      isNewSignal: isNew
    }), step >= TRIGGER_FORM_STEPS.VALUES && showValues && /*#__PURE__*/React.createElement(TriggerFormBlock, _extends({}, titleMetricValuesHeader(!!metricValueBlocks, values), {
      className: styles.chainBlock
    }), showDivider && /*#__PURE__*/React.createElement(TriggerFormMetricValues, {
      typeSelectors: typeSelectors,
      metaFormSettings: metaFormSettings,
      blocks: metricValueBlocks,
      values: values,
      showTypes: showTypes
    }), showChart && /*#__PURE__*/React.createElement(React.Fragment, null, showDivider && /*#__PURE__*/React.createElement(TriggerFormBlockDivider, null), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.preview, showDivider && styles.previewWithDiviver)
    }, /*#__PURE__*/React.createElement(SignalPreview, {
      trigger: mappedTrigger,
      type: metric.value
    })))), step >= TRIGGER_FORM_STEPS.DESCRIPTION && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(TriggerFormBlock, {
      titleLabel: "More options",
      showDescription: false,
      enabledHide: true,
      show: !isTelegramAllowAlerts || !isEmailAllowAlerts,
      className: styles.chainBlock
    }, /*#__PURE__*/React.createElement(TriggerFormChannels, {
      isNew: isNew,
      channels: channels,
      errors: errors,
      setFieldValue: setFieldValue
    }), /*#__PURE__*/React.createElement(TriggerFormBlockDivider, null), /*#__PURE__*/React.createElement(TriggerFormFrequency, {
      disabled: !isRepeating,
      metaFormSettings: metaFormSettings,
      setFieldValue: setFieldValue,
      frequencyType: frequencyType,
      metric: type.metric,
      frequencyTimeType: frequencyTimeType
    }), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.row, styles.rowTop)
    }, /*#__PURE__*/React.createElement(FormikCheckbox, {
      className: styles.isRepeating,
      name: "isRepeating",
      isActive: !isRepeating,
      label: "Disable after it triggers",
      onClick: () => {
        setFieldValue('isRepeating', !isRepeating);
      }
    })), /*#__PURE__*/React.createElement(TriggerFormBlockDivider, null), /*#__PURE__*/React.createElement("div", {
      className: styles.row
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.Field
    }, /*#__PURE__*/React.createElement(FormikLabel, {
      text: "Signal visibility"
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.triggerToggleBlock
    }, /*#__PURE__*/React.createElement(RadioBtns, {
      options: ['Public', 'Private'],
      labelOnRight: true,
      defaultSelectedIndex: isPublic ? 'Public' : 'Private',
      passSelectionIndexToItem: true,
      onSelect: value => {
        toggleSignalPublic(value === 'Public');
      },
      labelClassName: styles.checkboxLabel
    }))))), /*#__PURE__*/React.createElement("div", {
      className: cx(styles.row, styles.descriptionBlock)
    }, /*#__PURE__*/React.createElement("div", {
      className: cx(styles.Field, styles.fieldFilled)
    }, /*#__PURE__*/React.createElement(FormikLabel, {
      text: "Name of the alert"
    }), /*#__PURE__*/React.createElement(FormikInput, {
      name: "title",
      type: "text",
      minLength: MIN_TITLE_LENGTH,
      maxLength: MAX_TITLE_LENGTH,
      placeholder: "Name of the alert",
      onChange: () => setFieldValue('titleChangedByUser', true)
    }))), /*#__PURE__*/React.createElement("div", {
      className: styles.row
    }, /*#__PURE__*/React.createElement(SignalFormDescription, {
      setFieldValue: setFieldValue,
      description: description
    }))), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      disabled: !isValidForm,
      isActive: isValidForm,
      variant: 'fill',
      accent: "positive",
      className: styles.submitButton
    }, id && !isShared ? 'Update alert' : 'Create alert')));
  });
};
TriggerForm.propTypes = propTypes;
export default TriggerForm;
import React from 'react';
import { Form } from 'formik';
import isEqual from 'lodash.isequal';
import { useAlertCooldown } from './hooks';
import RadioBtns from '@santiment-network/ui/RadioBtns';
import Button from '@santiment-network/ui/Button';
import FormikEffect from '../../../components/formik-santiment-ui/FormikEffect';
import FormikLabel from '../../../components/formik-santiment-ui/FormikLabel';
import TriggerFormChannels from '../signalFormManager/signalCrudForm/formParts/channels/TriggerFormChannels';
import { TriggerFormBlockDivider } from '../signalFormManager/signalCrudForm/formParts/block/TriggerFormBlock';
import SignalFormDescription from '../signalFormManager/signalCrudForm/formParts/description/SignalFormDescription';
import AlertWeeklyReports from '../signalFormManager/signalCrudForm/formParts/weeklyReports/AlertWeeklyReports';
import { ToggleSignal } from '../../../components/SignalCard/card/SignalCardBottom';
import { SCREENER_FREQUENCES } from './utils';
import externalStyles from '../signalFormManager/signalCrudForm/signal/TriggerForm.module.css';
import styles from './ScreenerSignal.module.css';
const FREQUENCE_TYPES = SCREENER_FREQUENCES.map(({
  label
}) => label);

const ScreenerAlertForm = ({
  form: {
    values,
    errors,
    isSubmitting,
    setFieldValue,
    isValid,
    validateForm
  },
  setInitialValues,
  isNew,
  watchlist,
  onCancel,
  toggleSignalActive
}) => {
  const {
    description,
    channels = [],
    isActive
  } = values;
  const isValidForm = isValid || !errors || Object.keys(errors).length === 0;
  const {
    toggleSignalFrequency,
    cooldownInitial
  } = useAlertCooldown({
    values,
    setInitialValues
  });
  return /*#__PURE__*/React.createElement(Form, {
    className: styles.form
  }, /*#__PURE__*/React.createElement(FormikEffect, {
    onChange: (current, prev) => {
      let {
        values: newValues
      } = current;

      if (!isEqual(newValues, prev.values)) {
        validateForm();
      }
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormikLabel, {
    text: "Notify me via"
  }), /*#__PURE__*/React.createElement(TriggerFormChannels, {
    isNew: isNew,
    channels: channels,
    errors: errors,
    setFieldValue: setFieldValue
  })), /*#__PURE__*/React.createElement(TriggerFormBlockDivider, {
    className: styles.divider
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormikLabel, {
    text: "Frequency of notifications"
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.frequency
  }, /*#__PURE__*/React.createElement(RadioBtns, {
    options: FREQUENCE_TYPES,
    labelOnRight: true,
    defaultSelectedIndex: cooldownInitial,
    onSelect: toggleSignalFrequency,
    labelClassName: styles.checkboxLabel
  }))), /*#__PURE__*/React.createElement(TriggerFormBlockDivider, {
    className: styles.divider
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: externalStyles.row
  }, /*#__PURE__*/React.createElement(SignalFormDescription, {
    description: description,
    setFieldValue: setFieldValue,
    className: styles.textarea
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.reports
  }, /*#__PURE__*/React.createElement(AlertWeeklyReports, {
    watchlist: watchlist
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    disabled: !isValidForm || isSubmitting,
    variant: "fill",
    accent: "positive",
    className: styles.submit
  }, !isNew ? 'Save changes' : 'Create'), /*#__PURE__*/React.createElement(Button, {
    disabled: isSubmitting,
    border: true,
    className: styles.cancel,
    onClick: onCancel
  }, "Cancel"), !isNew && /*#__PURE__*/React.createElement(ToggleSignal, {
    isActive: isActive,
    toggleSignal: () => toggleSignalActive(values)
  })));
};

export default ScreenerAlertForm;
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import AlertModal from "./AlertModal/AlertModal";

import {
  DEFAULT_FORM_META_SETTINGS,
  METRIC_DEFAULT_VALUES,
  PRICE_PERCENT_CHANGE
} from "../Signals/utils/constants";
import {
  getNewDescription,
  getNewTitle,
  mapTriggerToFormProps
} from "../Signals/utils/utils";

const mapFormSettings = (baseSettings, meta) => {
  const formMetric =
    meta && meta.metric ? meta.metric.value.value : PRICE_PERCENT_CHANGE;

  const metaFormSettings = {
    ...DEFAULT_FORM_META_SETTINGS,
    ethAddress: baseSettings.ethAddress,
    ...meta
  };

  let settings = {
    ...METRIC_DEFAULT_VALUES[formMetric],
    target: metaFormSettings.target.value
      ? metaFormSettings.target.value
      : baseSettings.target,
    metric: metaFormSettings.metric.value
      ? metaFormSettings.metric.value
      : baseSettings.metric,
    type: metaFormSettings.type.value
      ? metaFormSettings.type.value
      : baseSettings.type,
    signalType: metaFormSettings.signalType.value
      ? metaFormSettings.signalType.value
      : baseSettings.signalType,
    ethAddress: metaFormSettings.ethAddress,
    ...baseSettings
  };

  if (!settings.title && !settings.description) {
    settings = {
      title: getNewTitle(settings),
      description: getNewDescription(settings),
      ...settings
    };
  }

  return [settings, metaFormSettings];
};

const getFormData = (stateTrigger, metaFormSettings) =>
  mapFormSettings(mapTriggerToFormProps(stateTrigger), metaFormSettings);

const AlertModalMaster = ({ triggerButtonParams }) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [formData, setFormData] = useState([]);

  const formik = useFormik({
    initialValues: {
      target: [],
      metric: {},
      type: {},
      title: "",
      description: "",
      subtitle: {},
      signalType: {}
    },
    onSubmit(val) {
      console.log(val);
    },
    validateOnChange: false
  });

  useEffect(() => {
    const data = getFormData(
      { title: "", description: "", isActive: true, isPublic: false },
      {}
    );
    setFormData(data);
    formik.setValues(values => ({ ...data[0], ...values }));
  }, []);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  const handleFormValueChange = ({ field, value }) => {
    formik.setFieldValue(field, value, false);
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  const handleOpenAlertModal = () => {
    setIsAlertModalOpen(true);
  };

  const metaForm = formData[1];

  return (
    <AlertModal
      handleFormValueChange={handleFormValueChange}
      formValues={formik.values}
      defaultIsOpen={false}
      isOpen={isAlertModalOpen}
      handleClose={handleCloseAlertModal}
      handleOpen={handleOpenAlertModal}
      triggerButtonParams={triggerButtonParams}
      metaFormSettings={metaForm}
    />
  );
};

export default AlertModalMaster;

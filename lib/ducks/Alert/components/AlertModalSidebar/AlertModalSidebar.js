import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { useFormikContext } from 'formik';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import AlertStepsSelector from '../AlertStepsSelector/AlertStepsSelector';
import AlertTooltip from '../../../../components/AlertTooltip/AlertTooltip';
import styles from './AlertModalSidebar.module.css';

const AlertModalSidebar = ({
  isMetricsDisabled,
  selectorSettings,
  values,
  hasSignal,
  isSharedTrigger,
  isEdited,
  isRecommendedSignal,
  isRestrictedMessageClosed
}) => {
  const {
    submitForm,
    isSubmitting
  } = useFormikContext();
  const {
    selectedType,
    id,
    setSelectedStep,
    setFormPreviousValues,
    setInvalidSteps,
    shouldHideRestrictionMessage
  } = selectorSettings;
  const shouldHideSubmitButton = id && !isSharedTrigger && !isEdited && !isRecommendedSignal;

  function handleReturnBack() {
    setSelectedStep(undefined);
    setFormPreviousValues(values);
    setInvalidSteps([]);
  }

  function handleSubmit() {
    if (isSubmitting) {
      submitForm();
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, !shouldHideSubmitButton && styles.submitPadding, !shouldHideRestrictionMessage && styles.wrapperResized, 'relative column justify fluid')
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.titleWrapper, 'row justify v-center')
  }, /*#__PURE__*/React.createElement("div", {
    className: "h4 c-black"
  }, selectedType.title), !hasSignal ? /*#__PURE__*/React.createElement("button", {
    className: cx(styles.backButton, 'btn body-3'),
    onClick: handleReturnBack
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-left",
    className: cx(styles.backIcon, 'mrg--r mrg-s')
  }), " Categories") : /*#__PURE__*/React.createElement(AlertTooltip, {
    isVisible: !shouldHideRestrictionMessage && isRestrictedMessageClosed,
    content: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "txt-m"
    }, "Alert with Duration Restriction."), " Your Alert will be valid for 30 days from the day it\u2019s created. To extend Alert please", ' ', /*#__PURE__*/React.createElement(Link, {
      to: "/pricing",
      className: cx(styles.link, styles.tooltipLink, 'txt-m')
    }, "Upgrade your Plan!"))
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.divider
  }), /*#__PURE__*/React.createElement(AlertStepsSelector, {
    items: selectedType.steps,
    selectorSettings: selectorSettings,
    isMetricsDisabled: isMetricsDisabled
  })), !shouldHideSubmitButton ? /*#__PURE__*/React.createElement("div", {
    className: styles.submitWrapper
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "fill",
    border: false,
    accent: "positive",
    className: cx(styles.submit, 'row h-center'),
    onClick: handleSubmit
  }, id && !isSharedTrigger && !isRecommendedSignal ? 'Apply changes' : 'Create alert')) : null);
};

export default AlertModalSidebar;
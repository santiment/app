import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import PageLoader from '../../../../../../components/Loader/PageLoader';
import NextStep from '../NextStep/NextStep';
import StepTitle from '../StepTitle/StepTitle';
import ConditionsTitle from './ConditionsTitle/ConditionsTitle';
import MetricSelector from './MetricSelector/MetricSelector';
import ConditionsSelector from './ConditionsSelector/ConditionsSelector';
import { useAvailableMetrics } from '../../../../hooks/useAvailableMetrics';
import { getMetric } from '../../../../../Studio/Sidebar/utils';
import styles from './MetricAndConditions.module.css';

const MetricAndConditions = ({
  selectorSettings: {
    setSelectedStep,
    selectedStep,
    visitedSteps,
    setVisitedSteps
  }
}) => {
  const {
    values
  } = useFormikContext();
  const {
    data,
    loading
  } = useAvailableMetrics(values.settings.target.slug);
  const [selectedMetric, setSelectedMetric] = useState(getMetric(values.settings.metric));
  const [isEditMode, setIsEditMode] = useState(false);

  function handleSelectMetric(metric) {
    setSelectedMetric(metric);
    setIsEditMode(false);
  }

  function handleNextClick() {
    setSelectedStep(selectedStep + 1);

    if (!visitedSteps.has(selectedStep + 1)) {
      setVisitedSteps(prev => [...prev, selectedStep + 1]);
    }
  }

  let children = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.titleWrapper
  }, /*#__PURE__*/React.createElement(StepTitle, {
    title: "Choose Metric",
    className: styles.title
  }), selectedMetric && /*#__PURE__*/React.createElement(NextStep, {
    label: "Conditions",
    onClick: () => setIsEditMode(false)
  })), /*#__PURE__*/React.createElement(MetricSelector, {
    metrics: data.availableMetrics,
    target: values.settings.target,
    onChange: handleSelectMetric,
    selectedMetric: selectedMetric
  }));

  if (!isEditMode && selectedMetric) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.conditionsWrapper
    }, /*#__PURE__*/React.createElement(ConditionsTitle, {
      metric: selectedMetric,
      onClick: () => setIsEditMode(true),
      handleNextClick: handleNextClick
    }), /*#__PURE__*/React.createElement(StepTitle, {
      title: "Conditions",
      size: "s"
    }), /*#__PURE__*/React.createElement(ConditionsSelector, {
      metric: selectedMetric
    }));
  }

  if (loading) {
    children = /*#__PURE__*/React.createElement(PageLoader, {
      containerClass: styles.loaderWrapper,
      className: styles.loader
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, children);
};

export default MetricAndConditions;
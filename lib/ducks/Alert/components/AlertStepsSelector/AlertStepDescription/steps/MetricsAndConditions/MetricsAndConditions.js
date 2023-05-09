import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import AlertMessage from '../../../../../../../components/Alert/AlertMessage';
import { getMetricByKey } from '../../../../../../Studio/metrics';
import { getConditionsStr, parseOperation } from '../../../../../utils';
import styles from './MetricsAndConditions.module.css';

const MetricsAndConditions = ({
  description,
  invalidStepsMemo,
  isFinished,
  selected
}) => {
  const {
    values: {
      settings: {
        metric,
        time_window,
        operation
      }
    }
  } = useFormikContext();
  const isInvalid = invalidStepsMemo.has('metric');
  useEffect(() => {
    if (metric && !operation.selector && isInvalid) {
      invalidStepsMemo.delete('metric');
    }
  }, [metric, operation, isInvalid]);
  let children = '';

  if (metric && !operation.selector) {
    const {
      selectedCount,
      selectedOperation
    } = parseOperation(operation);
    const selectedMetric = getMetricByKey(metric);
    const metricLabel = selectedMetric ? selectedMetric.label : 'Metric';
    const hasPriceIcon = selectedMetric && (selectedMetric.label.includes('price') || selectedMetric.category === 'Financial');
    const conditionsStr = getConditionsStr({
      operation: selectedOperation,
      count: selectedCount,
      timeWindow: time_window,
      hasPriceIcon: !!hasPriceIcon
    });
    children = /*#__PURE__*/React.createElement("div", {
      className: styles.wrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.item
    }, metricLabel), /*#__PURE__*/React.createElement("div", {
      className: styles.condition
    }, conditionsStr));
  } else {
    children = description || '';
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.col
  }, (selected || isFinished) && children, isInvalid && /*#__PURE__*/React.createElement(AlertMessage, {
    className: styles.error,
    error: true,
    text: "Metric is required"
  }));
};

export default MetricsAndConditions;
import React, { useEffect, useState } from 'react';
import { useField } from 'formik';
import cx from 'classnames';
import Select from '@santiment-network/ui/Select/Select';
import { track } from 'webkit/analytics';
import OperationInput from './OperationInput/OperationInput';
import OperationValue from './OperationValue/OperationValue';
import { parseOperation } from '../../../../../../utils';
import { AVAILABLE_OPERATIONS, ETH_WALLETS_OPERATIONS, MULTIPLE_VALUES_OPERATIONS, PERCENT_OPERATIONS } from './constants';
import { NEGATIVE_METRICS, PERCENT_METRICS, USD_METRICS } from '../../constants';
import { AlertsEvents } from '../../../../../../analytics';
import { formatOptionLabel } from './utils';
import styles from './OperationSelector.module.css';

function getCountDefault(value) {
  return MULTIPLE_VALUES_OPERATIONS.includes(value) ? [1, 1] : 1;
}

const OperationSelector = ({
  metric,
  isWallet
}) => {
  const [, {
    value
  }, {
    setValue
  }] = useField('settings.operation');
  const {
    selectedCount,
    selectedOperation
  } = parseOperation(value);
  const [operation, setOperation] = useState(selectedOperation && AVAILABLE_OPERATIONS.concat(isWallet ? ETH_WALLETS_OPERATIONS : []).find(op => op.value === selectedOperation) || AVAILABLE_OPERATIONS[0]);
  const [count, setCount] = useState(selectedCount || getCountDefault(operation));

  function handleChangeOperation({
    label,
    value
  }) {
    track.event(AlertsEvents.SetAlertCondition, {
      condition: label
    });
    setOperation({
      label,
      value
    });
    setCount(getCountDefault(value));
  }

  useEffect(() => {
    if (operation.value === 'some_of') {
      setValue({
        [operation.value]: [{
          percent_up: count[0]
        }, {
          percent_down: count[1]
        }]
      });
    } else {
      setValue({
        [operation.value]: count
      });
    }
  }, [operation, count]);
  const hasPriceIcon = USD_METRICS.has(metric.key);
  const isPositiveMetric = !NEGATIVE_METRICS.has(metric.key);
  const isPercentIcon = PERCENT_OPERATIONS.includes(operation.value) || PERCENT_METRICS.has(metric.key);
  const isMultipleValues = MULTIPLE_VALUES_OPERATIONS.includes(operation.value);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, isMultipleValues && styles.multiple)
  }, /*#__PURE__*/React.createElement(Select, {
    isClearable: false,
    isSearchable: false,
    className: styles.operation,
    options: AVAILABLE_OPERATIONS.concat(isWallet ? ETH_WALLETS_OPERATIONS : []),
    formatOptionLabel: formatOptionLabel,
    value: operation,
    onChange: handleChangeOperation,
    components: {
      SingleValue: OperationValue
    }
  }), /*#__PURE__*/React.createElement(OperationInput, {
    count: count,
    setCount: setCount,
    operation: operation.value,
    hasIcon: hasPriceIcon || isPercentIcon,
    iconType: isPercentIcon && 'percent',
    className: styles.inputs,
    isPositiveMetric: isPositiveMetric
  }));
};

export default OperationSelector;
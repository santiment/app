import React from 'react';
import cx from 'classnames';
import Input from '@santiment-network/ui/Input';
import styles from './OperationInput.module.css';

function getValue(e, isPositiveMetric) {
  if (!isPositiveMetric) {
    return e.target.value === '' ? '' : Number(e.target.value);
  }

  const currentValue = e.target.value < 0 ? '' : Number(e.target.value);
  return e.target.value === '' ? '' : currentValue;
}

const OperationInput = ({
  count,
  hasIcon,
  iconType,
  setCount,
  operation,
  className,
  isPositiveMetric
}) => {
  let prefix = '$';

  if (iconType === 'percent') {
    prefix = '%';
  }

  if (Array.isArray(count)) {
    function handleChangeCount(e) {
      const value = getValue(e, isPositiveMetric);

      if (value > count[1] && operation !== 'some_of') {
        setCount([value, value]);
      } else {
        setCount([value, count[1]]);
      }
    }

    function handleChangeSecondCount(e) {
      const value = getValue(e, isPositiveMetric);
      setCount([count[0], value]);
    }

    let secondInputMinValue = operation === 'some_of' ? 0 : count[0];

    if (!isPositiveMetric && operation === 'some_of') {
      secondInputMinValue = count[0];
    }

    return /*#__PURE__*/React.createElement("div", {
      className: cx(styles.wrapper, className)
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.inputWrapper
    }, hasIcon && /*#__PURE__*/React.createElement("span", {
      className: styles.prefix
    }, prefix), /*#__PURE__*/React.createElement(Input, {
      type: "number",
      value: count[0],
      onChange: handleChangeCount,
      className: hasIcon && styles.inputWithPrefix
    })), /*#__PURE__*/React.createElement("div", {
      className: styles.inputWrapper
    }, hasIcon && /*#__PURE__*/React.createElement("span", {
      className: styles.prefix
    }, prefix), /*#__PURE__*/React.createElement(Input, {
      type: "number",
      min: secondInputMinValue,
      value: count[1],
      onChange: handleChangeSecondCount,
      className: hasIcon && styles.inputWithPrefix
    })));
  }

  function handleChangeInput(e) {
    const value = getValue(e, isPositiveMetric);
    setCount(value);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.inputWrapper, className)
  }, hasIcon && /*#__PURE__*/React.createElement("span", {
    className: styles.prefix
  }, prefix), /*#__PURE__*/React.createElement(Input, {
    type: "number",
    className: cx(hasIcon && styles.inputWithPrefix),
    value: count,
    onChange: handleChangeInput
  }));
};

export default OperationInput;
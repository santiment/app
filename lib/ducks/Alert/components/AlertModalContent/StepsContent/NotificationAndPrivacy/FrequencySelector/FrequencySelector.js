import React, { useEffect, useMemo, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import cx from 'classnames';
import Select from '@santiment-network/ui/Select/Select';
import { Checkbox } from '@santiment-network/ui/Checkboxes/Checkboxes';
import Input from '@santiment-network/ui/Input';
import { getFrequencyPeriods, getFrequencyTypes } from './utils';
import styles from './FrequencySelector.module.css';
import { AVAILABLE_FREQUENCIES_FOR_METRICS } from './constants';

const FrequencySelector = () => {
  const {
    values
  } = useFormikContext();
  const [, {
    value: cooldown
  }, {
    setValue: setCooldown
  }] = useField('cooldown');
  const [, {
    value: isRepeating
  }, {
    setValue: setIsRepeating
  }] = useField('isRepeating');
  const cooldownPeriod = cooldown.slice(-1);
  const cooldownCount = cooldown.slice(0, cooldown.length - 1);
  const frequencyTypes = useMemo(() => getFrequencyTypes(values.settings.metric), []);
  const isDAA = AVAILABLE_FREQUENCIES_FOR_METRICS.has(values.settings.metric);
  const [type, setType] = useState(frequencyTypes[0]);
  const frequencyPeriods = useMemo(() => getFrequencyPeriods(type), [type]);
  const cooldownFrequencyPeriod = useMemo(() => frequencyPeriods.find(({
    value
  }) => value === cooldownPeriod), [cooldownPeriod, frequencyPeriods]);
  const [period, setPeriod] = useState(cooldown && cooldownFrequencyPeriod || frequencyPeriods[0]);
  const [count, setCount] = useState(cooldownFrequencyPeriod ? cooldownCount : period.counts.min);
  useEffect(() => {
    if (period.value && count) {
      setCooldown(count + period.value);
    }
  }, [period, count]);

  function handleChangeType(frequencyType) {
    setType(frequencyType);
    const periods = getFrequencyPeriods(frequencyType);
    setPeriod(periods[0]);
    setCount(periods[0].counts.min);
  }

  function handleIsRepeatingChange() {
    setIsRepeating(!isRepeating);
    const frequencies = getFrequencyTypes(values.settings.metric);
    const periods = getFrequencyPeriods(frequencies[0]);
    setType(frequencies[0]);
    setPeriod(periods[0]);
    setCount(periods[0].counts.min);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.inputsRow
  }, /*#__PURE__*/React.createElement(Select, {
    isDisabled: !isRepeating,
    isClearable: false,
    isSearchable: false,
    options: frequencyTypes,
    value: type,
    onChange: handleChangeType,
    className: cx(styles.frequencyType, isDAA && styles.frequencyTypeDAA),
    menuPlacement: "top"
  }), /*#__PURE__*/React.createElement(Input, {
    disabled: !isRepeating,
    type: "number",
    min: period.counts.min,
    max: period.counts.max,
    value: count,
    onChange: e => setCount(e.target.value),
    className: styles.counter
  }), /*#__PURE__*/React.createElement(Select, {
    isDisabled: !isRepeating || frequencyPeriods.length === 1,
    isClearable: false,
    isSearchable: false,
    options: frequencyPeriods,
    value: period,
    onChange: val => {
      setPeriod(val);
      setCount(val.counts.min);
    },
    className: styles.frequencyPeriod,
    menuPlacement: "top"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.inputsRow
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "isRepeating",
    isActive: !isRepeating,
    onClick: handleIsRepeatingChange
  }), /*#__PURE__*/React.createElement("label", {
    className: styles.repeatingCheckLabel,
    htmlFor: "isRepeating",
    onClick: handleIsRepeatingChange
  }, "Disable after it triggers")));
};

export default FrequencySelector;
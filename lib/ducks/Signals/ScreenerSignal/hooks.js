function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useMemo } from 'react';
import { FREQUENCY_REAL_TIME, SCREENER_FREQUENCES } from './utils';
export const useAlertCooldown = ({
  values,
  setInitialValues
}) => {
  const cooldownInitial = useMemo(() => {
    const {
      cooldown
    } = values;
    const found = SCREENER_FREQUENCES.find(({
      cooldown: targerCooldown
    }) => targerCooldown === cooldown);

    if (found) {
      return found.label;
    } else {
      return FREQUENCY_REAL_TIME.label;
    }
  }, [values]);

  function toggleSignalFrequency(val) {
    const item = SCREENER_FREQUENCES.find(({
      label
    }) => label === val);

    if (item) {
      const newValues = _objectSpread(_objectSpread({}, values), {}, {
        cooldown: item.cooldown
      });

      setInitialValues(newValues);
    }
  }

  return {
    cooldownInitial,
    toggleSignalFrequency
  };
};
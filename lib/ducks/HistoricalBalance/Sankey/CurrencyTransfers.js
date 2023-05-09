function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect, useMemo } from 'react';
import Button from '@santiment-network/ui/Button';
import Select from '@santiment-network/ui/Select/Select';
import { getCurrencyTransfers } from './currencies';
import Title from './Title';
import { useProjects } from '../../../stores/projects';
import styles from './index.module.css';
const EMPTY = [];

const useTickerRank = projects => useMemo(() => {
  const TickerRank = {};

  for (let i = 0; i < projects.length; i++) {
    TickerRank[projects[i].ticker] = i + 1;
  }

  return TickerRank;
}, [projects]);

const Option = option => {
  const {
    address,
    name,
    symbol
  } = option;
  return /*#__PURE__*/React.createElement(Button, {
    key: address + name + symbol,
    variant: "ghost",
    className: styles.currency
  }, name, " (", symbol, ")");
};

const Value = ({
  value
}) => {
  const {
    name,
    symbol
  } = value;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.currencies__value
  }, name, " (", symbol, ")");
};

const CurrencyTransfers = ({
  address,
  currency,
  setCurrency
}) => {
  const {
    projects
  } = useProjects();
  const TickerRank = useTickerRank(projects);
  const [rawCurrencies, setCurrencies] = useState(EMPTY);
  const currencies = useMemo(() => {
    if (projects.length === 0) return rawCurrencies;
    const sorted = rawCurrencies.slice().sort(({
      symbol: a
    }, {
      symbol: b
    }) => (TickerRank[a] || 99999) - (TickerRank[b] || 99999)).map(value => _objectSpread(_objectSpread({}, value), {}, {
      label: value.address
    }));
    setCurrency(sorted[0]);
    return sorted;
  }, [rawCurrencies, TickerRank]);
  useEffect(() => {
    getCurrencyTransfers(address).then(currencies => {
      setCurrencies(currencies);
    });
  }, [address]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.currencies
  }, /*#__PURE__*/React.createElement(Title, null, "Currency transfers"), /*#__PURE__*/React.createElement(Select, {
    options: currencies,
    value: currency,
    formatOptionLabel: Option,
    className: styles.currencies__select,
    onChange: setCurrency,
    valueComponent: Value,
    searchable: false,
    clearable: false
  }));
};

export default CurrencyTransfers;
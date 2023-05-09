function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useMemo, useState } from 'react';
import Tabs from '@santiment-network/ui/Tabs';
import { EXCHANGES_DEFAULT_SETTINGS, useFlowToExchanges } from './utils';
import FlowToExchanges from './FlowToExchanges';
import PageLoader from '../../../components/Loader/PageLoader';
import { sortByValue } from '../utils';
import styles from './FlowToExchangesList.module.css';
const GROUPS = {
  'Centralized Exchanges': {
    key: 'exchange_inflow_centralized'
  },
  'Decentralized Exchanges': {
    key: 'exchange_inflow_decentralized'
  }
};
const TABS = Object.keys(GROUPS);

const FlowToExchangesList = () => {
  const [tab, setTab] = useState(TABS[0]);
  const {
    data,
    loading
  } = useFlowToExchanges(EXCHANGES_DEFAULT_SETTINGS);
  const key = useMemo(() => {
    const {
      key
    } = GROUPS[tab];
    return key;
  }, [data, tab]);
  const prepared = useMemo(() => {
    return data.filter(item => item[key] !== null).map(item => _objectSpread(_objectSpread({}, item), {}, {
      value: item[key]
    })).sort(sortByValue);
  }, [data, key]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(Tabs, {
    className: styles.tabs,
    options: TABS,
    defaultSelectedIndex: tab,
    onSelect: tab => setTab(tab),
    classes: styles
  }), !loading && /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, prepared.map((item, index) => /*#__PURE__*/React.createElement(FlowToExchanges, {
    item: item,
    key: index
  }))), loading && /*#__PURE__*/React.createElement(PageLoader, null));
};

export default FlowToExchangesList;
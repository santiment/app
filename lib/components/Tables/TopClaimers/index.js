const _excluded = ["address"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import Loader from '@santiment-network/ui/Loader/Loader';
import Table from '../../../ducks/Table';
import IntervalsComponent from '../../IntervalsComponent/IntervalsComponent';
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions';
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard';
import { COLUMNS, DEFAULT_SORTING } from './columns';
import { useTopClaimers, useUNIBalances, useUNITransactionVolume } from './gql';
import styles from './index.module.css';
const to = 'utc_now';
export const RANGES = [{
  value: 7,
  label: '7d'
}, {
  value: 30,
  label: '30d'
}, {
  value: 1,
  label: '24h'
}];

function getBalance(balances = [], address) {
  const {
    balanceEnd: balance = ''
  } = balances.find(item => item.address === address) || {};
  return balance;
}

function getVolumes(volumes = [], address) {
  const {
    transactionVolumeInflow: volumeInflow = '',
    transactionVolumeOutflow: volumeOutflow = ''
  } = volumes.find(item => item.address === address) || {};
  return {
    volumeInflow,
    volumeOutflow
  };
}

function makeData({
  items,
  balances,
  volumes
}) {
  return items.map(_ref => {
    let {
      address
    } = _ref,
        rest = _objectWithoutProperties(_ref, _excluded);

    return _objectSpread(_objectSpread({
      address
    }, rest), {}, {
      balance: getBalance(balances, address)
    }, getVolumes(volumes, address));
  });
}

export const TopClaimersTableTitle = ({
  setInterval,
  loading,
  items
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement("h3", {
    className: styles.text
  }, "Top Claimers"), /*#__PURE__*/React.createElement(IntervalsComponent, {
    onChange: setInterval,
    defaultIndex: 0,
    ranges: RANGES
  }), loading && items.length > 0 && /*#__PURE__*/React.createElement(Loader, {
    className: styles.headerLoader
  }));
};

const TopClaimers = ({
  className
}) => {
  const [interval, setInterval] = useState(RANGES[0].value);
  const from = `utc_now-${interval}d`;
  const [items, loading] = useTopClaimers({
    from,
    to
  });
  const {
    isPro
  } = useUserSubscriptionStatus();
  const addresses = items.map(({
    address
  }) => address);
  const [balances] = useUNIBalances({
    addresses,
    from,
    to
  });
  const [volumes] = useUNITransactionVolume({
    addresses,
    from,
    to
  });
  const data = useMemo(() => makeData({
    items,
    balances,
    volumes
  }), [items, balances, volumes]);
  const columns = useMemo(() => COLUMNS, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopClaimersTableTitle, {
    setInterval: setInterval,
    loading: loading,
    items: items
  }), !isPro ? /*#__PURE__*/React.createElement(MakeProSubscriptionCard, {
    classes: {
      card: className
    }
  }) : /*#__PURE__*/React.createElement(Table, {
    data: data,
    columns: columns,
    options: {
      loadingSettings: {
        repeatLoading: 10,
        isLoading: loading && items.length === 0
      },
      sortingSettings: {
        defaultSorting: DEFAULT_SORTING,
        allowSort: true
      },
      stickySettings: {
        isStickyHeader: true,
        isStickyColumn: true,
        stickyColumnIdx: 0
      }
    },
    className: cx(className, styles.tableWrapper),
    classes: {
      table: styles.table,
      loader: styles.loadingWrapper,
      loaderRow: styles.loadingRow
    }
  }));
};

export default TopClaimers;
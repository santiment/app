const _excluded = ["address", "labels", "notes", "__typename"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, useEffect, useState } from 'react';
import { combineColumns } from './columns';
import WatchlistTable from '../WatchlistTable';
import { getAddressWatchlist } from './gql/queries';
import { BLOCKCHAIN_ADDRESS } from '../Watchlists/detector';
import { useColumns } from '../Watchlists/Widgets/Table/hooks';
import { SUFFIX } from '../Watchlists/Widgets/Table/Columns/builder';
import { useAddressWatchlistItems } from '../../pages/WatchlistAddresses/hooks';
import { CHECKBOX_COLUMN } from '../../ducks/_Table/columns';
const ARRAY = [];

const normalizeLabel = ({
  name
}) => name;

const normalizeBalance = value => value && value.balanceEnd;

const normalizeBalanceChange = value => value && value.balanceChangePercent;

function normalizeCSVItem(_ref) {
  let {
    address,
    labels,
    notes,
    __typename
  } = _ref,
      columns = _objectWithoutProperties(_ref, _excluded);

  const filteredColumnObj = {};
  const columnKeys = typeof columns === 'object' ? Object.keys(columns) : ARRAY;
  const filteredColumnKeys = columnKeys.filter(key => key.startsWith('_') && !key.includes(SUFFIX.BALANCE_CHART));
  filteredColumnKeys.forEach(key => {
    let item = columns[key];

    if (key.includes(SUFFIX.CURR_BALANCE)) {
      item = normalizeBalance(columns[key]);
    }

    if (key.includes(SUFFIX.BALANCE_PERCENT)) {
      item = normalizeBalanceChange(columns[key]);
    }

    filteredColumnObj[key] = item;
  });

  if (labels) {
    filteredColumnObj.labels = labels && labels.map(normalizeLabel);
  }

  if (notes) {
    filteredColumnObj.notes = notes;
  }

  return _objectSpread({
    address
  }, filteredColumnObj);
}

const refetchAddressWatchlist = (id, dynamicColumns) => getAddressWatchlist(id, dynamicColumns, 'network-only');

const normalizeCSVData = items => items.map(normalizeCSVItem);

const WatchlistAddressesTable = props => {
  const [list, setList] = useState(props.watchlist);
  const {
    activeColumns,
    setActiveColumnsKeys,
    rebuildColumns
  } = useColumns(BLOCKCHAIN_ADDRESS);
  const columns = useMemo(() => {
    const columns = combineColumns(activeColumns);
    if (props.isDesktop) return columns;
    return columns.filter(({
      id
    }) => id !== CHECKBOX_COLUMN.id);
  }, [activeColumns, props.isDesktop]);
  const items = useAddressWatchlistItems(list);
  useEffect(() => {
    refetchAddressWatchlist(props.watchlist.id, activeColumns).then(list => setList(list));
  }, [activeColumns, props.watchlist.id]);
  return /*#__PURE__*/React.createElement(WatchlistTable, _extends({}, props, {
    rebuildColumns: rebuildColumns,
    items: items,
    columns: columns,
    activeColumns: activeColumns,
    updateActiveColumnsKeys: setActiveColumnsKeys,
    itemKeyProperty: "address",
    normalizeCSVData: normalizeCSVData,
    onRefreshClick: (id, onRefreshDone) => refetchAddressWatchlist(id, activeColumns).then(list => setList(list)).then(() => typeof onRefreshDone === 'function' && onRefreshDone())
  }));
};

export default WatchlistAddressesTable;
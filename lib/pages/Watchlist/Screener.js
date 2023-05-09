function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import { useScreenerUrl } from '../../ducks/Watchlists/utils';
import { getProjectsByFunction, getAssetsByFunction } from '../../ducks/Watchlists/gql/hooks';
import Infographics from './Infographics';
import { SCREENER } from '../../ducks/Watchlists/detector';
import TopBar from '../../ducks/Watchlists/Widgets/TopBar/TopBar';
import AssetsTable from '../../ducks/Watchlists/Widgets/Table';
import { useRecent } from '../../ducks/Watchlists/gql/list/hooks';
import { useColumns } from '../../ducks/Watchlists/Widgets/Table/hooks';
import { useUpdateWatchlist } from '../../ducks/Watchlists/gql/list/mutations';
import { buildFunctionQuery } from '../../ducks/Watchlists/Widgets/Filter/utils';
import { DEFAULT_SCREENER_FN, DEFAULT_SCREENER_ID } from '../../ducks/Screener/utils';

const Screener = ({
  watchlist,
  isLoggedIn,
  isDefaultScreener,
  location,
  history,
  id
}) => {
  useRecent(watchlist, SCREENER);
  const {
    pagination,
    setPagination,
    orderBy,
    setOrderBy,
    fetchData,
    activeColumns,
    setActiveColumnsKeys
  } = useColumns();
  const {
    updatedAt
  } = watchlist;
  const [updateWatchlist, {
    loading: isUpdating
  }] = useUpdateWatchlist(SCREENER);
  const [screenerFn, setScreenerFn] = useState(watchlist.function || DEFAULT_SCREENER_FN);
  const {
    assets,
    projectsCount,
    loading
  } = getProjectsByFunction(...buildFunctionQuery({
    fn: screenerFn,
    pagination,
    orderBy,
    activeColumns
  }));
  const [tableLoading, setTableLoading] = useState(true);
  const {
    widgets,
    setWidgets
  } = useScreenerUrl({
    location,
    history
  });
  useEffect(() => {
    if (loading !== tableLoading) {
      setTableLoading(loading);
    }
  }, [loading]);
  useEffect(() => {
    if (!tableLoading) {
      refetchAssets();
    }
  }, [orderBy]);
  useEffect(() => {
    const fn = watchlist.function;

    if (fn !== screenerFn) {
      if (!fn && screenerFn === DEFAULT_SCREENER_FN) {
        return;
      }

      setScreenerFn(fn);
    }
  }, [watchlist.function]);
  useEffect(() => {
    if (pagination.page !== 1) {
      setPagination(_objectSpread(_objectSpread({}, pagination), {}, {
        page: 1
      }));
    }
  }, [screenerFn]);
  useEffect(() => {
    if (watchlist.tableConfiguration) {
      const {
        sorting
      } = watchlist.tableConfiguration.columns;
      sorting && setOrderBy(sorting);
    }
  }, [watchlist]);

  function updateWatchlistFunction(fn) {
    if (watchlist.id) {
      updateWatchlist(watchlist, {
        function: fn
      });
    }
  }

  const refetchAssets = () => {
    setTableLoading(true);
    getAssetsByFunction(...buildFunctionQuery({
      fn: screenerFn,
      pagination,
      orderBy,
      activeColumns
    })).then(() => setTableLoading(false));
  };

  const fetchAllColumns = () => getAssetsByFunction(...buildFunctionQuery({
    fn: screenerFn,
    orderBy,
    activeColumns
  }));

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    type: SCREENER,
    entity: watchlist,
    projectsCount: projectsCount,
    loading: tableLoading,
    isLoggedIn: isLoggedIn,
    screenerFunction: screenerFn,
    setScreenerFunction: setScreenerFn,
    isUpdatingWatchlist: isUpdating,
    updateWatchlistFunction: updateWatchlistFunction,
    isDefaultScreener: isDefaultScreener,
    widgets: widgets,
    setWidgets: setWidgets,
    refetchAssets: refetchAssets
  }), /*#__PURE__*/React.createElement(Infographics, {
    widgets: widgets,
    setWidgets: setWidgets,
    listId: isDefaultScreener ? DEFAULT_SCREENER_ID : id,
    assets: assets,
    updatedAt: updatedAt
  }), /*#__PURE__*/React.createElement(AssetsTable, {
    items: assets,
    projectsCount: projectsCount,
    loading: tableLoading,
    type: SCREENER,
    watchlist: watchlist,
    fetchData: fetchData,
    refetchAssets: refetchAssets,
    fetchAllColumns: fetchAllColumns,
    sorting: orderBy,
    activeColumns: activeColumns,
    setOrderBy: setOrderBy,
    updateActiveColumnsKeys: setActiveColumnsKeys,
    pageSize: pagination.pageSize,
    pageIndex: pagination.page - 1,
    onChangePage: pageIndex => setPagination(_objectSpread(_objectSpread({}, pagination), {}, {
      page: +pageIndex + 1
    }))
  }));
};

export default Screener;
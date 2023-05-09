function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useMemo, useState } from 'react';
import Infographics from './Infographics';
import { PROJECT } from '../../ducks/Watchlists/detector';
import { useScreenerUrl } from '../../ducks/Watchlists/utils';
import AssetsTable from '../../ducks/Watchlists/Widgets/Table';
import { useRecent } from '../../ducks/Watchlists/gql/list/hooks';
import { useColumns } from '../../ducks/Watchlists/Widgets/Table/hooks';
import { getAssetsByFunction, getProjectsByFunction } from '../../ducks/Watchlists/gql/hooks';
import { buildFunctionQuery } from '../../ducks/Watchlists/Widgets/Filter/utils';
import AssetsTemplates from '../../ducks/Watchlists/Widgets/Table/AssetsTemplates';
import TopBar from '../../ducks/Watchlists/Widgets/TopBar/TopBar';

const WatchlistPage = ({
  location,
  history,
  watchlist,
  isDesktop
}) => {
  const fn = useMemo(() => ({
    name: 'selector',
    args: {
      filters: [],
      baseProjects: [{
        watchlistId: watchlist.id
      }]
    }
  }), [watchlist.id]);
  useRecent(watchlist, PROJECT);
  const [tableLoading, setTableLoading] = useState(true);
  const {
    widgets,
    setWidgets
  } = useScreenerUrl({
    location,
    history,
    defaultParams: {
      isMovement: true
    }
  });
  const {
    updatedAt
  } = watchlist;
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
    assets,
    projectsCount,
    loading
  } = getProjectsByFunction(...buildFunctionQuery({
    fn,
    orderBy,
    pagination,
    activeColumns
  }));
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
    if (watchlist.listItems && watchlist.listItems.length !== 0 && assets.length === 0) {
      refetchAssets();
    }
  }, [watchlist.listItems]);

  const refetchAssets = onRefetchDone => {
    setTableLoading(true);
    getAssetsByFunction(...buildFunctionQuery({
      fn,
      orderBy,
      pagination,
      activeColumns
    })).then(() => setTableLoading(false)).then(() => typeof onRefetchDone === 'function' && onRefetchDone());
  };

  const fetchAllColumns = () => getAssetsByFunction(...buildFunctionQuery({
    fn,
    orderBy,
    activeColumns
  }));

  const allItems = useMemo(() => watchlist.listItems ? watchlist.listItems.map(item => item.project) : assets, [watchlist]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    entity: watchlist,
    type: PROJECT,
    refetchAssets: refetchAssets,
    widgets: widgets,
    setWidgets: setWidgets
  }), /*#__PURE__*/React.createElement(Infographics, {
    type: "Watchlist",
    listId: watchlist.id,
    widgets: widgets,
    setWidgets: setWidgets,
    assets: assets,
    updatedAt: updatedAt
  }), /*#__PURE__*/React.createElement(AssetsTable, {
    isDesktop: isDesktop,
    items: assets,
    allItems: allItems,
    type: PROJECT,
    loading: loading,
    sorting: orderBy,
    watchlist: watchlist,
    widgets: widgets,
    fetchData: fetchData,
    setOrderBy: setOrderBy,
    refetchAssets: refetchAssets,
    fetchAllColumns: fetchAllColumns,
    projectsCount: projectsCount,
    activeColumns: activeColumns,
    pageSize: pagination.pageSize,
    pageIndex: pagination.page - 1,
    updateActiveColumnsKeys: setActiveColumnsKeys,
    onChangePage: pageIndex => setPagination(_objectSpread(_objectSpread({}, pagination), {}, {
      page: +pageIndex + 1
    }))
  }), /*#__PURE__*/React.createElement(AssetsTemplates, {
    items: allItems,
    watchlist: watchlist
  }));
};

export default WatchlistPage;
import React, { useState } from 'react';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import { PROJECT } from '../../../detector';
import ColumnsToggler from '../Columns/Toggler';
import CompareInfo from '../CompareInfo/CompareInfo';
import CompareAction from '../CompareInfo/CompareAction';
import EditAssets from '../../../Actions/Edit/EditAssets';
import Refresh from '../../../../../components/Refresh/Refresh';
import DownloadCSV from '../../../../WatchlistTable/DownloadCSV';
import styles from './index.module.css';
const EMPTY_OBJ = {};

const TableTop = ({
  refetchAssets,
  fetchAllColumns,
  comparingAssets,
  type,
  allItems,
  watchlist = EMPTY_OBJ,
  isLoading,
  sorting,
  setOrderBy,
  activeColumns,
  updateActiveColumnsKeys,
  toggleSelected,
  widgets
}) => {
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now);
  const disabledComparision = comparingAssets.length < 2;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, type === PROJECT && /*#__PURE__*/React.createElement(EditAssets, {
    name: watchlist.name,
    id: watchlist.id,
    watchlist: watchlist,
    assets: allItems,
    onSave: onRefetchDone => refetchAssets(onRefetchDone),
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true,
      accent: "positive",
      className: styles.addassets
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "assets",
      className: styles.icon
    }), "Edit assets")
  }), /*#__PURE__*/React.createElement(Refresh, {
    timestamp: refreshTimestamp,
    isLoading: isLoading,
    onRefreshClick: () => setRefreshTimestamp(Date.now()) || refetchAssets()
  }), comparingAssets && /*#__PURE__*/React.createElement("div", {
    className: styles.leftActions
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.compareAction
  }, /*#__PURE__*/React.createElement(CompareAction, {
    assets: comparingAssets,
    disabledComparision: disabledComparision
  })), comparingAssets.length > 0 && /*#__PURE__*/React.createElement(CompareInfo, {
    widgets: widgets,
    type: type,
    selected: comparingAssets,
    watchlist: watchlist,
    refetchAssets: refetchAssets,
    cleanAll: () => toggleSelected(false)
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(ColumnsToggler, {
    type: type,
    sorting: sorting,
    watchlist: watchlist,
    setOrderBy: setOrderBy,
    activeColumns: activeColumns,
    updateActiveColumnsKeys: updateActiveColumnsKeys,
    flexible: false
  }), /*#__PURE__*/React.createElement(DownloadCSV, {
    type: type,
    watchlist: watchlist,
    downloadData: fetchAllColumns,
    activeColumns: activeColumns
  })));
};

export default TableTop;
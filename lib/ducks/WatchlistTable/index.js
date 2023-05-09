const _excluded = ["watchlist", "className", "activeColumns", "updateActiveColumnsKeys", "normalizeCSVData", "onRefreshClick", "rebuildColumns", "isDesktop"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, useState } from 'react';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import DownloadCSV from './DownloadCSV';
import PagedTable from '../_Table/Paged';
import { useSelectedItemsSet } from '../_Table/hooks';
import Refresh from '../../components/Refresh/Refresh';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import EmptySection from '../../pages/Watchlists/EmptySection';
import { DesktopOnly, MobileOnly } from '../../components/Responsive';
import { BLOCKCHAIN_ADDRESS } from '../Watchlists/detector';
import ColumnsToggler from '../Watchlists/Widgets/Table/Columns/Toggler';
import EditAddresses from '../Watchlists/Actions/Edit/EditAddresses/EditAddresses';
import Actions from '../Watchlists/Widgets/Table/CompareInfo/Actions';
import { updateWatchlistShort } from '../Watchlists/gql/list/mutations';
import { mapAddressToAPIType } from '../Watchlists/utils';
import styles from './index.module.css';
import Share from '../Watchlists/Actions/Share';

const WatchlistTable = _ref => {
  let {
    watchlist,
    className,
    activeColumns,
    updateActiveColumnsKeys,
    normalizeCSVData,
    onRefreshClick,
    rebuildColumns,
    isDesktop
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    items
  } = props;
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now);
  const csvData = useMemo(() => normalizeCSVData(items), [items]);
  const selectedItemsSet = useSelectedItemsSet(items);

  const refreshList = onRefreshDone => onRefreshClick(watchlist.id, () => {
    setRefreshTimestamp(Date.now());
    typeof onRefreshDone === 'function' && onRefreshDone();
  });

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement("div", {
    className: styles.top
  }, /*#__PURE__*/React.createElement(EditAddresses, {
    watchlist: watchlist,
    refreshList: refreshList,
    trigger: /*#__PURE__*/React.createElement(Button, {
      border: true,
      accent: "positive",
      className: styles.add
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "assets",
      className: styles.icon
    }), "Edit addresses")
  }), /*#__PURE__*/React.createElement(Refresh, {
    timestamp: refreshTimestamp,
    onRefreshClick: refreshList
  }), selectedItemsSet.selectedItemsSet.size > 0 && /*#__PURE__*/React.createElement("div", {
    className: styles.ml1
  }, /*#__PURE__*/React.createElement(Actions, {
    assets: watchlist.listItems,
    selected: Array.from(selectedItemsSet.selectedItemsSet),
    watchlist: watchlist,
    onAdd: (watchlistId, _, onAddDone) => updateWatchlistShort({
      id: watchlistId,
      listItems: items.map(a => mapAddressToAPIType(a))
    }).then(() => refreshList(onAddDone)),
    onRemove: (watchlistId, listItems, onRemoveDone) => {
      const addresses = listItems.map(l => l.address);
      const removeItems = items.filter(l => !addresses.includes(l.address));
      return updateWatchlistShort({
        id: watchlistId,
        listItems: removeItems.map(a => mapAddressToAPIType(a))
      }).then(() => refreshList(onRemoveDone));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(ColumnsToggler, {
    type: BLOCKCHAIN_ADDRESS,
    watchlist: watchlist,
    activeColumns: activeColumns,
    updateActiveColumnsKeys: updateActiveColumnsKeys,
    rebuildColumns: rebuildColumns
  }), /*#__PURE__*/React.createElement(DownloadCSV, {
    type: BLOCKCHAIN_ADDRESS,
    watchlist: watchlist,
    data: csvData
  })))), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(MobileHeader, {
    title: watchlist.name,
    showSearch: !isDesktop,
    classes: {
      title: styles.title
    },
    rightActions: isDesktop ? /*#__PURE__*/React.createElement(EditAddresses, {
      watchlist: watchlist,
      refreshList: refreshList,
      trigger: /*#__PURE__*/React.createElement(Button, null, /*#__PURE__*/React.createElement(Icon, {
        type: "edit"
      }))
    }) : /*#__PURE__*/React.createElement(Share, {
      watchlist: watchlist,
      isMobile: true
    })
  })), /*#__PURE__*/React.createElement(PagedTable, _extends({}, props, {
    stickyPageControls: true,
    padding: true,
    itemProps: selectedItemsSet,
    className: styles.table,
    controlsClassName: styles.controls,
    watchlist: watchlist,
    refreshList: refreshList,
    isWithColumnTitles: props.isDesktop,
    emptySection: /*#__PURE__*/React.createElement(EmptySection, {
      wrapperClassName: styles.emptyWrapper,
      type: BLOCKCHAIN_ADDRESS,
      watchlist: watchlist,
      refreshList: refreshList
    }),
    minRows: 8
  })));
};

WatchlistTable.defaultProps = {
  normalizeCSVData: _ => _
};
export default WatchlistTable;
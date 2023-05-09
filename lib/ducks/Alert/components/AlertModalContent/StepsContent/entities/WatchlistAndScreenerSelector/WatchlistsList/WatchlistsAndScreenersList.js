import React, { useCallback } from 'react';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import WatchlistsAndScreenersListItem from './WatchlistsListItem/WatchlistsAndScreenersListItem';
import styles from './WatchlistsAndScreenersList.module.css';
const ROW_HEIGHT = 66;
const MAX_SHOWING_ITEMS = 5;
const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: ROW_HEIGHT
});

const WatchlistsAndScreenersList = ({
  items,
  selectedWatchlist,
  onSelect,
  isSocial
}) => {
  const rowRenderer = useCallback(({
    key,
    index,
    style,
    parent
  }) => {
    const item = items[index];
    const isSelectedItem = +item.id === +selectedWatchlist;
    return /*#__PURE__*/React.createElement(CellMeasurer, {
      key: key,
      cache: cache,
      parent: parent,
      columnIndex: 0,
      rowIndex: index
    }, ({
      registerChild
    }) => /*#__PURE__*/React.createElement(WatchlistsAndScreenersListItem, {
      ref: registerChild,
      style: style,
      item: item,
      isSelectedItem: isSelectedItem,
      onSelect: onSelect
    }));
  }, [items, selectedWatchlist]);
  const wrapperStyles = {
    height: isSocial ? '393px' : '458px'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrapperStyles,
    className: styles.wrapperList
  }, items.length > 0 && /*#__PURE__*/React.createElement(AutoSizer, null, ({
    height,
    width
  }) => /*#__PURE__*/React.createElement(List, {
    className: styles.list,
    width: width,
    height: height,
    deferredMeasurementCache: cache,
    rowHeight: cache.rowHeight,
    rowCount: items.length,
    overscanRowCount: MAX_SHOWING_ITEMS,
    rowRenderer: rowRenderer
  })));
};

export default WatchlistsAndScreenersList;
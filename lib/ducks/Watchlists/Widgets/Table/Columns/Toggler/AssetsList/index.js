import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Column from '../Columns/Column';
import styles from '../Category.module.css';

const List = () => {};

const AutoSizer = () => {};

const ROW_HEIGHT = 32;

const AssetsList = ({
  items,
  activeKeys,
  currentSearch,
  filteredColumns,
  onColumnToggle
}) => {
  const [filteredItems, filterItems] = useState(items);
  useEffect(() => {
    const filtered = items.filter(({
      item: {
        key
      }
    }) => {
      const isActive = activeKeys && activeKeys.includes(key);
      const isHide = isActive || currentSearch && !filteredColumns.includes(key);
      return !isHide;
    });
    filterItems(filtered);
  }, [items, activeKeys, currentSearch, filteredColumns]);

  const rowRenderer = ({
    index,
    key,
    style
  }) => {
    const item = filteredItems[index].item;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      style: style
    }, /*#__PURE__*/React.createElement(Column, {
      key: item.key,
      column: item,
      onColumnToggle: onColumnToggle,
      isActive: false,
      className: cx(styles.column, currentSearch && styles.searchedColumn)
    }));
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.virtualizedContainer
  }, /*#__PURE__*/React.createElement(AutoSizer, null, ({
    height,
    width
  }) => /*#__PURE__*/React.createElement(List, {
    width: width,
    height: height,
    rowHeight: ROW_HEIGHT,
    rowCount: filteredItems.length,
    overscanRowCount: 20,
    rowRenderer: rowRenderer,
    className: styles.virtualizedList
  })));
};

export default AssetsList;
import React from 'react';
import cx from 'classnames';
import { FluidSkeleton as Skeleton } from '../../components/Skeleton';
import NoDataImage from '../../components/Illustrations/NoData';
import styles from './index.module.css';
export function prepareColumns(columns) {
  columns.forEach(column => {
    column.id = column.id || column.key || column.title;
  });
  return columns;
}

function minRowsPadding(minRows, columns, {
  length
}) {
  if (length >= minRows) return null;
  const rowsToAdd = minRows - length;
  const rows = new Array(rowsToAdd);

  for (let i = 0; i < rowsToAdd; i++) {
    rows[i] = /*#__PURE__*/React.createElement("tr", {
      key: i
    }, columns.map((_, i) => /*#__PURE__*/React.createElement("td", {
      key: i
    })));
  }

  return rows;
}

const Table = ({
  className,
  headerClassName,
  offset,
  columns,
  minRows,
  items,
  itemKeyProperty,
  itemProps,
  isLoading,
  getItemKey,
  onRowClick,
  isWithColumnTitles = true,
  emptySection
}) => /*#__PURE__*/React.createElement("table", {
  className: cx(styles.wrapper, className)
}, isWithColumnTitles && /*#__PURE__*/React.createElement("thead", {
  className: headerClassName
}, /*#__PURE__*/React.createElement("tr", null, columns.map(({
  id,
  title,
  Title
}) => /*#__PURE__*/React.createElement("th", {
  key: id
}, Title ? /*#__PURE__*/React.createElement(Title, itemProps) : title)))), /*#__PURE__*/React.createElement("tbody", null, items.map((item, i) => {
  const itemIndex = offset + i;
  return /*#__PURE__*/React.createElement("tr", {
    key: getItemKey ? getItemKey(item) : item[itemKeyProperty],
    onClick: onRowClick && (e => onRowClick(item, e))
  }, columns.map(({
    id,
    render,
    className
  }) => /*#__PURE__*/React.createElement("td", {
    key: id,
    className: className
  }, render(item, itemProps, itemIndex))));
}), minRowsPadding(minRows, columns, items)), /*#__PURE__*/React.createElement("caption", null, /*#__PURE__*/React.createElement(Skeleton, {
  show: isLoading,
  className: styles.skeleton
}), !isLoading && items.length === 0 && (emptySection || /*#__PURE__*/React.createElement(NoDataImage, {
  className: styles.nodata
}))));

Table.defaultProps = {
  items: [],
  itemProps: {},
  itemKeyProperty: 'id',
  minRows: 0,
  offset: 0
};
export default Table;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect } from 'react';
import cx from 'classnames';
import isEqual from 'lodash.isequal';
import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table';
import { sortDate } from '../../utils/sortMethods';
import Loader from './Loader';
import NoData from './NoData';
import Pagination from './Pagination';
import { CHECKBOX_COLUMN } from './Checkbox/column';
import { sortFloatNumeric } from './utils';
import styles from './index.module.css';

const DEFAULT_CB = () => {};

const EMPTY_OBJ = {};
const PAGE_SIZE_OPTIONS = [10, 25, 50];
const sortTypes = {
  datetime: (a, b, id) => sortDate(a.original[id], b.original[id]),
  floatNumeric: (a, b, id) => sortFloatNumeric(a.original[id], b.original[id])
};

const Table = ({
  data,
  columns,
  fetchData = DEFAULT_CB,
  options: {
    noDataSettings = EMPTY_OBJ,
    loadingSettings,
    sortingSettings,
    stickySettings,
    paginationSettings,
    rowSelectSettings
  } = EMPTY_OBJ,
  className,
  classes = EMPTY_OBJ,
  onToggle
}) => {
  const {
    isLoading,
    repeatLoading
  } = loadingSettings || EMPTY_OBJ;
  const {
    allowSort,
    defaultSorting
  } = sortingSettings || EMPTY_OBJ;
  const {
    isStickyHeader,
    isStickyColumn,
    stickyColumnIdx = null
  } = stickySettings || EMPTY_OBJ;
  const {
    pageSize: initialPageSize,
    pageIndex: initialPageIndex = 0,
    onChangePage = null,
    pageSizeOptions = PAGE_SIZE_OPTIONS,
    controlledPageCount,
    manualPagination
  } = paginationSettings || EMPTY_OBJ;
  const {
    onChangeSelectedRows
  } = rowSelectSettings || EMPTY_OBJ;
  const initialState = EMPTY_OBJ;
  const optionalOptions = EMPTY_OBJ;

  if (defaultSorting) {
    initialState.sortBy = defaultSorting;
  }

  if (initialPageSize) {
    initialState.pageSize = initialPageSize;
  }

  if (initialPageIndex) {
    initialState.pageIndex = initialPageIndex;
  }

  if (manualPagination) {
    optionalOptions.manualPagination = true;
    optionalOptions.manualSortBy = true;
    optionalOptions.pageCount = controlledPageCount;
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setSortBy,
    selectedFlatRows,
    toggleAllRowsSelected,
    state: {
      pageIndex,
      pageSize,
      sortBy
    }
  } = useTable(_objectSpread({
    columns,
    data,
    useControlledState: state => {
      return React.useMemo(() => _objectSpread(_objectSpread({}, state), {}, {
        pageIndex: manualPagination ? initialPageIndex : state.pageIndex
      }), [state, initialPageIndex]);
    },
    disableSortRemove: true,
    disableSortBy: !allowSort,
    sortTypes,
    autoResetPage: false,
    autoResetSortBy: false,
    initialState
  }, optionalOptions), useSortBy, usePagination, useRowSelect, hooks => {
    hooks.visibleColumns.push(columns => rowSelectSettings ? [CHECKBOX_COLUMN, ...columns] : columns);
  });
  const content = paginationSettings ? page : rows;
  const paginationParams = {
    pageSize,
    pageIndex,
    pageOptions,
    canNextPage,
    canPreviousPage,
    setPageSize,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    pageSizeOptions
  };
  useEffect(() => {
    if (onToggle) {
      onToggle(toggleAllRowsSelected);
    }
  }, [toggleAllRowsSelected]);
  useEffect(() => {
    if (onChangeSelectedRows) {
      onChangeSelectedRows(selectedFlatRows);
    }
  }, [selectedFlatRows]);
  useEffect(() => {
    fetchData({
      pageSize,
      sortBy
    });
  }, [pageSize, sortBy]);
  useEffect(() => {
    if (manualPagination && !isEqual(defaultSorting, sortBy)) {
      setSortBy(defaultSorting);
    }
  }, [defaultSorting]);
  useEffect(() => {
    if (!manualPagination) {
      setSortBy(sortBy);
    }
  }, [sortBy]);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, !paginationSettings && styles.wrapperOverflow, className)
  }, /*#__PURE__*/React.createElement("table", _extends({}, getTableProps(), {
    className: cx(styles.table, classes.table)
  }), /*#__PURE__*/React.createElement("thead", {
    className: cx(styles.header, classes.header)
  }, headerGroups.map(headerGroup => /*#__PURE__*/React.createElement("tr", _extends({}, headerGroup.getHeaderGroupProps(), {
    className: classes.headerRow
  }), headerGroup.headers.map((column, idx) => /*#__PURE__*/React.createElement("th", _extends({}, column.getHeaderProps(column.getSortByToggleProps({
    title: ''
  })), {
    className: cx(styles.headerColumn, column.collapse && styles.collapse, column.isSorted && styles.headerColumnActive, isStickyHeader && styles.headerColumnStickyTop, isStickyColumn && stickyColumnIdx === idx && styles.headerColumnStickyLeft, classes.headerColumn)
  }), /*#__PURE__*/React.createElement("span", null, column.render('Header')), column.canSort && /*#__PURE__*/React.createElement("span", {
    className: cx(styles.sort, column.isSortedDesc ? styles.sortAsc : styles.sortDesc)
  })))))), /*#__PURE__*/React.createElement("tbody", _extends({}, getTableBodyProps(), {
    className: cx(styles.body, classes.body)
  }), content.map(row => {
    prepareRow(row);
    return /*#__PURE__*/React.createElement("tr", _extends({}, row.getRowProps(), {
      className: cx(styles.bodyRow, classes.bodyRow)
    }), row.cells.map((cell, idx) => /*#__PURE__*/React.createElement("td", _extends({}, cell.getCellProps(), {
      className: cx(styles.bodyColumn, cell.column.collapse && styles.collapse, isStickyColumn && stickyColumnIdx === idx && styles.bodyColumnSticky, classes.bodyColumn)
    }), cell.render('Cell'))));
  }))), !!loadingSettings && repeatLoading > 0 && /*#__PURE__*/React.createElement(Loader, {
    repeat: repeatLoading,
    isLoading: isLoading,
    classes: {
      wrapper: classes.loader,
      row: classes.loaderRow
    }
  }), !!loadingSettings && !isLoading && data.length === 0 && /*#__PURE__*/React.createElement(NoData, noDataSettings), !!paginationSettings && paginationParams.pageCount > 1 && /*#__PURE__*/React.createElement(Pagination, _extends({}, paginationParams, {
    onChangePage: onChangePage,
    className: classes.pagination
  })));
};

export default Table;
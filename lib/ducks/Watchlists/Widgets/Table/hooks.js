function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useCallback, useMemo, useState } from 'react';
import { getColumns } from './Columns/builder';
import { DEFAULT_ORDER_BY, DIRECTIONS } from './Columns/defaults';
const pageSize = 20;
const EMPTY_ARRAY = [];
export function useColumns(type) {
  const defaultPagination = {
    page: 1,
    pageSize: +pageSize
  };
  const [pagination, setPagination] = useState(defaultPagination);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [activeColumnsKeys, setActiveColumnsKeys] = useState(EMPTY_ARRAY);
  const [shouldRebuildColumns, rebuildColumns] = useState(0);
  const activeColumns = useMemo(() => getColumns(activeColumnsKeys, type), [activeColumnsKeys, shouldRebuildColumns]);
  const fetchData = useCallback(({
    pageSize,
    sortBy
  }) => {
    const {
      id,
      desc
    } = sortBy[0];
    const activeColumn = activeColumns.find(column => column.key === id);

    if (!activeColumn) {
      setOrderBy(DEFAULT_ORDER_BY);
    } else {
      const {
        timeRange,
        aggregation
      } = activeColumn;
      const newDirection = desc ? DIRECTIONS.DESC : DIRECTIONS.ASC;
      setOrderBy({
        metric: id,
        aggregation,
        dynamicTo: 'now',
        dynamicFrom: timeRange,
        direction: newDirection
      });
    }

    setPagination(_objectSpread(_objectSpread({}, pagination), {}, {
      pageSize: +pageSize
    }));
  }, [activeColumns]);
  return {
    pagination,
    setPagination,
    orderBy,
    setOrderBy,
    fetchData,
    activeColumns,
    setActiveColumnsKeys,
    rebuildColumns
  };
}
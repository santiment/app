const _excluded = ["settings"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import cx from 'classnames';
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader';
import Icon from '@santiment-network/ui/Icon';
import { DAY, getTimeIntervalFromToday } from '../../../../utils/dates';
import { COLUMNS } from './utils';
import SmoothDropdown from '../../../../components/SmoothDropdown/SmoothDropdown';
import Table from '../../../Table';
import Calendar from '../../AdvancedView/Calendar';
import { useTableEffects } from '../TopTransactionsTable/hooks';
import { useMaxCountTopHolders, useTopHolders } from './hooks';
import Skeleton from '../../../../components/Skeleton/Skeleton';
import ChartWidget from '../ChartWidget';
import styles from './HoldersDistributionTable.module.css';
import tableStyles from './../../../../components/Tables/TopTokenTransactions/index.module.css';
import widgetStyles from '../Widget.module.css';
const PAGE_SIZE_OPTIONS = [10, 25, 50];
const {
  from,
  to
} = getTimeIntervalFromToday(-30, DAY);
const DEFAULT_DATES = [from, to];

const Header = ({
  dates,
  onCalendarChange,
  onCloseClick
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.header
}, "Top Holders", /*#__PURE__*/React.createElement("div", {
  className: styles.header__right
}, /*#__PURE__*/React.createElement(Calendar, {
  className: styles.calendar,
  selectRange: true,
  dates: dates,
  onChange: onCalendarChange
}), /*#__PURE__*/React.createElement(Icon, {
  type: "close-medium",
  className: widgetStyles.close,
  onClick: onCloseClick
})));

const HoldersDistributionTable = _ref => {
  let {
    settings: {
      slug
    }
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const {
    dates,
    onCalendarChange,
    onCloseClick
  } = useTableEffects(rest);
  const [from, to] = dates;
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [maxAmount] = useMaxCountTopHolders({
    from,
    to,
    slug
  });
  const [holders, loading] = useTopHolders({
    from,
    to,
    page: page + 1,
    pageSize,
    slug
  });
  return /*#__PURE__*/React.createElement(PanelWithHeader, {
    header: /*#__PURE__*/React.createElement(Header, {
      dates: dates,
      onCalendarChange: onCalendarChange,
      onCloseClick: onCloseClick
    }),
    className: cx(tableStyles.wrapper, widgetStyles.widget_secondary, styles.container),
    contentClassName: cx(tableStyles.panel),
    headerClassName: styles.panelHeader
  }, /*#__PURE__*/React.createElement(Skeleton, {
    show: loading,
    repeat: 1,
    className: styles.skeleton
  }), !loading && /*#__PURE__*/React.createElement(SmoothDropdown, {
    verticalMotion: true
  }, /*#__PURE__*/React.createElement(Table, {
    data: holders,
    columns: COLUMNS,
    fetchData: ({
      pageSize
    }) => {
      setPageSize(pageSize);
    },
    options: {
      sortingSettings: {
        defaultSorting: [],
        allowSort: false
      },
      stickySettings: {
        isStickyHeader: true
      },
      noDataSettings: {
        title: 'No data!'
      },
      paginationSettings: {
        pageSize: pageSize,
        pageIndex: page,
        onChangePage: pageIndex => {
          setPage(pageIndex);
        },
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        controlledPageCount: Math.ceil(maxAmount / pageSize),
        manualPagination: true
      }
    },
    className: widgetStyles.widget_secondary,
    classes: {
      pagination: styles.pagination,
      table: styles.table,
      header: styles.table__header,
      headerColumn: styles.table__header__column
    }
  })));
};

HoldersDistributionTable.new = props => ChartWidget.new(_objectSpread({
  datesRange: DEFAULT_DATES,
  mergedMetrics: [],
  metrics: []
}, props), HoldersDistributionTable);

export default HoldersDistributionTable;
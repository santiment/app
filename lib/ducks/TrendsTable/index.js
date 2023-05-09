const _excluded = ["className", "period", "dominance", "hiddenColumnIds", "isCompact", "isDesktop"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Table from '../_Table';
import { useColumns } from '../_Table/hooks';
import { useTrendingWords } from './hooks';
import { COLUMNS, Column } from './columns';
import columnsStyles from './columns.module.css';
import styles from './index.module.css';
const LINK_SELECTOR = `.${columnsStyles.word}`;
const COMPACT_HIDDEN_COLUMNS = [Column.TRENDING_CHART, Column.CONNECTED_WORDS, Column.SOCIAL_VOLUME];

const TrendsTable = _ref => {
  let {
    className,
    period,
    dominance,
    hiddenColumnIds,
    isCompact,
    isDesktop
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const {
    trendingWords,
    words,
    isLoading
  } = useTrendingWords(period);
  const columns = useColumns(COLUMNS, isCompact ? COMPACT_HIDDEN_COLUMNS : hiddenColumnIds);

  function onRowClick(_, {
    target,
    currentTarget
  }) {
    if (!target.closest('a')) {
      currentTarget.querySelector(LINK_SELECTOR).click();
    }
  }

  return /*#__PURE__*/React.createElement(Table, _extends({}, props, {
    className: cx(styles.table, className, isCompact && styles.compact, trendingWords.length === 0 && styles.empty),
    headerClassName: styles.tableHeader,
    items: trendingWords,
    minRows: 10,
    columns: columns,
    itemKeyProperty: "word",
    itemProps: {
      words,
      isDesktop,
      dominance
    },
    isLoading: isLoading,
    onRowClick: onRowClick
  }));
};

export default TrendsTable;
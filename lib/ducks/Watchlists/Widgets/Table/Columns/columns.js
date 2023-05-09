function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Icon from '@santiment-network/ui/Icon';
import Label from '@santiment-network/ui/Label';
import PriceGraph from '../PriceGraph';
import Project from '../../../../../components/Tables/Cells/Project';
import PercentChanges from '../../../../../components/PercentChanges';
import ProPopupWrapper from '../../../../../components/ProPopup/Wrapper';
import { defaultFormatter, percentValueFormatter } from '../../Filter/formatters';
import LayoutForAsset from '../../../../Studio/Template/LayoutForAsset/LayoutForAsset';
import { Skeleton } from '../../../../../components/Skeleton';
import styles from './columns.module.css';
export const NO_DATA = 'No data';
export const isValid = value => !isNaN(parseFloat(value));

const noValueFormatter = value => value === undefined ? /*#__PURE__*/React.createElement(Loader, null) : NO_DATA;

const Loader = () => /*#__PURE__*/React.createElement(Skeleton, {
  show: true,
  className: styles.skeleton
});

export const INDEX_COLUMN = {
  Header: '#',
  accessor: 'name',
  collapse: true,
  disableSortBy: true,
  Cell: ({
    sortedRows,
    row,
    state: {
      pageSize,
      pageIndex
    }
  }) => {
    const index = sortedRows.findIndex(item => item === row);
    return /*#__PURE__*/React.createElement(LayoutForAsset, {
      item: row.original,
      className: styles.layout,
      index: pageIndex * pageSize + index + 1
    });
  }
};
export const PROJECT_COLUMN = {
  Header: 'Project',
  accessor: 'Project',
  disableSortBy: true,
  Cell: ({
    row: {
      original
    }
  }) => /*#__PURE__*/React.createElement(Project, _extends({}, original, {
    to: `/projects/${original.slug}`
  }))
};
export const CHART_LINE_CELL = ({
  value
}) => /*#__PURE__*/React.createElement(PriceGraph, {
  data: value
});
export const MARKET_SEGMENTS_CELL = ({
  value: values = []
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.segments
}, values.map(segment => /*#__PURE__*/React.createElement(Label, {
  variant: "fill",
  className: styles.segment,
  key: segment
}, segment)));
export const EXCHANGES_CELL = ({
  value = 0
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.exchanges
}, value > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, "Traded on", ' ', /*#__PURE__*/React.createElement(Label, {
  variant: "round",
  accent: "casper",
  className: styles.exchanges__count
}, value), ` exchange${value !== 1 && 's'}`));
export const RANK_CELL = ({
  value
}) => value === undefined ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(Label, {
  variant: "fill",
  className: styles.rank
}, value);
export const ETH_SPENT_CELL = ({
  value
}) => isValid(value) ? `Ξ${defaultFormatter(value)}` : NO_DATA;
export const BASIC_CELL = formatter => ({
  value
}) => isValid(value) ? formatter(value) : noValueFormatter(value);
export const PERCENT_CHANGES_CELL = ({
  value
}) => isValid(value) ? /*#__PURE__*/React.createElement(PercentChanges, {
  changes: percentValueFormatter(value)
}) : noValueFormatter(value);
export const PRO_CELL = () => /*#__PURE__*/React.createElement(ProPopupWrapper, {
  type: "screener",
  className: styles.paywall
}, /*#__PURE__*/React.createElement(Icon, {
  type: "crown"
}), /*#__PURE__*/React.createElement("span", {
  className: styles.upgrade
}, "Upgrade"));
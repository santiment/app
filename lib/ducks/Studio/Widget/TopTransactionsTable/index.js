const _excluded = ["settings"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Icon from '@santiment-network/ui/Icon';
import { newWidget } from '../utils';
import Calendar from '../../AdvancedView/Calendar';
import { DAY, getTimeIntervalFromToday } from '../../../../utils/dates';
import HelpPopup from '../../../../components/HelpPopup/HelpPopup';
import TransactionTable from '../../../../components/Tables/TopTokenTransactions';
import { TRANSACTIONS_QUERY } from '../../../../components/Tables/TopTokenTransactions/gql';
import { normalizeTransactionData } from '../../../../pages/Detailed/transactionsInfo/utils';
import { useTableEffects } from './hooks';
import styles from './index.module.css';
import widgetStyles from '../Widget.module.css';
const {
  from,
  to
} = getTimeIntervalFromToday(-30, DAY);
const DEFAULT_DATES = [from, to];
const DEFAULT_SORTED = [{
  id: 'value',
  desc: true
}];
export function useProjectTopTransactions(slug, from, to) {
  const {
    data,
    loading
  } = useQuery(TRANSACTIONS_QUERY, {
    variables: {
      slug,
      from,
      to
    }
  });
  let result;

  if (data) {
    const {
      tokenTopTransactions,
      ethTopTransactions
    } = data.projectBySlug;
    result = slug === 'ethereum' ? ethTopTransactions : tokenTopTransactions;
  }

  return [result || [], loading];
}

const Header = ({
  dates,
  onCalendarChange,
  onCloseClick
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.header
}, "Top Token Transactions", /*#__PURE__*/React.createElement(Calendar, {
  className: styles.calendar,
  selectRange: true,
  dates: dates,
  onChange: onCalendarChange
}), /*#__PURE__*/React.createElement(HelpPopup, null, "Hold \"CTRL\" or \"CMD\", click and move mouse on the chart to select a time range"), /*#__PURE__*/React.createElement(Icon, {
  type: "close-medium",
  className: widgetStyles.close,
  onClick: onCloseClick
}));

const TopTransactionsTable = _ref => {
  let {
    settings: {
      slug
    }
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  const {
    onCloseClick,
    onCalendarChange,
    dates
  } = useTableEffects(rest);
  const [from, to] = dates;
  const [transactions, loading] = useProjectTopTransactions(slug, from, to);
  const normalizedData = useMemo(() => transactions.map(trx => normalizeTransactionData(slug, trx)), [transactions]);
  return /*#__PURE__*/React.createElement(TransactionTable, {
    className: widgetStyles.widget_secondary,
    defaultPageSize: 50,
    defaultSorted: DEFAULT_SORTED,
    header: /*#__PURE__*/React.createElement(Header, {
      dates: dates,
      onCalendarChange: onCalendarChange,
      onCloseClick: onCloseClick
    }),
    data: normalizedData,
    loading: loading,
    slug: slug
  });
};

TopTransactionsTable.new = props => newWidget(TopTransactionsTable, _objectSpread({
  datesRange: DEFAULT_DATES
}, props));

export default TopTransactionsTable;
import React from 'react';
import Button from '@santiment-network/ui/Button';
import { capitalizeStr } from '../../../../../utils/utils';
import { formatNumber } from '../../../../../utils/formatting';
import styles from './FeedHistoricalBalance.module.css';
import { getDateFormats, getTimeFormats } from '../../../../../utils/dates';

const spliceLink = address => address.slice(0, 20) + '...';

const formatDate = since => {
  const date = new Date(since);
  const {
    YYYY,
    MMM,
    DD
  } = getDateFormats(date);
  const {
    HH,
    mm
  } = getTimeFormats(date);
  return `${HH}:${mm}, ${MMM} ${DD}, ${YYYY}`;
};

const FeedHistoricalBalance = ({
  user_trigger_data
}) => {
  const {
    historical_balance_link,
    asset,
    address,
    balance_change,
    since
  } = user_trigger_data;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, "The ", capitalizeStr(asset), " balance of the address", ' ', /*#__PURE__*/React.createElement("span", {
    className: styles.address
  }, spliceLink(address)), " has", /*#__PURE__*/React.createElement("span", {
    className: styles.balanceChange
  }, balance_change < 0 ? 'decreased' : 'increased', " by", ' ', balance_change && formatNumber(balance_change)), "since ", formatDate(since)), /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: historical_balance_link,
    target: "_blank",
    className: styles.balanceBtn
  }, "Historical balance change")));
};

export default FeedHistoricalBalance;
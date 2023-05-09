import React from 'react';
import cx from 'classnames';
import Tooltip from '@santiment-network/ui/Tooltip';
import Calendar from '../../../shared/Calendar/Calendar';
import Share from '../../../shared/Share/Share';
import { getSocialDominanceSum } from '../../../../../../ducks/TrendsTable/utils';
import styles from './TopBar.module.css';

const TopBar = ({
  setTrendPeriod,
  dominance
}) => {
  const dominanceSum = dominance && getSocialDominanceSum(dominance);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.topBar, 'row v-center justify')
  }, /*#__PURE__*/React.createElement("p", {
    className: styles.socDominance
  }, "Social dominance SUM:", /*#__PURE__*/React.createElement(Tooltip, {
    trigger: /*#__PURE__*/React.createElement("span", {
      className: cx(styles.sum, 'btn mrg-m mrg--l')
    }, dominanceSum ? `${dominanceSum.toFixed(1)}%` : 0),
    position: "top",
    className: cx(styles.tooltip, 'border box body-3')
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative row body-3"
  }, "Current discussion percentage of top 10 keywords compared to all keywords on crypto platforms."))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Calendar, {
    setTrendPeriod: setTrendPeriod
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.divider, 'mrg-l mrg--l mrg--r')
  }), /*#__PURE__*/React.createElement(Share, {
    id: "top_trends_table_share_link",
    feature: "dashboard",
    source: "dashboards"
  })));
};

export default TopBar;
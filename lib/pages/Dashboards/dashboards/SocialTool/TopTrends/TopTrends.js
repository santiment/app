import React, { useState } from 'react';
import TrendsTable from '../../../../../ducks/TrendsTable';
import TopBar from './TopBar/TopBar';
import { useSocialDominanceTrendingWords } from '../hooks';
import styles from './TopTrends.module.css';

const TopTrends = () => {
  const [period, setTrendPeriod] = useState();
  const {
    dominance
  } = useSocialDominanceTrendingWords(period);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(TopBar, {
    setTrendPeriod: setTrendPeriod,
    dominance: dominance
  }), /*#__PURE__*/React.createElement(TrendsTable, {
    period: period,
    dominance: dominance
  }));
};

export default TopTrends;
const _excluded = ["className"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { InsightCard, PulseInsight } from '@cmp/InsightCard';
import { publishDateSorter } from './utils';
import Feed from '../Feed/Feed';

const Insight = _ref => {
  let {
    className
  } = _ref,
      insight = _objectWithoutProperties(_ref, _excluded);

  const El = insight.isPulse ? PulseInsight : InsightCard;
  return /*#__PURE__*/React.createElement(El, {
    insight: insight,
    class: "mrg-l mrg--b"
  });
};

const InsightsFeed = ({
  insights,
  dateKey = 'publishedAt'
}) => /*#__PURE__*/React.createElement(Feed, {
  data: insights.sort(publishDateSorter),
  dateKey: dateKey,
  component: Insight
});

export default InsightsFeed;
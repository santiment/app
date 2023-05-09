const _excluded = ["allInsightsByTag", "title"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { ALL_INSIGHTS_BY_TAG_QUERY } from './../../queries/InsightsGQL';
import { ONE_DAY_IN_MS } from '../../utils/dates';
import Insights from './Insights';
import { filterInsightsNoDrafts, getInsightTrendTagByDate } from './utils';

const InsightsTrends = _ref => {
  let {
    allInsightsByTag,
    title = 'Insights based on last trends'
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Insights, _extends({
    title: title,
    insights: allInsightsByTag.filter(filterInsightsNoDrafts)
  }, props));
};

export const getPast3DaysInsightsByTrendTag = () => [0, ONE_DAY_IN_MS, 2 * ONE_DAY_IN_MS].map(timestamp => graphql(ALL_INSIGHTS_BY_TAG_QUERY, {
  options: () => {
    return {
      variables: {
        tag: getInsightTrendTagByDate(new Date(Date.now() - timestamp))
      },
      fetchPolicy: 'cache-and-network'
    };
  },
  props: ({
    data: {
      allInsightsByTag = [],
      loading
    },
    ownProps: {
      allInsightsByTag: ownInsights = [],
      isLoadingInsights
    }
  }) => ({
    isLoadingInsights: loading || isLoadingInsights,
    allInsightsByTag: allInsightsByTag.concat(ownInsights)
  })
}));
export default compose(...getPast3DaysInsightsByTrendTag())(InsightsTrends);
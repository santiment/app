import React from 'react';
import { Query } from '@apollo/react-components';
import Icon from '@santiment-network/ui/Icon';
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../../../queries/InsightsGQL';
import { getInsightTrendTagByDate } from '../../../Insight/utils';
import { makeLinkToInsight } from '../../../../utils/url';
import styles from './TrendingCardInsights.module.css';

const TrendingCardInsights = ({
  date
}) => {
  return /*#__PURE__*/React.createElement(Query, {
    query: ALL_INSIGHTS_BY_TAG_QUERY,
    variables: {
      tag: getInsightTrendTagByDate(date)
    }
  }, ({
    data: {
      allInsightsByTag = []
    } = {}
  }) => {
    if (!allInsightsByTag || allInsightsByTag.length === 0) {
      return null;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: styles.container
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, "Connected insights"), /*#__PURE__*/React.createElement("div", {
      className: styles.list
    }, allInsightsByTag.map(({
      id,
      title
    }) => {
      return /*#__PURE__*/React.createElement("div", {
        key: id,
        className: styles.item
      }, /*#__PURE__*/React.createElement("a", {
        href: makeLinkToInsight(id, title),
        target: "_blank",
        rel: "noopener noreferrer",
        className: styles.link
      }, title), /*#__PURE__*/React.createElement(Icon, {
        type: "arrow-right",
        className: styles.icon
      }));
    })));
  });
};

export default TrendingCardInsights;
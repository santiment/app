import React from 'react';
import { Query } from 'react-apollo';
import Loader from '@santiment-network/ui/Loader/Loader';
import { INSIGHT_BY_ID_QUERY } from '../../queries/InsightsGQL';
import MetricInsightCard from './MetricInsightCard';
import styles from './MetricInsights.module.css';

const MetricInsights = ({
  insights = []
}) => {
  if (!insights.length) {
    return null;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles.usecases
  }, "Use cases from Insights"), /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, insights.map(id => {
    return /*#__PURE__*/React.createElement(Query, {
      query: INSIGHT_BY_ID_QUERY,
      variables: {
        id
      },
      key: id
    }, ({
      data: {
        insight
      } = {},
      loading
    }) => {
      if (loading) {
        return /*#__PURE__*/React.createElement(Loader, {
          className: styles.loader
        });
      }

      return /*#__PURE__*/React.createElement(MetricInsightCard, {
        insight: insight,
        id: id
      });
    });
  })));
};

export default MetricInsights;
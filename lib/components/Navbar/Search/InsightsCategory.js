const _excluded = ["searchTerm"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect, useMemo } from 'react';
import gql from 'graphql-tag';
import Category from './Category';
import { client } from '../../../apollo';
import styles from './Category.module.css';
const DEFAULT_SUGGESTIONS = [];
const INSIGHTS_QUERY = gql`
  query {
    insights: allInsights(pageSize: 5) {
      id
      title
    }
  }
`;
export const INSIGHTS_BY_SEARCH_TERM_QUERY = gql`
  query allInsightsBySearchTerm($searchTerm: String!) {
    insights: allInsightsBySearchTerm(searchTerm: $searchTerm) {
      id
      title
    }
  }
`;

const insightsAccessor = ({
  data: {
    insights
  }
}) => insights;

function getInsights() {
  return client.query({
    query: INSIGHTS_QUERY
  }).then(insightsAccessor);
}

function getInsightsBySearchTerm(searchTerm) {
  return client.query({
    query: INSIGHTS_BY_SEARCH_TERM_QUERY,
    variables: {
      searchTerm
    }
  }).then(insightsAccessor);
}

const propsAccessor = ({
  id,
  href
}) => ({
  key: id,
  href: href || '/insights/read/' + id,
  As: 'a'
});

const Insight = ({
  title
}) => title;

const InsightsCategory = _ref => {
  let {
    searchTerm
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState(DEFAULT_SUGGESTIONS);
  const hasMoreSuggestions = searchTerm && insights.length > 5;
  const suggestions = useMemo(() => {
    if (hasMoreSuggestions) {
      return insights.slice(0, 4).concat({
        id: 'show more',
        title: 'Show more results',
        href: 'https://insights.santiment.net/search?t=' + encodeURIComponent(searchTerm)
      });
    }

    return insights.slice(0, 5);
  }, [insights, hasMoreSuggestions]);
  useEffect(() => {
    const query = searchTerm ? getInsightsBySearchTerm : getInsights;
    query(searchTerm).then(setInsights);
  }, []);
  useEffect(() => {
    if (!searchTerm) {
      getInsights().then(setInsights);
      return setIsLoading(false);
    }

    setIsLoading(true);
    const timer = setTimeout(() => getInsightsBySearchTerm(searchTerm).then(insights => {
      setInsights(insights);
      setIsLoading(false);
    }), 250);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  return suggestions.length ? /*#__PURE__*/React.createElement(Category, _extends({}, props, {
    className: styles.category_insights,
    title: "Insights",
    items: suggestions,
    Item: Insight,
    propsAccessor: propsAccessor,
    isLoading: isLoading
  })) : null;
};

export default InsightsCategory;
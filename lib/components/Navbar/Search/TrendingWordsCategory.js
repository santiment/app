const _excluded = ["searchTerm"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import cx from 'classnames';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Icon from '@santiment-network/ui/Icon';
import Category, { Button } from './Category';
import styles from './Category.module.css';
const DEFAULT_SUGGESTIONS = [];
const TRENDING_WORDS_QUERY = gql`
  query {
    getTrendingWords(size: 20, from: "utc_now-1h", to: "utc_now") {
      topWords {
        word
      }
    }
  }
`;
const TREND_LINK = '/labs/trends/explore/';

const propsAccessor = ({
  word,
  key = word,
  As
}) => ({
  key,
  As,
  to: TREND_LINK + word
});

function trendingWordsPredicate(value) {
  const searchTerm = value.toLowerCase();
  return ({
    word
  }) => word.includes(searchTerm);
}

export function useTrendingWords() {
  const {
    data: {
      getTrendingWords = []
    } = {}
  } = useQuery(TRENDING_WORDS_QUERY);
  return getTrendingWords[0] ? getTrendingWords[0].topWords : DEFAULT_SUGGESTIONS;
}

const TrendingWord = ({
  word
}) => word;

const Lookup = ({
  trend,
  className
}) => /*#__PURE__*/React.createElement(Button, {
  to: TREND_LINK + trend,
  className: cx(className, styles.lookup)
}, /*#__PURE__*/React.createElement(Icon, {
  type: "fire",
  className: styles.icon
}), "Lookup as a trend");

const buildLookupSuggestion = searchTerm => ({
  key: '__lookup__',
  As: ({
    className
  }) => /*#__PURE__*/React.createElement(Lookup, {
    trend: searchTerm,
    className: className
  })
});

const TrendingWordsCategory = _ref => {
  let {
    searchTerm
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const trendingWords = useTrendingWords();
  const suggestions = useMemo(() => trendingWords.filter(trendingWordsPredicate(searchTerm)).concat(buildLookupSuggestion(searchTerm)).slice(0, 5), [searchTerm, trendingWords]);
  return /*#__PURE__*/React.createElement(Category, _extends({}, props, {
    title: "Trending words",
    items: suggestions,
    Item: TrendingWord,
    propsAccessor: propsAccessor
  }));
};

export default TrendingWordsCategory;
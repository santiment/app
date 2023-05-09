import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ChangeChart from '../../Watchlists/Widgets/Table/PriceGraph/ChangeChart';
import Skeleton from '../../../components/Skeleton/Skeleton';
import styles from './SocialVolumeGraph.module.css';
export const TRENDING_WORDS_QUERY = gql`
  query getTrendingWords($from: DateTime!, $to: DateTime!, $interval: interval) {
    getTrendingWords(size: 100, from: $from, to: $to, interval: $interval) {
      datetime
      topWords {
        score
        word
      }
    }
  }
`;

const useTrendingWords = () => {
  const query = useQuery(TRENDING_WORDS_QUERY, {
    variables: {
      from: 'utc_now-7d',
      to: 'utc_now',
      interval: '1h'
    }
  });
  return useMemo(() => {
    const {
      data,
      loading,
      error
    } = query;
    return {
      words: data ? data.getTrendingWords : [],
      loading,
      error
    };
  }, [query]);
};

const SocialVolumeGraph = ({
  word
}) => {
  const {
    words,
    loading
  } = useTrendingWords();
  const timeseries = useMemo(() => {
    return words.reduce((acc, {
      topWords,
      datetime
    }) => {
      const found = topWords.find(({
        word: target
      }) => target === word);

      if (found) {
        acc.push({
          datetime,
          value: found.score
        });
      }

      return acc;
    }, []);
  }, [word, words]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, loading && /*#__PURE__*/React.createElement(Skeleton, {
    centered: true,
    show: true,
    repeat: 1,
    className: styles.chart
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.chart
  }, /*#__PURE__*/React.createElement(ChangeChart, {
    data: timeseries,
    width: 120,
    color: 'var(--malibu)'
  })));
};

export default SocialVolumeGraph;
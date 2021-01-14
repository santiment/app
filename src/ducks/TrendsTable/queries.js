import gql from 'graphql-tag'

export const TRENDING_WORDS_QUERY = gql`
  query {
    getTrendingWords(
      size: 10
      from: "utc_now-1h"
      to: "utc_now"
      interval: "1h"
    ) {
      datetime
      topWords {
        score
        word
      }
    }
  }
`

export const LAST_DAY_SOCIAL_VOLUME_QUERY = gql`
  query getMetric($word: String!) {
    getMetric(metric: "social_volume_total") {
      timeseriesData(
        from: "utc_now-1d"
        to: "utc_now"
        selector: { text: $word }
      ) {
        datetime
        value
      }
    }
  }
`

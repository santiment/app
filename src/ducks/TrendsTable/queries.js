import gql from 'graphql-tag'

export const TRENDING_WORDS_QUERY = gql`
  query {
    getTrendingWords(
      size: 10
      from: "utc_now-1h"
      to: "utc_now"
      interval: "1h"
    ) {
      topWords {
        score
        word
      }
    }
  }
`

const newSocialVolumeQuery = (from, interval = '1d') => gql`
  query getMetric($word: String!) {
    getMetric(metric: "social_volume_total") {
      timeseriesData(
        from: "${from}"
        to: "utc_now"
        interval: "${interval}"
        selector: { text: $word }
      ) {
        value
      }
    }
  }
`

export const LAST_DAY_SOCIAL_VOLUME_QUERY = newSocialVolumeQuery('utc_now-1d')
export const SOCIAL_VOLUME_QUERY = newSocialVolumeQuery('utc_now-7d', '8h')

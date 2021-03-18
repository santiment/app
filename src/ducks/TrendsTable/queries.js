import gql from 'graphql-tag'

export const TRENDING_WORDS_QUERY = gql`
  query getTrendingWords(
    $from: DateTime = "utc_now-1h"
    $to: DateTime = "utc_now"
    $interval: interval = "1h"
  ) {
    getTrendingWords(size: 10, from: $from, to: $to, interval: $interval) {
      topWords {
        word
      }
    }
  }
`
export const TRENDING_WORDS_CONTEXT_QUERY = gql`
  query wordsContext(
    $words: [String]
    $from: DateTime = "utc_now-1h"
    $to: DateTime = "utc_now"
  ) {
    wordsData: wordsContext(
      selector: { words: $words }
      size: 10
      from: $from
      to: $to
      source: ALL
    ) {
      word
      data: context {
        word
        score
      }
    }
  }
`

const newSocialVolumeQuery = (from, interval = '1d') => gql`
  query wordsSocialVolume($words: [String]) {
    wordsData: wordsSocialVolume(
      selector: {words: $words},
      from: "${from}",
      to: "utc_now",
      interval: "${interval}"
    ) {
      word
      data: timeseriesData {
    	  value: mentionsCount
      }
    }
}
`

export const LAST_DAY_SOCIAL_VOLUME_QUERY = newSocialVolumeQuery('utc_now-1d')
export const SOCIAL_VOLUME_QUERY = newSocialVolumeQuery('utc_now-7d', '8h')

import gql from 'graphql-tag'

export const NVT_RATIO_QUERY = gql`
  query nvtRatio(
    $slug: String
    $from: DateTime
    $to: DateTime
    $interval: interval
  ) {
    nvtRatio(slug: $slug, from: $from, to: $to, interval: $interval) {
      datetime
      nvtRatioCirculation
      nvtRatioTxVolume
    }
  }
`

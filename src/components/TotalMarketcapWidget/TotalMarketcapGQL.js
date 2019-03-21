import gql from 'graphql-tag'

export const totalMarketcapGQL = gql`
  query historyPrice($from: DateTime!, $to: DateTime!, $slug: String) {
    historyPrice(from: $from, to: $to, slug: $slug, interval: "1d") {
      marketcap
      volume
      datetime
    }
  }
`

export const projectsListHistoryStatsGQL = gql`
  query projectsListHistoryStats(
    $from: DateTime!
    $to: DateTime!
    $slugs: [String]!
  ) {
    projectsListHistoryStats(from: $from, to: $to, slugs: $slugs) {
      marketcap
      volume
      datetime
    }
  }
`

// CONSTRUCTING QUERY ALIASES
export const constructTotalMarketcapGQL = (slugs, from) => {
  if (slugs.length === 0) gql``
  return gql`
  query historyPrice {
    ${slugs.reduce((acc, [slug, escapedAlias]) => {
    return (
      acc +
        `
      ${escapedAlias}: historyPrice(from: "${from}", slug: "${slug}", interval: "1d") {
        marketcap
        volume
        datetime
      }`
    )
  }, ``)}
  }
`
}

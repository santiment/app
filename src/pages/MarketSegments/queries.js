import gql from 'graphql-tag'

export const PROJECTS_QUERY = gql`
  query allProjectsByFunction($fn: json) {
    assets: allProjectsByFunction(function: $fn) {
      slug
      ticker
      name
      infrastructure
      devActivity7: averageDevActivity(days: 7)
      devActivity30: averageDevActivity
    }
  }
`

export const DEV_ACT_QUERY = (slugs, from, to) => gql`
  query devActivity{
    ${slugs.reduce(
    (acc, slug) =>
      acc +
        `
      _${slug.replace(/-/g, '_cs_')}: devActivity(
      slug: "${slug}"
      from: "${from}"
      to: "${to}"
      interval: "30d"
      transform: "movingAverage"
      movingAverageIntervalBase: 7
    ) {
      datetime
      activity
    }
    `,
    ''
  )}
  }
`

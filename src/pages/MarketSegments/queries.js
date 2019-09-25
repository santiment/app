import gql from 'graphql-tag'

export const project = gql`
  fragment project on Project {
    slug
    ticker
    name
    infrastructure
    devActivity7: averageDevActivity(days: 7)
    devActivity30: averageDevActivity
  }
`

export const ERC20_QUERY = gql`
  query allErc20Projects {
    assets: allErc20Projects(minVolume: 0) {
      ...project
    }
  }
  ${project}
`

export const WATCHLISTS_QUERY = gql`
  query watchlistBySlug($slug: String!) {
    watchlistBySlug(slug: $slug) {
      settings {
        pageSize
        tableColumns
      }
      listItems {
        project {
          ...project
        }
      }
    }
  }
  ${project}
`

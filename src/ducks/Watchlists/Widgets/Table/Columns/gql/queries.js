import gql from 'graphql-tag'

export const TABLE_CONFIG_FRAGMENT = gql`
  fragment tableConfig on UserList {
    id: Int
    title: String
    columns: json
    insertedAt: DateTime
    user {
      id
    }
`

export const FEATURED_TABLE_CONFIGS_QUERY = gql`
  query featuredTableConfigurations {
    id
    title
    insertedAt: DateTime
  }
`

export const TABLE_CONFIGS_QUERY = gql`
  query TableConfigurations {
    id
    title
    insertedAt: DateTime
    user {
      id
    }
`

export const WATCHLIST_TABLE_CONFIG_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      tableConfiguration {
        id
        title
        columns
    }
  }
`

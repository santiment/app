import gql from 'graphql-tag'

export const WATCHLIST_MONITORED_MUTATION = gql`
  mutation updateWatchlist($id: Int!, $isMonitored: Boolean) {
    updateWatchlist(id: $id, isMonitored: $isMonitored) {
      isMonitored
    }
  }
`

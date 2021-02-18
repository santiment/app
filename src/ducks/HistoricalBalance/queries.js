import gql from 'graphql-tag'

export const WALLET_ASSETS_QUERY = gql`
  query assetsHeldByAddress($address: String!, $infrastructure: String!) {
    assetsHeldByAddress(
      selector: { address: $address, infrastructure: $infrastructure }
    ) {
      slug
      balance
    }
  }
`

export const ADDRESS_QUERY = gql`
  query blockchainAddress($address: String!, $infrastructure: String!) {
    blockchainAddress(
      selector: { address: $address, infrastructure: $infrastructure }
    ) {
      id
      commentsCount
      labels {
        name
        origin
      }
    }
  }
`

export const RECENT_TRANSACTIONS_QUERY = gql`
  query recentTransactions($address: String!, $page: Int, $pageSize: Int = 20) {
    recentTransactions(
      address: $address
      page: $page
      pageSize: $pageSize
      type: ERC20
    ) {
      datetime
      fromAddress {
        address
      }
      toAddress {
        address
      }
      trxValue
      trxHash
      project {
        id
        ticker
        logoUrl
      }
    }
  }
`

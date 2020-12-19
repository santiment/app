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

export const ADDRESS_LABELS_QUERY = gql`
  query blockchainAddress($address: String!, $infrastructure: String!) {
    blockchainAddress(
      selector: { address: $address, infrastructure: $infrastructure }
    ) {
      id
      labels {
        name
        origin
      }
    }
  }
`

export const RECENT_TRANSACTIONS_QUERY = gql`
  query recentTransactions($address: String!) {
    recentTransactions(address: $address, type: ERC20) {
      datetime
      fromAddress {
        address
      }
      toAddress {
        address
      }
      trxValue
      trxHash
      slug
    }
  }
`
export const TRANSACTION_PROJECT_QUERY = gql`
  query projectBySlugGQL($slug: String!) {
    projectBySlug(slug: $slug) {
      id
      ticker
      logoUrl
    }
  }
`

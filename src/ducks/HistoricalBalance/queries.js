import gql from 'graphql-tag'

export const WALLET_ASSETS_QUERY = gql`
  query assetsHeldByAddress($address: String!, $infrastructure: String!) {
    assetsHeldByAddress(
      selector: { address: $address, infrastructure: $infrastructure }
    ) {
      slug
      balance
      balanceUsd
    }
  }
`

export const ADDRESS_QUERY = gql`
  query blockchainAddress(
    $address: binary_blockchain_address!
    $infrastructure: String!
  ) {
    blockchainAddress(
      selector: { address: $address, infrastructure: $infrastructure }
    ) {
      id
      commentsCount
      notes
      labels {
        name
        origin
      }
    }
  }
`

export const RECENT_TRANSACTIONS_QUERY = gql`
  query recentTransactions($address: String!, $page: Int, $pageSize: Int = 20) {
    transactions: recentTransactions(
      address: $address
      page: $page
      pageSize: $pageSize
      type: ERC20
      onlySender: false
    ) {
      datetime
      fromAddress {
        address
        labels {
          name
          origin
        }
      }
      toAddress {
        address
        labels {
          name
          origin
        }
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

export const TOP_TRANSACTIONS_QUERY = gql`
  query topTransfers(
    $addressSelector: AddressSelector
    $from: DateTime
    $to: DateTime = "utc_now"
    $slug: String
    $page: Int
    $pageSize: Int = 20
  ) {
    transactions: topTransfers(
      addressSelector: $addressSelector
      page: $page
      pageSize: $pageSize
      from: $from
      to: $to
      slug: $slug
    ) {
      datetime
      fromAddress {
        address
        labels {
          name
          origin
        }
      }
      toAddress {
        address
        labels {
          name
          origin
        }
      }
      trxValue
      trxHash
    }
  }
`

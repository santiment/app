import gql from 'graphql-tag'

export const TRANSACTION_FRAGMENT = gql`
  fragment transactionFragment on Transaction {
    datetime
    trxValue
    trxHash
    fromAddress {
      address
      isExchange
      labels {
        name
        metadata
      }
    }
    toAddress {
      address
      isExchange
      labels {
        name
        metadata
      }
    }
  }
`

export const TRANSACTIONS_QUERY = gql`
  query projectBySlug($slug: String!, $from: DateTime!, $to: DateTime!) {
    projectBySlug(slug: $slug) {
      id
      tokenTopTransactions(from: $from, to: $to, limit: 50) {
        ...transactionFragment
      }
      ethTopTransactions(from: $from, to: $to, limit: 50) {
        ...transactionFragment
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
`

export const TOP_TOKEN_TRANSACTIONS_QUERY = gql`
  query projectBySlug(
    $slug: String!
    $from: DateTime!
    $to: DateTime!
    $excludedAddresses: [String] = []
    $limit: Int = 10
  ) {
    projectBySlug(slug: $slug) {
      id
      tokenTopTransactions(
        from: $from
        to: $to
        limit: $limit
        excludedAddresses: $excludedAddresses
      ) {
        ...transactionFragment
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
`

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

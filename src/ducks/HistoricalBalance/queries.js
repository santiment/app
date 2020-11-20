import gql from 'graphql-tag'
import { client } from '../../apollo'

const WALLET_ASSETS_QUERY = gql`
  query assetsHeldByAddress($address: String!, $infrastructure: String!) {
    assetsHeldByAddress(
      selector: { address: $address, infrastructure: $infrastructure }
    ) {
      slug
      balance
    }
  }
`

const ASSET_INFRASTRUCTURE_QUERY = gql`
  query projectBySlug($slug: String!) {
    projectBySlug(slug: $slug) {
      id
      infrastructure
    }
  }
`

export const getWalletAssets = (address, infrastructure) =>
  client
    .query({
      query: WALLET_ASSETS_QUERY,
      variables: {
        address,
        infrastructure
      }
    })
    .then(({ data }) => data.assetsHeldByAddress)

export const getAssetInfrastructure = slug =>
  client
    .query({
      query: ASSET_INFRASTRUCTURE_QUERY,
      variables: {
        slug
      }
    })
    .then(({ data }) => data.projectBySlug.infrastructure)

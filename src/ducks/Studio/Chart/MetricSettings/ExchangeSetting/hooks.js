import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { SUPPORTED_BLOCKCHAIN_SLUGS } from './exchanges'

export const PROJECT_QUERY = gql`
  query($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      infrastructure
      mainContractAddress
    }
  }
`

const METRIC_EXCHANGES_QUERY = gql`
  query($slug: String!, $isDex: Boolean) {
    allExchanges(slug: $slug, isDex: $isDex)
  }
`

export const DEFAULT_EXCHANGE = 'All (CEX+DEX)'
const DEFAULT_EXCHANGES = [DEFAULT_EXCHANGE]

function useIsERC20 (slug, skip) {
  const { data } = useQuery(PROJECT_QUERY, {
    variables: {
      slug
    },
    skip
  })

  if (!data) return false

  const { mainContractAddress, infrastructure } = data.project
  return mainContractAddress && infrastructure === 'ETH'
}

export function useMetricExchanges (slug, isDex) {
  const isSupported = SUPPORTED_BLOCKCHAIN_SLUGS.has(slug)
  const isERC20 = useIsERC20(slug, isSupported)

  const { data, loading } = useQuery(METRIC_EXCHANGES_QUERY, {
    variables: {
      slug: isSupported ? slug : 'ethereum',
      isDex
    },
    skip: !isSupported && !isERC20
  })

  return {
    exchanges: data
      ? DEFAULT_EXCHANGES.concat(data.allExchanges)
      : DEFAULT_EXCHANGES,
    loading
  }
}

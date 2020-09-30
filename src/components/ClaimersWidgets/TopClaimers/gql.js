import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const TOP_CLAIMERS_QUERY = gql`
  query getMetric($from: DateTime!, $to: DateTime!) {
    getMetric(metric: "uniswap_top_claimers") {
      histogramData(
        selector: { slug: "uniswap" }
        from: $from
        to: $to
        limit: 50
      ) {
        values {
          ... on StringAddressFloatValueList {
            data {
              address
              value
              labels
            }
          }
        }
      }
    }
  }
`

const ADDRESS_BALANCE_CHANGE_QUERY = gql`
  query addressHistoricalBalanceChange(
    $from: DateTime!
    $to: DateTime!
    $addresses: [String]
    $selector: HistoricalBalanceSelector
  ) {
    addressHistoricalBalanceChange(
      addresses: $addresses
      from: $from
      to: $to
      selector: $selector
    ) {
      address
      balanceEnd
    }
  }
`

const TRANSACTION_VOLUME_PER_ADDRESS_QUERY = gql`
  query transactionVolumePerAddress(
    $from: DateTime!
    $to: DateTime!
    $addresses: [String]
    $selector: HistoricalBalanceSelector
  ) {
    transactionVolumePerAddress(
      addresses: $addresses
      from: $from
      to: $to
      selector: $selector
    ) {
      address
      transactionVolumeTotal
      transactionVolumeInflow
      transactionVolumeOutflow
    }
  }
`

export function useTopClaimers ({ from, to, slug }) {
  const { data = {}, loading } = useQuery(TOP_CLAIMERS_QUERY, {
    variables: { from, to }
  })

  if (
    data.getMetric &&
    data.getMetric.histogramData &&
    data.getMetric.histogramData.values
  ) {
    return [data.getMetric.histogramData.values.data || [], loading]
  }

  return [[], loading]
}

export function useUNIBalances ({ from, to, addresses = [] }) {
  const { data: { addressHistoricalBalanceChange } = {}, loading } = useQuery(
    ADDRESS_BALANCE_CHANGE_QUERY,
    {
      skip: addresses.length === 0,
      variables: {
        addresses,
        to,
        from,
        selector: {
          slug: 'uniswap',
          infrastructure: 'ETH'
        }
      }
    }
  )

  return [addressHistoricalBalanceChange, loading]
}

export function useUNITransactionVolume ({ from, to, addresses = [] }) {
  const { data: { transactionVolumePerAddress } = {}, loading } = useQuery(
    TRANSACTION_VOLUME_PER_ADDRESS_QUERY,
    {
      skip: addresses.length === 0,
      variables: {
        addresses,
        to,
        from,
        selector: {
          slug: 'uniswap',
          infrastructure: 'ETH'
        }
      }
    }
  )

  return [transactionVolumePerAddress, loading]
}

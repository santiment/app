import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_NFT_TRADES_QUERY = gql`
  query getNftTrades(
    $page: Int = 1
    $pageSize: Int = 6
    $orderBy: NftTradesOrderBy = AMOUNT
    $direction: SortDirection = DESC
  ) {
    getNftTrades(
      labelKey: NFT_INFLUENCER
      from: "utc_now-30d"
      to: "utc_now"
      orderBy: $orderBy
      direction: $direction
      page: $page
      pageSize: $pageSize
    ) {
      datetime
      fromAddress {
        address
        labelKey
      }
      toAddress {
        address
        labelKey
      }
      nft {
        contractAddress
        name
      }
      trxHash
      marketplace
      currencyProject {
        ticker
      }
      amount
      quantity
    }
  }
`

const GET_NFT_TRADES_COUNT = gql`
  {
    getNftTradesCount(
      labelKey: NFT_INFLUENCER
      from: "utc_now-30d"
      to: "utc_now"
    )
  }
`

export const useNftQuery = (
  page = 0,
  pageSize = 6,
  orderBy = 'DATETIME',
  direction = 'DESC'
) => {
  const { data, loading, error } = useQuery(GET_NFT_TRADES_QUERY, {
    variables: {
      page: page + 1,
      pageSize,
      orderBy,
      direction
    }
  })
  return { data: data ? data.getNftTrades : [], loading, error }
}

export const useNftCountQuery = () => {
  const { data } = useQuery(GET_NFT_TRADES_COUNT)
  return { maxAmount: data ? data.getNftTradesCount : 0 }
}

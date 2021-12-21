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

export const useNftQuery = (
  page = 0,
  pageSize = 6,
  orderBy = 'AMOUNT',
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
  // FIXME: replace `maxAmount` value
  return { data: data ? data.getNftTrades : [], maxAmount: 89, loading, error }
}

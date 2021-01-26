import {
  query as fetchGql,
  address_sankey as AddressSankey
} from '@bitquery/graph/src/index.js'

const query = new fetchGql(`
query ($network: EthereumNetwork!, $address: String!, $inboundDepth: Int!, $outboundDepth: Int!, $limit: Int!, $currency: String!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
  ethereum(network: $network) {
    inbound: coinpath(initialAddress: {is: $address}, currency:{is: $currency}, depth: {lteq: $inboundDepth}, options: {direction: inbound, asc: "depth", desc: "amount", limitBy: {each: "depth", limit: $limit}}, date:{since: $from, till: $till}) {
      sender {
        address
        annotation
        smartContract {
          contractType
          currency {
            symbol
            name
          }
        }
      }
      receiver {
        address
        annotation
        smartContract {
          contractType
          currency {
            symbol
            name
          }
        }
      }
      amount
      currency{symbol}
      depth
      count
    }
    outbound: coinpath(initialAddress: {is: $address}, currency:{is: $currency}, depth: {lteq: $outboundDepth}, options: {asc: "depth", desc: "amount", limitBy: {each: "depth", limit: $limit}}, date:{since: $from, till: $till}) {
      sender {
        address
        annotation
        smartContract {
          contractType
          currency {
            symbol
            name
          }
        }
      }
      receiver {
        address
        annotation
        smartContract {
          contractType
          currency {
            symbol
            name
          }
        }
      }
      amount
      currency{symbol}
      depth
      count
    }
  }
}
`)
query.JSCode = true

export const mountSankey = (id = 'sankey-graph') =>
  new AddressSankey('#' + id, query, {
    theme: 'light'
  })

export function querySankey ({ address, inbound, outbound, detail, currency }) {
  const { address: currencyAddress, symbol } = currency

  return query.request({
    address,
    inboundDepth: inbound,
    outboundDepth: outbound,
    limit: detail,
    offset: 0,
    network: 'ethereum',
    currency: currencyAddress !== '-' ? currencyAddress : symbol,
    from: null,
    till: null,
    dateFormat: '%Y-%m'
  })
}

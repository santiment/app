import React, { useState, useEffect } from 'react'
import {
  query as fetchGql,
  address_sankey as addressSankey
} from '@bitquery/graph/src/index.js'
import CurrencyTransfers from './CurrencyTransfers'
import DepthLevel from './DepthLevel'
import DetailLevel from './DetailLevel'
import styles from './index.module.scss'

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

const Graph = ({ address }) => {
  const [currency, setCurrency] = useState()
  const [inbound, setInbound] = useState(1)
  const [outbound, setOutbound] = useState(1)
  const [detail, setDetail] = useState(10)

  useEffect(() => {
    query.JSCode = true

    new addressSankey('#sankey-graph', query, {
      theme: 'light'
    })
  }, [])

  useEffect(
    () => {
      if (!currency) return

      const { address: currencyAddress, symbol } = currency

      query.request({
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
    },
    [address, currency, inbound, outbound, detail]
  )

  return (
    <>
      <div id='sankey-graph' />
      <div className={styles.controls}>
        <CurrencyTransfers
          address={address}
          currency={currency}
          setCurrency={setCurrency}
        />
        <DepthLevel name='Inbound' value={inbound} onChange={setInbound} />
        <DepthLevel name='Outbound' value={outbound} onChange={setOutbound} />
        <DetailLevel value={detail} onChange={setDetail} />
      </div>
      <div className={styles.powered}>Powered by Bitquery.io</div>
    </>
  )
}

export default Graph

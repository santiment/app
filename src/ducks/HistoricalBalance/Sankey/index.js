import React, { useState, useEffect } from 'react'
import {
  query as fetchGql,
  address_sankey,
  addControls
} from '@bitquery/graph/src/index.js'
import { currencies } from './currencies'
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

const Sankey = ({ ...props }) => {
  const [currency, setCurrency] = useState()
  const [inbound, setInbound] = useState(1)
  const [outbound, setOutbound] = useState(1)
  const [detail, setDetail] = useState(10)

  useEffect(() => {
    query.JSCode = true

    new address_sankey('#sankey-graph', query, {
      theme: 'light'
    })
  }, [])

  useEffect(
    () => {
      query.request({
        inboundDepth: inbound,
        outboundDepth: outbound,
        limit: detail,
        offset: 0,
        network: 'ethereum',
        address: '0x876eabf441b2ee5b5b0554fd502a8e0600950cfa',
        currency: 'ETH',
        from: null,
        till: null,
        dateFormat: '%Y-%m'
      })
    },
    [inbound, outbound, detail]
  )

  return (
    <div className={styles.wrapper}>
      <div id='sankey-graph' />
      <div className={styles.controls}>
        <CurrencyTransfers currency={currency} setCurrency={setCurrency} />
        <DepthLevel name='Inbound' value={inbound} onChange={setInbound} />
        <DepthLevel name='Outbound' value={outbound} onChange={setOutbound} />
        <DetailLevel value={detail} onChange={setDetail} />
      </div>
      <div className={styles.powered}>Powered by Bitquery.io</div>
    </div>
  )
}

export default Sankey

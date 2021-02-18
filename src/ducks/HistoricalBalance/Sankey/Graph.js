import React, { useState } from 'react'
import CurrencyTransfers from './CurrencyTransfers'
import DepthLevel from './DepthLevel'
import DetailLevel from './DetailLevel'
import Fullscreen from './Fullscreen'
import Sankey from './Sankey'
import styles from './index.module.scss'

const Graph = ({ address }) => {
  const [currency, setCurrency] = useState()
  const [inbound, setInbound] = useState(1)
  const [outbound, setOutbound] = useState(1)
  const [detail, setDetail] = useState(10)

  return (
    <>
      <div className={styles.controls}>
        <CurrencyTransfers
          address={address}
          currency={currency}
          setCurrency={setCurrency}
        />
        <DepthLevel name='Inbound' value={inbound} onChange={setInbound} />
        <DepthLevel name='Outbound' value={outbound} onChange={setOutbound} />
        <DetailLevel value={detail} onChange={setDetail} />

        <Fullscreen
          address={address}
          currency={currency}
          inbound={inbound}
          outbound={outbound}
          detail={detail}
        />
      </div>

      <Sankey
        address={address}
        currency={currency}
        inbound={inbound}
        outbound={outbound}
        detail={detail}
      />
    </>
  )
}

export default Graph

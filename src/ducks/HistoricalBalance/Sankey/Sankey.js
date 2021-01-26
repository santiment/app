import React, { useEffect } from 'react'
import { mountSankey, querySankey } from './utils'

const SankeyGraph = ({ id, address, currency, inbound, outbound, detail }) => {
  useEffect(() => {
    mountSankey(id)
  }, [])

  useEffect(
    () => {
      if (!currency) return

      querySankey({
        address,
        inbound,
        outbound,
        detail,
        currency
      })
    },
    [address, currency, inbound, outbound, detail]
  )

  return <div id={id} />
}
SankeyGraph.defaultProps = {
  id: 'sankey-graph'
}

export default SankeyGraph

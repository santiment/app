import React, { useEffect } from 'react'
import { mountSankey, querySankey } from './utils'
import styles from './index.module.scss'

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

  return (
    <>
      <div id={id} />
      <div className={styles.powered}>
        Data by
        {/* eslint-disable-next-line */}
        <a
          href='https://bitquery.io/'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.powered__link}
        />
        GraphQL API
      </div>
    </>
  )
}
SankeyGraph.defaultProps = {
  id: 'sankey-graph'
}

export default SankeyGraph

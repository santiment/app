import React from 'react'
import { ExchangesAssets } from './utils'
import FlowToExchanges from './FlowToExchanges'
import styles from './FlowToExchangesList.module.scss'

const FlowToExchangesList = () => {
  return (
    <div className={styles.container}>
      {ExchangesAssets.map(item => (
        <FlowToExchanges item={item} />
      ))}
    </div>
  )
}

export default FlowToExchangesList

import React from 'react'
import { ExchangesAssets } from './utils'
import FlowToExchanges from './FlowToExchanges'
import styles from './FlowToExchangesList.module.scss'

const FlowToExchangesList = () => {
  return (
    <div className={styles.container}>
      {ExchangesAssets.map((item, index) => (
        <FlowToExchanges item={item} key={index} />
      ))}
    </div>
  )
}

export default FlowToExchangesList

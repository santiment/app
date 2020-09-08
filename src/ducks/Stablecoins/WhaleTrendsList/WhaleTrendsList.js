import React from 'react'
import { WhaleAssets } from './utils'
import WhalesTrend from './WhalesTrend'
import styles from './WhaleTrendsList.module.scss'

const WhaleTrendsList = () => {
  return (
    <div className={styles.container}>
      {WhaleAssets.map(item => (
        <WhalesTrend key={item.slug} item={item} />
      ))}
    </div>
  )
}

export default WhaleTrendsList

import React from 'react'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import { formatNumber } from '../../../utils/formatting'
import styles from './FlowToExchanges.module.scss'

const FlowToExchanges = ({ item: { slug, ticker, name, value } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <ProjectIcon size={36} slug={slug} />
        <div className={styles.name}>{name}</div>
        <div className={styles.value}>
          {formatNumber(value)} {ticker}
        </div>
      </div>
    </div>
  )
}

export default FlowToExchanges

import React from 'react'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import styles from './index.module.scss'

export default () => {
  return (
    <div className={styles.wrapper + ' page'}>
      <ChartWidget />
    </div>
  )
}

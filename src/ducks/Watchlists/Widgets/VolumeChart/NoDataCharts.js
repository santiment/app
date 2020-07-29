import React from 'react'
import styles from './NoDataCharts.module.scss'

const NoDataCharts = () => {
  return (
    <div className={styles.container}>
      There is no data for your request, please
      <br />
      update or reset the filter
    </div>
  )
}

export default NoDataCharts

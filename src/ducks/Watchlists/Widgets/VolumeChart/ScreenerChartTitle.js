import React from 'react'
import styles from './ScreenerChartTitle.module.scss'

const ScreenerChartTitle = ({ type, title }) => {
  return (
    <>
      <div className={styles.type}>{type}:</div>
      <div className={styles.title}>{title}</div>
    </>
  )
}

export default ScreenerChartTitle

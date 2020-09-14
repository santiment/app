import React from 'react'
import styles from './CompareInfo.module.scss'

const CompareInfo = ({ selected }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.text}>
          {selected.length} assets on this page are selected.
        </div>
      </div>
    </div>
  )
}

export default CompareInfo

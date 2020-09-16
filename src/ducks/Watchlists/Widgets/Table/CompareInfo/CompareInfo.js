import React from 'react'
import styles from './CompareInfo.module.scss'

const CompareInfo = ({ selected, cleanAll }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.text}>
          {selected.length} assets on this page are selected.
        </div>

        {selected.length > 0 && (
          <div className={styles.clean} onClick={cleanAll}>
            Clean all
          </div>
        )}
      </div>
    </div>
  )
}

export default CompareInfo

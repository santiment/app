import React from 'react'
import Title from './Title'
import styles from './index.module.scss'

const DetailLevel = ({ ...props }) => {
  return (
    <div className={styles.details}>
      <Title>Detail level</Title>
      <div className={styles.range}>
        <div className={styles.range__select}>
          <div className={styles.range__value}>9</div>
        </div>
        <div className={styles.range__limits}>
          <span>1</span>
          <span>100</span>
        </div>
      </div>
    </div>
  )
}

export default DetailLevel

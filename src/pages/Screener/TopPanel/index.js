import React from 'react'
import styles from './index.module.scss'

const TopPanel = ({ name }) => {
  return (
    <section className={styles.wrapper}>
      <div>
        <h1 className={styles.name}>{name}</h1>
      </div>
      <div>
        <h2 className={styles.marketcap}>Total marketcap</h2>
      </div>
      <div>context menu</div>
    </section>
  )
}

export default TopPanel

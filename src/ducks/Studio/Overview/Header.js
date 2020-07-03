import React from 'react'
import styles from './Header.module.scss'

const Header = ({ ...props }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Apply metrics to the chart(s)</h2>
      <h3 className={styles.subtitle}>
        Select metrics from the left sidebar and pick where you woud like to
        place them
      </h3>
    </div>
  )
}

export default Header

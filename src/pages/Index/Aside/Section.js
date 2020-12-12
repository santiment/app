import React from 'react'
import styles from './index.module.scss'

const Section = ({ title, children }) => (
  <div className={styles.section}>
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
)

export default Section

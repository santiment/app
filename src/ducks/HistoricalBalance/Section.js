import React from 'react'
import styles from './index.module.scss'

const Section = ({ title, children, className }) => (
  <div className={className}>
    <h3 className={styles.section}>{title}</h3>
    {children}
  </div>
)

export default Section

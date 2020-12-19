import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const Section = ({ title, children, className }) => (
  <div className={cx(styles.section, className)}>
    <h3 className={styles.section}>{title}</h3>
    {children}
  </div>
)

export default Section

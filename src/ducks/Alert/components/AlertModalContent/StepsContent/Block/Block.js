import React from 'react'
import cx from 'classnames'
import styles from './Block.module.scss'

const Block = ({ label, children, className }) => (
  <div className={cx(styles.wrapper, className)}>
    <div className={styles.label}>{label}</div>
    {children}
  </div>
)

export default Block

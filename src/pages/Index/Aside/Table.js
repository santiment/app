import React from 'react'
import cx from 'classnames'
import styles from './Table.module.scss'

export const Row = props => <a {...props} className={styles.row} />

const Table = ({ className, title, leftHeader = 'Name', rightHeader }) => (
  <div className={cx(styles.wrapper, className)}>
    <div className={styles.title}>{title}</div>
    <div className={styles.headers}>
      <div>{leftHeader}</div>
      <div>{rightHeader}</div>
    </div>
    <div className={styles.rows}>
      <Row>123</Row>
      <Row>123</Row>
    </div>
  </div>
)

export default Table

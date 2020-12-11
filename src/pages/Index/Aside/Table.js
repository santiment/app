import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import styles from './Table.module.scss'

export const Row = props => <Link {...props} className={styles.row} />

const Table = ({
  className,
  title,
  leftHeader = 'Name',
  rightHeader,
  items,
  getLink,
  Item
}) => (
  <div className={cx(styles.wrapper, className)}>
    <div className={styles.title}>{title}</div>
    <div className={styles.headers}>
      <div>{leftHeader}</div>
      <div>{rightHeader}</div>
    </div>
    <div className={styles.rows}>
      {items.map((item, i) => (
        <Row key={i} to={getLink(item)}>
          {Item(item)}
        </Row>
      ))}
    </div>
  </div>
)

export default Table

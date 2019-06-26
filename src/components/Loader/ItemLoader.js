import React from 'react'
import cx from 'classnames'
import styles from './ItemLoader.module.scss'

const ItemLoader = ({ className }) => (
  <div className={cx(styles.loader, className)}>
    <span className={styles.dot} />
    <span className={styles.dot} />
    <span className={styles.dot} />
    <span className={styles.dot} />
  </div>
)

export default ItemLoader

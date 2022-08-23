import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const OrUseDivider = () => (
  <div className={styles.divider}>
    <span className={cx(styles.use, 'body-3')}>or use</span>
  </div>
)

export default OrUseDivider

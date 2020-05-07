import React from 'react'
import cx from 'classnames'
import Settings from './Settings'
import styles from './index.module.scss'

const Header = ({ className, ...props }) => (
  <div className={cx(styles.wrapper, className)}>
    <h3 className={styles.title}>Social volume</h3>
    <Settings {...props} withPricePair className={styles.settings} />
  </div>
)

export default Header

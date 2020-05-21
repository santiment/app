import React from 'react'
import cx from 'classnames'
import Settings from './Settings'
import styles from './index.module.scss'

const Header = ({ className, children, ...props }) => (
  <div className={cx(styles.wrapper, className)}>
    {children}
    <Settings {...props} withPricePair className={styles.settings} />
  </div>
)

export default Header

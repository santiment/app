import React from 'react'
import cx from 'classnames'
import Settings from '../../../Studio/Header/Settings'
import styles from './index.module.scss'

const Header = ({ className, ...props }) => (
  <div className={cx(styles.wrapper, className)}>
    <div className={styles.left}>
      <h3 className={styles.title}>Social volume score</h3>
    </div>
    <div className={styles.right}>
      <Settings {...props} withPricePair />
    </div>
  </div>
)

export default Header

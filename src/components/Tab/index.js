import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const Tab = ({ tab, tabState, notActive, className, as: El = 'div', ...rest }) => (
  <El
    className={cx(styles.tab, tab !== tabState[0] && styles.tab_inactive, className)}
    onClick={() => tabState[1](tab)}
    {...rest}
  >
    {tab}
  </El>
)

export default Tab

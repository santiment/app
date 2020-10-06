import React from 'react'
import cx from 'classnames'
import styles from './Setting.module.scss'

const Setting = ({ className, title, children }) => (
  <div className={cx(styles.setting, className)}>
    <label>{title}</label>
    {children}
  </div>
)

export default Setting

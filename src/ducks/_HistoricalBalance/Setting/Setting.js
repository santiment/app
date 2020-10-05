import React from 'react'
import styles from './Setting.module.scss'

const Setting = ({ title, children }) => (
  <div className={styles.setting}>
    <label>{title}</label>
    {children}
  </div>
)

export default Setting

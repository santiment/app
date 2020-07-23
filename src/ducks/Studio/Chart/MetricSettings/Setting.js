import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import styles from './index.module.scss'

const Setting = ({ children, isDropdown = true, ...props }) => (
  <div className={styles.setting} {...props}>
    {children}
    {isDropdown && <Icon type='arrow-down' className={styles.arrow} />}
  </div>
)

export default Setting

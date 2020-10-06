import React from 'react'
import {
  Menu,
  Setting,
  ShareButton
} from '../../SANCharts/ChartSettingsContextMenu'
import styles from './index.module.scss'

const SettingsMenu = ({ ...props }) => {
  return (
    <Menu>
      <ShareButton></ShareButton>
      <Setting title='Log scale'></Setting>
      <Setting title='Show Y'></Setting>
      <hr className={styles.divider} />
      <Setting title='Price of ethereum'></Setting>
      <Setting title='Price of network'></Setting>
    </Menu>
  )
}

export default SettingsMenu

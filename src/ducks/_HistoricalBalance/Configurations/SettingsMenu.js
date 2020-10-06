import React, { useMemo } from 'react'
import { generateUrl } from '../url'
import {
  Menu,
  Setting,
  ShareButton,
} from '../../SANCharts/ChartSettingsContextMenu'
import styles from './index.module.scss'

const SettingsMenu = ({ settings, chartAssets }) => {
  const { address } = settings
  const shareLink = useMemo(() => generateUrl(address, chartAssets, []), [
    address,
    chartAssets,
  ])

  return (
    <Menu>
      <ShareButton shareLink={shareLink}></ShareButton>
      <hr className={styles.divider} />
      <Setting title='Log scale'></Setting>
      <hr className={styles.divider} />
      <Setting title='Price of ethereum'></Setting>
      <Setting title='Price of network'></Setting>
    </Menu>
  )
}

export default SettingsMenu

import React, { useMemo } from 'react'
import { generateUrl } from '../url'
import {
  Menu,
  Setting,
  ShareButton,
} from '../../SANCharts/ChartSettingsContextMenu'
import styles from './index.module.scss'

const SettingsMenu = ({
  settings,
  chartAssets,
  priceAssets,
  togglePriceAsset,
}) => {
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
      {chartAssets.length > 0 && <hr className={styles.divider} />}
      {chartAssets.map((asset) => (
        <Setting
          key={asset.slug}
          title={`Price of ${asset.slug}`}
          onClick={() => togglePriceAsset(asset)}
          isActive={priceAssets.includes(asset)}
        ></Setting>
      ))}
    </Menu>
  )
}

export default SettingsMenu

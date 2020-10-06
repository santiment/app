import React, { useMemo } from 'react'
import { generateUrl } from '../url'
import {
  Menu,
  Setting,
  ShareButton
} from '../../SANCharts/ChartSettingsContextMenu'
import styles from './index.module.scss'

const SettingsMenu = ({
  settings,
  chartAssets,
  priceAssets,
  isLog,
  togglePriceAsset,
  setIsLog
}) => {
  const { address } = settings
  const shareLink = useMemo(() => generateUrl(address, chartAssets, []), [
    address,
    chartAssets
  ])

  return (
    <Menu>
      <ShareButton shareLink={shareLink} />
      <hr className={styles.divider} />
      <Setting
        title='Log scale'
        isActive={isLog}
        onClick={() => setIsLog(!isLog)}
      />
      {chartAssets.length > 0 && <hr className={styles.divider} />}
      {chartAssets.map(({ slug }) => (
        <Setting
          key={slug}
          title={`Price of ${slug}`}
          isActive={priceAssets.includes(slug)}
          onClick={() => togglePriceAsset(slug)}
        />
      ))}
    </Menu>
  )
}

export default SettingsMenu

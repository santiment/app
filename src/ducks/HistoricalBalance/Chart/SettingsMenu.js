import React from 'react'
import { Menu, Setting } from '../../SANCharts/ChartSettingsContextMenu'
import styles from './index.module.scss'

const SettingsMenu = ({
  settings,
  chartAssets,
  priceAssets,
  isLog,
  togglePriceAsset,
  setIsLog
}) => (
  <Menu className={styles.menu}>
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

export default SettingsMenu

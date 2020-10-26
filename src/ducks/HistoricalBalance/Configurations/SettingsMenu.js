import React from 'react'
import {
  Menu,
  Setting,
  ShareButton
} from '../../SANCharts/ChartSettingsContextMenu'
import { useShortShareLink } from '../../../components/Share/hooks'
import styles from './index.module.scss'

const SettingsMenu = ({
  settings,
  chartAssets,
  priceAssets,
  isLog,
  togglePriceAsset,
  setIsLog
}) => {
  const { shortShareLink, getShortShareLink } = useShortShareLink()

  return (
    <Menu>
      <ShareButton shareLink={shortShareLink} onMouseDown={getShortShareLink} />
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

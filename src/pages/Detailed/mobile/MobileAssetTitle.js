import React from 'react'
import { capitalizeStr } from '../../../utils/utils'
import styles from './MobileAssetTitle.module.scss'

const MobileAssetTitle = ({ slug, ticker }) => (
  <>
    <span className={styles.name}>{capitalizeStr(slug)}</span>
    {ticker && <span className={styles.ticker}>({ticker.toUpperCase()})</span>}
  </>
)

export default MobileAssetTitle

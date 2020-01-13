import React from 'react'
import { capitalizeStr } from '../../../utils/utils'
import styles from './MobileDetailedPage.module.scss'

const MobileAssetTitle = ({ slug, ticker }) => (
  <>
    {capitalizeStr(slug)}{' '}
    {ticker && <span className={styles.ticker}>({ticker.toUpperCase()})</span>}
  </>
)

export default MobileAssetTitle

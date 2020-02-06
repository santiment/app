import React from 'react'
import { formatNumber } from '../../../utils/formatting'
import Widget from '../../../components/PriceChangesWidget/PriceChangesWidget'
import styles from './MobileAssetPriceInfo.module.scss'

const MobileAssetPriceInfo = ({ priceUsd, ...props }) => (
  <div className={styles.wrapper}>
    <div className={styles.priceBlock}>
      <div className={styles.priceUsd}>
        {priceUsd && formatNumber(priceUsd, { currency: 'USD' })}
      </div>
    </div>
    <Widget {...props} price={priceUsd} className={styles.priceWidget} />
  </div>
)

export default MobileAssetPriceInfo

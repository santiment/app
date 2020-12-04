import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import ProjectIcon from './../../../../components/ProjectIcon/ProjectIcon'
import PercentChanges from './../../../../components/PercentChanges'
import { formatNumber, millify } from '../../../../utils/formatting'
import PriceGraph from './PriceGraph'
import styles from './AssetCard.module.scss'

const PRICE_RANGES = {
  '1d': 'percentChange24h',
  '7d': 'percentChange7d'
}

const AssetCard = ({
  slug,
  name,
  ticker,
  priceUsd = 0,
  priceRange,
  marketcapUsd = 0,
  onAssetClick,
  className,
  ...asset
}) => {
  const minimumFractionDigits = priceUsd > 99999 ? 0 : 2
  const maximumFractionDigits = priceUsd > 99999 ? 0 : priceUsd > 2 ? 2 : 6

  const graphKey = asset[`priceChart${priceRange}`]

  return (
    <Link
      className={cx(styles.wrapper, className)}
      to={`/projects/${slug}`}
      onClick={onAssetClick}
    >
      <div className={styles.left}>
        <div className={styles.icon}>
          <ProjectIcon size={20} slug={slug} />
        </div>
        <div className={styles.row}>
          <div className={styles.name}>{name}</div>
          <div className={styles.subRow}>
            ${millify(marketcapUsd, 0)}{' '}
            <span className={styles.ticker}>{ticker.toUpperCase()}</span>
          </div>
        </div>
      </div>
      <PriceGraph data={graphKey} className={styles.chart} width={78} />
      <div className={styles.right}>
        {priceUsd
          ? formatNumber(priceUsd, {
            currency: 'USD',
            minimumFractionDigits,
            maximumFractionDigits
          })
          : 'No data'}
        <PercentChanges
          className={styles.percentChanges}
          changes={asset[PRICE_RANGES[priceRange]] || 0}
        />
      </div>
    </Link>
  )
}

export default AssetCard

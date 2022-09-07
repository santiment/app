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
  '7d': 'percentChange7d',
}

const AssetCard = ({
  slug,
  name,
  ticker,
  logoUrl,
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
      className={cx(styles.wrapper, 'body-2 row justify c-black', className)}
      to={`/projects/${slug}`}
      onClick={onAssetClick}
    >
      <div className={cx(styles.left, 'row')}>
        <div className={cx(styles.icon, 'row hv-center')}>
          <ProjectIcon size={20} slug={slug} logoUrl={logoUrl} />
        </div>
        <div className='column mrg-s mrg--l'>
          <div className={cx(styles.name, 'nowrap line-clamp mrg-xs mrg--b')}>{name}</div>
          <div className={cx(styles.subRow, 'row')}>
            ${millify(marketcapUsd, 0)}
            <span className='mrg-xs mrg--l c-casper'>{ticker.toUpperCase()}</span>
          </div>
        </div>
      </div>
      <PriceGraph data={graphKey} className={styles.chart} width={80} />
      <div className={cx(styles.right, 'row')}>
        {priceUsd
          ? formatNumber(priceUsd, {
              currency: 'USD',
              minimumFractionDigits,
              maximumFractionDigits,
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

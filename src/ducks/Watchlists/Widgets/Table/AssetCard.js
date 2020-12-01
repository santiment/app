import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import ProjectIcon from './../../../../components/ProjectIcon/ProjectIcon'
import PercentChanges from './../../../../components/PercentChanges'
import { capitalizeStr } from './../../../../utils/utils'
import { formatNumber, millify } from '../../../../utils/formatting'
import PriceGraph from './PriceGraph'
import styles from './AssetCard.module.scss'

const AssetCard = ({
  slug,
  name,
  ticker,
  priceUsd = 0,
  percentChange24h = 0,
  marketcapUsd = 0,
  onAssetClick,
  priceChart7d,
  className
}) => {
  const includeFloatPart = priceUsd > 99999 ? 0 : 2

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
          <div>
            ${millify(marketcapUsd, 0)}{' '}
            <span className={styles.ticker}>{ticker.toUpperCase()}</span>
          </div>
        </div>
      </div>
      <PriceGraph data={priceChart7d} className={styles.chart} width={80} />
      <div className={styles.right}>
        {priceUsd
          ? formatNumber(priceUsd, {
            currency: 'USD',
            minimumFractionDigits: includeFloatPart ? 2 : 0
          })
          : 'No data'}
        <PercentChanges
          className={styles.percentChanges}
          changes={percentChange24h}
        />
      </div>
    </Link>
  )
}

export default AssetCard

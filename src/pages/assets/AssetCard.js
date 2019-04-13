import React from 'react'
import { Link } from 'react-router-dom'
import ProjectIcon from './../../components/ProjectIcon'
import PercentChanges from './../../components/PercentChanges'
import { capitalizeStr } from './../../utils/utils'
import { formatNumber, millify } from '../../utils/formatting'
import styles from './AssetCard.module.scss'

const AssetsCard = ({
  slug,
  name,
  ticker,
  priceUsd = 0,
  percentChange24h = 0,
  marketcapUsd = 0
}) => (
  <Link className={styles.wrapper} to={`/projects/${slug}`}>
    <div className={styles.left}>
      <div className={styles.icon}>
        <ProjectIcon size={20} name={name} ticker={ticker} />
      </div>
      <div className={styles.name}>
        <div>
          {capitalizeStr(slug)}{' '}
          <span className={styles.ticker}>({ticker.toUpperCase()})</span>
        </div>
        <div>$ {millify(marketcapUsd, 2)}</div>
      </div>
    </div>
    <div className={styles.right}>
      {priceUsd ? formatNumber(priceUsd, { currency: 'USD' }) : 'No data'}
      <PercentChanges
        className={styles.percentChanges}
        changes={percentChange24h}
      />
    </div>
  </Link>
)

export default AssetsCard

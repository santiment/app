import React from 'react'
import ProjectIcon from './../../components/ProjectIcon'
import PercentChanges from './../../components/PercentChanges'
import { Link } from 'react-router-dom'
import styles from './AssetsCard.module.scss'

const AssetsCard = ({
  slug,
  name,
  ticker,
  priceUsd = 0,
  percentChange24h = 0
}) => (
  <Link className={styles.wrapper} to={`/projects/${slug}`}>
    <div className={styles.name}>
      <ProjectIcon className={styles.icon} name={name} />
      {ticker}
    </div>
    <div>
      {priceUsd}
      <PercentChanges changes={percentChange24h} />
    </div>
  </Link>
)

export default AssetsCard

import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './TrendsSearch.module.scss'
import TrendsExploreSearch from './Explore/TrendsExploreSearch'

const SAMPLES = [
  {
    trend: 'bitcoin',
    options: 'asset=bitcoin&timeRange=3m'
  },
  {
    trend: 'blockchain',
    options: 'asset=bitcoin&timeRange=3m'
  },
  {
    trend: 'IEO OR IEOs OR launchpad',
    options: 'asset=binance-coin&timeRange=3m'
  }
]

const TrendsSearch = ({ topic, className }) => (
  <div className={cx(styles.TrendsSearch, className)}>
    <TrendsExploreSearch topic={topic} />
    <div className={styles.examples}>
      Try to search
      {SAMPLES.map(({ trend, options }, index, arr) => (
        <Fragment key={trend}>
          <TrendsExampleLink keyword={trend} options={options} />
          {index !== arr.length - 1 && ','}
        </Fragment>
      ))}
    </div>
  </div>
)

const TrendsExampleLink = ({ keyword, options }) => (
  <Link
    className={styles.link}
    to={`/labs/trends/explore/${keyword}${options && '?' + options}`}
  >
    {keyword}
  </Link>
)

export default TrendsSearch

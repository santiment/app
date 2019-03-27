import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './TrendsSearch.module.scss'
import TrendsExploreSearch from './Explore/TrendsExploreSearch'

const SAMPLES = [
  {
    trend: 'IEO OR IEOs OR launchpad',
    options: 'asset=binance-coin&timeRange=3m'
  }
]

const TrendsSearch = ({ topic }) => (
  <div className={styles.TrendsSearch}>
    <TrendsExploreSearch topic={topic} />
    <div className={styles.examples}>
      <span>Try searching for...</span>
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
  <Link to={`/labs/trends/explore/${keyword}${options && '?' + options}`}>
    &nbsp;
    {keyword}
  </Link>
)

export default TrendsSearch

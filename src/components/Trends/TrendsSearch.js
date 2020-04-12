import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import TrendsExploreSearch from './Explore/TrendsExploreSearch'
import { DesktopOnly } from '../Responsive'
import styles from './TrendsSearch.module.scss'

const SAMPLES = [
  {
    trend: 'corona OR coronavirus OR "covid-19"',
    options: ''
  },
  {
    trend: 'buy OR bought OR bottom OR bottomed',
    options: ''
  }
]

const TrendsSearch = ({
  topic,
  classes: {
    wrapper: className,
    form: formClassName,
    input: inputClassName
  } = {}
}) => (
  <div className={cx(styles.TrendsSearch, className)}>
    <TrendsExploreSearch
      topic={topic}
      classes={{ input: inputClassName, wrapper: formClassName }}
    />
    <TrendsSamples />
  </div>
)

export const TrendsSamples = ({ samples = SAMPLES }) => (
  <DesktopOnly>
    <div className={styles.examples}>
      Try out
      {samples.map(({ trend, options }, index, arr) => (
        <Fragment key={trend}>
          <TrendsExampleLink keyword={trend} options={options} />
          {index !== arr.length - 1 && ','}
        </Fragment>
      ))}
    </div>
  </DesktopOnly>
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

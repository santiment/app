import React, { Fragment } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import HelpPopupTrends from '../../../pages/Trends/HelpPopupTrends'
import styles from './Suggestions.module.scss'

const SUGGESTIONS = [
  {
    trend: '(buy OR bought) AND (dip OR dips)',
    options: '',
  },
  {
    trend: 'bottom',
    options: '',
  },
  {
    trend: 'sell',
    options: '',
  },
]

const Suggestions = ({ samples = SUGGESTIONS, className }) => (
  <div className={cx(styles.examples, className)}>
    Try out
    {samples.map(({ trend, options }, index, arr) => (
      <Fragment key={trend}>
        <Link
          className={styles.link}
          to={`/labs/trends/explore/${trend}${options && '?' + options}`}
        >
          {trend}
        </Link>
        {index !== arr.length - 1 && ','}
      </Fragment>
    ))}
    <HelpPopupTrends />
  </div>
)
export default Suggestions

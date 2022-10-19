import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import HelpPopupTrends from '../../../pages/Trends/HelpPopupTrends'
import styles from './Suggestions.module.scss'

const SUGGESTIONS = [
  {
    trend: 'bitcoin',
    options: '',
  },
  {
    trend: 'blockchain',
    options: '',
  },
  {
    trend: 'IEO OR IEOs OR launchpad',
    options: '',
  },
]

const TrendsExploreSuggestions = () => (
  <div className={cx(styles.wrapper, 'row v-center')}>
    <p className='c-casper mrg-xs mrg--r'>Try out:</p>
    <p className='row nowrap mrg-xs mrg--r'>
      {SUGGESTIONS.map(({ trend, options }, index) => (
        <Link
          key={trend}
          to={`/labs/trends/explore/${trend}${options && '?' + options}`}
          className='btn btn-0 mrg-xs mrg--r'
        >
          {trend}
          {index !== SUGGESTIONS.length - 1 && ','}
        </Link>
      ))}
    </p>
    <HelpPopupTrends className={styles.tooltip} triggerClassName={styles.tooltipIcon} />
  </div>
)

export default TrendsExploreSuggestions

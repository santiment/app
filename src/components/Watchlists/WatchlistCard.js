import React from 'react'
import { compose } from 'redux'
import { Icon } from '@santiment-network/ui'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PercentChanges from '../PercentChanges'
import {
  projectsListHistoryStatsGQL,
  totalMarketcapGQL
} from '../TotalMarketcapWidget/TotalMarketcapGQL'
import { getTimeIntervalFromToday, MONTH } from '../../utils/dates'
import { calcPercentageChange } from '../../utils/utils'
import { millify } from '../../utils/formatting'
import styles from './WatchlistCard.module.scss'

const WatchlistCard = ({ name, isPublic, stats, to, isError, isLoading }) => {
  const { marketcap: latestMarketcap } = stats.slice(-1)[0] || {}
  const { marketcap } = stats.slice(0, 1)[0] || {}
  const change = marketcap
    ? calcPercentageChange(marketcap, latestMarketcap)
    : 0

  return (
    <Link to={to} className={styles.wrapper}>
      <div className={cx(styles.flexRow, styles.content, styles.name)}>
        {name}
        {isPublic !== undefined && (
          <Icon type={isPublic ? 'eye' : 'lock-small'} fill='var(--casper)' />
        )}
      </div>
      {latestMarketcap ? (
        <>
          <div className={cx(styles.flexRow, styles.content)}>
            <span className={styles.marketcap}>
              $&nbsp;{millify(latestMarketcap)}
            </span>
          </div>
          <div className={styles.flexRow}>
            <PercentChanges changes={change} className={styles.change} />
            &nbsp;&nbsp;
            <span className={styles.volumeLabel}> total cap, 7d </span>
          </div>
        </>
      ) : null}
    </Link>
  )
}

WatchlistCard.propTypes = {
  name: PropTypes.string,
  change: PropTypes.number,
  isPublic: PropTypes.bool,
  to: PropTypes.string,
  data: PropTypes.array
}

WatchlistCard.defaultProps = {
  to: '#',
  stats: []
}

export const normalizeStats = arr => {
  const { length } = arr
  const isNotEmpty = length > 0
  const lastEl = isNotEmpty ? arr[length - 1] : {}

  return lastEl.marketcap === 0 && lastEl.volume === 0 ? arr.slice(0, -1) : arr
}

const enhance = compose(
  graphql(projectsListHistoryStatsGQL, {
    options: ({ slugs = [] }) => ({
      variables: {
        slugs,
        ...getTimeIntervalFromToday(-1, MONTH)
      }
    }),
    skip: ({ slugs }) => !slugs.length,
    props: ({ data: { projectsListHistoryStats = [], loading, error } }) => ({
      stats: normalizeStats(projectsListHistoryStats),
      isLoading: loading,
      isError: error
    })
  }),
  graphql(totalMarketcapGQL, {
    options: ({ slug }) => ({
      variables: {
        slug,
        ...getTimeIntervalFromToday(-1, MONTH)
      }
    }),
    skip: ({ slug }) => !slug,
    props: ({ data: { historyPrice = [], loading, error } }) => ({
      stats: normalizeStats(historyPrice),
      isLoading: loading,
      isError: error
    })
  })
)

export default enhance(WatchlistCard)

import React from 'react'
import { compose } from 'redux'
import { AreaChart, Area } from 'recharts'
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
      <div className={cx(styles.flexRow, styles.content)}>
        {latestMarketcap ? (
          <h3 className={styles.marketcap}>
            $&nbsp;{millify(latestMarketcap)}
          </h3>
        ) : (
          '. . .'
        )}
        <AreaChart width={65} height={30} data={stats}>
          <Area
            type='monotone'
            dataKey='marketcap'
            stroke={change < 0 ? 'var(--persimmon)' : 'var(--jungle-green)'}
            dot={null}
            fillOpacity={0.5}
            fill={change < 0 ? '#fcf4f4' : '#f4fcf5'}
          />
        </AreaChart>
      </div>
      <div className={styles.flexRow}>
        <PercentChanges changes={change} className={styles.change} />
        &nbsp;&nbsp;<span className={styles.volumeLabel}> total cap, 7d </span>
      </div>
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
      stats: projectsListHistoryStats,
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
      stats: historyPrice,
      isLoading: loading,
      isError: error
    })
  })
)

export default enhance(WatchlistCard)

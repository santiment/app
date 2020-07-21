import React from 'react'
import { compose } from 'redux'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import PercentChanges from '../../../components/PercentChanges'
import emptyChart from './emptyChart.svg'
import {
  CATEGORY_HISTORY_QUERY,
  WATCHLIST_HISTORY_QUERY
} from '../Widgets/WatchlistOverview/WatchlistHistory/WatchlistHistoryGQL'
import { VisibilityIndicator } from '../../../components/VisibilityIndicator'
import Gradients from '../Widgets/WatchlistOverview/Gradients'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import { calcPercentageChange } from '../../../utils/utils'
import { millify } from '../../../utils/formatting'
import NewLabel from '../../../components/NewLabel/NewLabel'
import styles from './WatchlistCard.module.scss'

const INTERVAL = '6h'
const RANGE = 7

const WatchlistCard = ({
  name,
  isPublic,
  stats,
  to,
  watchlist = {},
  onClick,
  className,
  isLoading,
  skipIndicator,
  isSimplifiedView
}) => {
  const { marketcap: latestMarketcap } = stats.slice(-1)[0] || {}
  const { marketcap } = stats.slice(0, 1)[0] || {}
  const change = marketcap
    ? calcPercentageChange(marketcap, latestMarketcap)
    : 0
  const color = `var(--${change >= 0 ? 'lima' : 'persimmon'})`
  const minMarketcap = Math.min(...stats.map(({ marketcap }) => marketcap))
  const chartStats = stats.map(stat => ({
    marketcap: stat.marketcap - minMarketcap
  }))

  const res = onClick
    ? {
      Component: 'div',
      props: {
        onClick: () => onClick(watchlist)
      }
    }
    : { Component: Link, props: { to } }

  const { insertedAt } = watchlist

  return (
    <res.Component
      className={cx(
        styles.wrapper,
        isSimplifiedView && styles.wrapper__simple,
        className
      )}
      {...res.props}
    >
      {isSimplifiedView ? (
        <div className={cx(styles.flexRow, styles.content)}>
          <span className={styles.name}>
            {[
              <NewLabel date={insertedAt} className={styles.new} key='new' />,
              name
            ]}
          </span>
          <PercentChanges changes={change} className={styles.change__simple} />
        </div>
      ) : (
        <>
          <div className={cx(styles.flexRow, styles.content)}>
            <span className={styles.name}>
              {[
                <NewLabel date={insertedAt} className={styles.new} key='new' />,
                name
              ]}
            </span>
            {isPublic !== undefined && !skipIndicator && (
              <VisibilityIndicator isPublic={isPublic} />
            )}
          </div>
          {!isLoading && (
            <>
              <div className={cx(styles.flexRow, styles.content)}>
                <span className={styles.marketcap}>
                  $&nbsp;{latestMarketcap ? millify(latestMarketcap) : 0}
                </span>
                {latestMarketcap ? (
                  <ResponsiveContainer height={35} className={styles.chart}>
                    <AreaChart data={chartStats}>
                      <defs>
                        <Gradients />
                      </defs>
                      <Area
                        dataKey='marketcap'
                        type='monotone'
                        strokeWidth={2}
                        stroke={color}
                        isAnimationActive={false}
                        fill={`url(#total${change >= 0 ? 'Up' : 'Down'})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <img src={emptyChart} alt='empty chart' />
                )}
              </div>
              <div className={styles.flexRow}>
                {latestMarketcap && (
                  <>
                    <PercentChanges
                      changes={change}
                      className={styles.change}
                    />
                    &nbsp;&nbsp;
                  </>
                )}
                <span className={styles.volumeLabel}>
                  {latestMarketcap ? 'total cap, 7d' : 'No assets'}
                </span>
              </div>
            </>
          )}
        </>
      )}
    </res.Component>
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
  // NOTE(haritonasty): remove CATEGORY_HISTORY_QUERY after migration to dynamic watchlists
  graphql(CATEGORY_HISTORY_QUERY, {
    options: ({ slug }) => ({
      variables: {
        slug,
        ...getTimeIntervalFromToday(-RANGE, DAY),
        interval: INTERVAL
      }
    }),
    skip: ({ slug }) => !slug,
    props: ({ data: { historyPrice = [], loading, error } }) => ({
      stats: historyPrice,
      isLoading: loading,
      isError: error
    })
  }),
  graphql(WATCHLIST_HISTORY_QUERY, {
    options: ({ id }) => ({
      fetchPolicy: 'no-cache',
      variables: {
        id,
        ...getTimeIntervalFromToday(-RANGE, DAY),
        interval: INTERVAL
      }
    }),
    skip: ({ id }) => !id,
    props: ({ data: { watchlist = {}, loading, error } }) => ({
      stats:
        watchlist && watchlist.historicalStats ? watchlist.historicalStats : [],
      isLoading: loading,
      isError: error
    })
  })
)

export default enhance(WatchlistCard)

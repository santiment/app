import React from 'react'
import { compose } from 'redux'
import Icon from '@santiment-network/ui/Icon'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import PercentChanges from '../PercentChanges'
import {
  PROJECTS_HISTORY_QUERY,
  CATEGORY_HISTORY_QUERY
} from '../WatchlistHistory/WatchlistHistoryGQL'
import { WATCHLIST_HISTORY_QUERY } from '../WatchlistHistory/WatchlistHistoryGQL'
import ExplanationTooltip from '../ExplanationTooltip/ExplanationTooltip'
import Gradients from '../WatchlistHistory/Gradients'
import { DAY, getTimeIntervalFromToday } from '../../utils/dates'
import { calcPercentageChange } from '../../utils/utils'
import { millify } from '../../utils/formatting'
import { filterEmptyStats } from '../WatchlistHistory/utils'
import styles from './WatchlistCard.module.scss'

const INTERVAL = '6h'

const WatchlistCard = ({
  name,
  isPublic,
  stats,
  to,
  isError,
  isLoading,
  onWatchlistClick,
  ...props
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

  const test = onWatchlistClick
    ? {
      Component: 'div',
      props: {
        onClick: () => onWatchlistClick(props)
      }
    }
    : { Component: Link, props: { to } }

  return (
    <test.Component className={styles.wrapper} {...test.props}>
      <div className={cx(styles.flexRow, styles.content)}>
        <span className={styles.name}>{name}</span>
        {isPublic !== undefined && (
          <ExplanationTooltip
            text={isPublic ? 'Public' : 'Private'}
            offsetY={7}
          >
            <Icon
              type={isPublic ? 'eye' : 'lock-small'}
              className={styles.icon}
            />
          </ExplanationTooltip>
        )}
      </div>
      {latestMarketcap ? (
        <>
          <div className={cx(styles.flexRow, styles.content)}>
            <span className={styles.marketcap}>
              $&nbsp;{millify(latestMarketcap)}
            </span>
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
          </div>
          <div className={styles.flexRow}>
            <PercentChanges changes={change} className={styles.change} />
            &nbsp;&nbsp;
            <span className={styles.volumeLabel}> total cap, 7d </span>
          </div>
        </>
      ) : null}
    </test.Component>
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
  graphql(PROJECTS_HISTORY_QUERY, {
    options: ({ slugs = [] }) => ({
      variables: {
        slugs,
        ...getTimeIntervalFromToday(-6, DAY),
        interval: INTERVAL
      }
    }),
    skip: ({ slugs }) => !slugs.length,
    props: ({ data: { projectsListHistoryStats = [], loading, error } }) => ({
      stats: filterEmptyStats(projectsListHistoryStats),
      isLoading: loading,
      isError: error
    })
  }),
  graphql(CATEGORY_HISTORY_QUERY, {
    options: ({ slug }) => ({
      variables: {
        slug,
        ...getTimeIntervalFromToday(-6, DAY),
        interval: INTERVAL
      }
    }),
    skip: ({ slug }) => !slug,
    props: ({ data: { historyPrice = [], loading, error } }) => ({
      stats: filterEmptyStats(historyPrice),
      isLoading: loading,
      isError: error
    })
  }),
  graphql(WATCHLIST_HISTORY_QUERY, {
    options: ({ id }) => ({
      variables: {
        id,
        ...getTimeIntervalFromToday(-6, DAY),
        interval: INTERVAL
      }
    }),
    skip: ({ id }) => !id,
    props: ({ data: { watchlist = {}, loading, error } }) => ({
      stats:
        watchlist && watchlist.historicalStats
          ? filterEmptyStats(watchlist.historicalStats)
          : [],
      isLoading: loading,
      isError: error
    })
  })
)

export default enhance(WatchlistCard)

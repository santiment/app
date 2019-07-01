import React from 'react'
import { compose } from 'redux'
import { Icon } from '@santiment-network/ui'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import PercentChanges from '../PercentChanges'
import {
  projectsListHistoryStatsGQL,
  totalMarketcapGQL
} from '../TotalMarketcapWidget/TotalMarketcapGQL'
import ExplanationTooltip from '../ExplanationTooltip/ExplanationTooltip'
import { DAY, getTimeIntervalFromToday } from '../../utils/dates'
import { calcPercentageChange } from '../../utils/utils'
import { millify } from '../../utils/formatting'
import styles from './WatchlistCard.module.scss'

const WatchlistCard = ({ name, isPublic, stats, to, isError, isLoading }) => {
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

  return (
    <Link to={to} className={styles.wrapper}>
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
                  <linearGradient id='totalDown' x1='0' x2='0' y1='0' y2='1'>
                    <stop
                      offset='5%'
                      stopColor='var(--persimmon)'
                      stopOpacity={0.3}
                    />
                    <stop offset='95%' stopColor='#fff' stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id='totalUp' x1='0' x2='0' y1='0' y2='1'>
                    <stop
                      offset='5%'
                      stopColor='var(--lima)'
                      stopOpacity={0.3}
                    />
                    <stop offset='95%' stopColor='#fff' stopOpacity={0} />
                  </linearGradient>
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

export const normalizeStats = arr =>
  arr.filter(({ marketcap, volume }) => marketcap !== 0 && volume !== 0)

const enhance = compose(
  graphql(projectsListHistoryStatsGQL, {
    options: ({ slugs = [] }) => ({
      variables: {
        slugs,
        ...getTimeIntervalFromToday(-6, DAY),
        interval: '6h'
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
        ...getTimeIntervalFromToday(-6, DAY),
        interval: '6h'
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

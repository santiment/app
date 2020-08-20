import React from 'react'
import cx from 'classnames'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { useWhaleTrends, WHALES_DEFAULT_SETTINGS } from './utils'
import { useProject } from '../../../hooks/project'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import Gradients from '../../Watchlists/Widgets/WatchlistOverview/Gradients'
import { calcPercentageChange } from '../../../utils/utils'
import PercentChanges from '../../../components/PercentChanges'
import Skeleton from '../../../components/Skeleton/Skeleton'
import styles from './WhalesTrend.module.scss'

const useAreaData = stats => {
  const { value: latestValue } = stats.slice(-1)[0] || {}
  const { value } = stats.slice(0, 1)[0] || {}
  const change = value ? calcPercentageChange(value, latestValue) : 0
  const color = `var(--${change >= 0 ? 'lima' : 'persimmon'})`
  const minValue = Math.min(...stats.map(({ value }) => value))
  const chartStats = stats.map(stat => ({
    value: stat.value - minValue
  }))

  return { change, chartStats, color }
}

const WhalesTrend = ({ item: { slug } }) => {
  const { data, loading } = useWhaleTrends({ slug, ...WHALES_DEFAULT_SETTINGS })

  const [project = {}] = useProject(slug)

  const { change, chartStats, color } = useAreaData(data)

  const isAccumulating = change > 0

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <ProjectIcon size={36} slug={slug} />
        <div className={styles.ticker}>{project.ticker}</div>

        <PercentChanges changes={change} className={styles.change} />
      </div>

      <Skeleton className={styles.skeleton} show={loading} repeat={1} />

      {!loading && (
        <>
          {chartStats.length > 0 ? (
            <>
              <ResponsiveContainer height={56} className={styles.chart}>
                <AreaChart data={chartStats}>
                  <defs>
                    <Gradients />
                  </defs>
                  <Area
                    dataKey='value'
                    type='monotone'
                    strokeWidth={1.5}
                    stroke={color}
                    isAnimationActive={false}
                    fill={`url(#total${change >= 0 ? 'Up' : 'Down'})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className={styles.footer}>
                Status:
                <div
                  className={cx(
                    styles.status,
                    isAccumulating ? styles.accumulating : styles.distributing
                  )}
                >
                  {isAccumulating ? 'Accumulating' : 'Distributing'}
                </div>
              </div>
            </>
          ) : (
            <NoData />
          )}
        </>
      )}
    </div>
  )
}

const NoData = () => <div className={styles.noData}>No Data</div>

export default WhalesTrend

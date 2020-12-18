import React from 'react'
import cx from 'classnames'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useWhaleTrends, WHALES_DEFAULT_SETTINGS } from './utils'
import { useProject } from '../../../hooks/project'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import Gradients from '../../Watchlists/Widgets/WatchlistOverview/Gradients'
import PercentChanges from '../../../components/PercentChanges'
import Skeleton from '../../../components/Skeleton/Skeleton'
import ChartTooltip from '../../SANCharts/tooltip/CommonChartTooltip'
import { tooltipLabelFormatter } from '../../dataHub/metrics/formatters'
import { useAreaData } from '../../Watchlists/Widgets/Table/PriceGraph/ChangeChart'
import styles from './WhalesTrend.module.scss'

const labelFormatter = (label, payload) => {
  if (!payload[0]) {
    return
  }

  return tooltipLabelFormatter(payload[0].payload.datetime)
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
                    dataKey='dataKey'
                    type='monotone'
                    strokeWidth={1.5}
                    stroke={color}
                    isAnimationActive={false}
                    fill={`url(#total${change >= 0 ? 'Up' : 'Down'})`}
                  />

                  <Tooltip
                    content={<ChartTooltip labelFormatter={labelFormatter} />}
                    cursor={false}
                    isAnimationActive={false}
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

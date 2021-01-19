import React from 'react'
import cx from 'classnames'
import { ResponsiveContainer } from 'recharts'
import { useWhaleTrends, WHALES_DEFAULT_SETTINGS } from './utils'
import { useProject } from '../../../hooks/project'
import ProjectIcon from '../../../components/ProjectIcon/ProjectIcon'
import PercentChanges from '../../../components/PercentChanges'
import Skeleton from '../../../components/Skeleton/Skeleton'
import {
  ChangeChartTemplate,
  useAreaData
} from '../../Watchlists/Widgets/Table/PriceGraph/ChangeChart'
import styles from './WhalesTrend.module.scss'

const WhalesTrend = ({ item: { slug } }) => {
  const { data, loading } = useWhaleTrends({ slug, ...WHALES_DEFAULT_SETTINGS })

  const [project = {}] = useProject(slug)

  const area = useAreaData(data)
  const { change, chartStats } = area

  const isAccumulating = change > 0

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <ProjectIcon size={36} slug={slug} logoUrl={project.logoUrl} />
        <div className={styles.ticker}>{project.ticker}</div>

        <PercentChanges changes={change} className={styles.change} />
      </div>

      <Skeleton className={styles.skeleton} show={loading} repeat={1} />

      {!loading && (
        <>
          {chartStats.length > 0 ? (
            <>
              <ResponsiveContainer height={56} className={styles.chart}>
                <ChangeChartTemplate {...area} width={'100%'} showTooltip />
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

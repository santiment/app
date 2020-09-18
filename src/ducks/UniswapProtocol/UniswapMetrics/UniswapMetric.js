import React, { useMemo, useState } from 'react'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import { millify } from '../../../utils/formatting'
import PercentChanges from '../../../components/PercentChanges'
import Skeleton from '../../../components/Skeleton/Skeleton'
import styles from './UniswapMetric.module.scss'

const INTERVAL = '1d'

const UniswapMetric = ({ metric }) => {
  const { human_readable_name, key } = metric
  const [settings] = useState({
    slug: 'uniswap',
    ...formIntervalSettings(INTERVAL)
  })
  const metrics = useMemo(
    () => {
      return [metric]
    },
    [metric]
  )

  const [data, loadings] = useTimeseries(metrics, settings)

  const last = data && data.length > 0 ? data[data.length - 1] : {}

  const change = last[key] || 0

  const sum = useMemo(
    () => {
      return data.reduce((acc, item) => {
        return acc + item[key]
      }, 0)
    },
    [data, key]
  )

  const isLoading = loadings.length > 0

  return (
    <div className={styles.card}>
      <Skeleton className={styles.skeleton} show={isLoading} repeat={1} />
      {!isLoading && (
        <>
          <div className={styles.title}>{human_readable_name}</div>

          <div className={styles.value}>{millify(sum)}</div>

          <div className={styles.percents}>
            <PercentChanges changes={change} className={styles.change} />
          </div>
        </>
      )}
    </div>
  )
}

export default UniswapMetric

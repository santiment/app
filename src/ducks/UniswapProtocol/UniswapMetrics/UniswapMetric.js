import React, { useEffect, useMemo, useState } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import { formatNumber } from '../../../utils/formatting'
import styles from './UniswapMetric.module.scss'

const INTERVAL = '1d'

const UniswapMetric = ({ metric }) => {
  const { human_readable_name, key, formatter = formatNumber } = metric
  const [settings, setSettings] = useState({
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

  const sum = useMemo(
    () => {
      const last = data && data.length > 0 ? data[data.length - 1] : {}

      return last[key] || 0
    },
    [data, key]
  )

  const isLoading = loadings.length > 0

  useEffect(() => {
    const interval = setInterval(() => {
      !isLoading &&
        setSettings({
          ...settings,
          ...formIntervalSettings(INTERVAL)
        })
    }, 120000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={styles.card}>
      <div className={styles.title}>{human_readable_name}</div>
      <div className={styles.value}>
        {data.length === 0 ? (
          <Loader className={styles.loading} />
        ) : (
          formatter(sum.toFixed(2))
        )}
      </div>
    </div>
  )
}

export default UniswapMetric

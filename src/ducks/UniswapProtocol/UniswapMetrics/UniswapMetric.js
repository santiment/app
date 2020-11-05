import React, { useEffect, useMemo, useState } from 'react'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import DashboardCounter from '../../../components/DasboardCounter/DashboardCounter'
import styles from './UniswapMetric.module.scss'

const INTERVAL = '1d'

const UniswapMetric = ({ metric }) => {
  const { human_readable_name, key, formatter } = metric
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
    <DashboardCounter
      title={human_readable_name}
      value={sum}
      loadings={isLoading}
      formatter={formatter}
      classes={styles}
    />
  )
}

export default UniswapMetric

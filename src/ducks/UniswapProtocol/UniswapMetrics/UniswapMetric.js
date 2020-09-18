import React, { useMemo, useState } from 'react'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import Loader from '@santiment-network/ui/Loader/Loader'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import { millify } from '../../../utils/formatting'
import styles from './UniswapMetric.module.scss'
import PercentChanges from '../../../components/PercentChanges'

const UniswapMetric = ({ metric }) => {
  const [settings] = useState({
    slug: 'uniswap',
    ...formIntervalSettings('1d')
  })
  const metrics = useMemo(
    () => {
      return [metric]
    },
    [metric]
  )

  const [data, loadings] = useTimeseries(metrics, settings)

  const { human_readable_name } = metric

  return (
    <div className={styles.card}>
      {loadings ? (
        <Loader className={styles.loader} />
      ) : (
        <>
          <div className={styles.title}>{human_readable_name}</div>

          <div className={styles.value}>{millify(0)}</div>

          <div className={styles.percents}>
            <PercentChanges changes={0} className={styles.change} />
          </div>
        </>
      )}
    </div>
  )
}

export default UniswapMetric

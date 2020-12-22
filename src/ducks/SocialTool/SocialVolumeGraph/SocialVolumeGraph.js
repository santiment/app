import React, { useMemo } from 'react'
import { Metric } from '../../dataHub/metrics'
import { useTimeseries } from '../../Studio/timeseries/hooks'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import ChangeChart from '../../Watchlists/Widgets/Table/PriceGraph/ChangeChart'
import Skeleton from '../../../components/Skeleton/Skeleton'
import styles from './SocialVolumeGraph.module.scss'

const METRICS = [Metric.social_volume_total]

const DEFAULT_SETTINGS = {
  ...formIntervalSettings('7d'),
  interval: '1h',
  selector: 'text'
}
const DATAKEY = Metric.social_volume_total.key

const SocialVolumeGraph = ({ word }) => {
  const MetricSettingMap = useMemo(() => {
    const map = new Map()
    map.set(Metric.social_volume_total, {
      selector: 'text'
    })

    return map
  }, [])

  const settings = useMemo(
    () => {
      return {
        ...DEFAULT_SETTINGS,
        slug: word
      }
    },
    [word]
  )

  const [data, loadings] = useTimeseries(METRICS, settings, MetricSettingMap)

  return (
    <>
      {loadings.length > 0 && (
        <Skeleton centered show={true} repeat={1} className={styles.chart} />
      )}
      <div className={styles.chart}>
        <ChangeChart
          data={data}
          dataKey={DATAKEY}
          width={120}
          color={'var(--malibu)'}
        />
      </div>
    </>
  )
}

export default SocialVolumeGraph

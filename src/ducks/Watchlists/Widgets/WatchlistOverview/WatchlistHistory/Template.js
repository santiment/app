import React from 'react'
import Range from '../WatchlistAnomalies/Range'
import PercentChanges from '../../../../../components/PercentChanges'
import { Skeleton } from '../../../../../components/Skeleton'
import MiniChart from '../../../../../components/MiniChart'
import styles from './Template.module.scss'

const Template = ({
  data,
  label,
  metric,
  change,
  value,
  period,
  changeRange,
  isLoading
}) => {
  if (isLoading) {
    return <Skeleton className={styles.skeleton} show={true} />
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <Range label={label} range={period} changeRange={changeRange} />
        <div className={styles.bottom}>
          <span className={styles.value}>$ {value}</span>
          <PercentChanges changes={change} className={styles.change} />
        </div>
      </div>
      <MiniChart
        className={styles.chart}
        valueKey={metric}
        data={data}
        change={change}
        width={150}
      />
    </div>
  )
}

export default Template

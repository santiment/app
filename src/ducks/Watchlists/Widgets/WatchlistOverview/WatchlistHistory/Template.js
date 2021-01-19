import React from 'react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import Range from '../Range'
import PercentChanges from '../../../../../components/PercentChanges'
import Gradients from '../../../../../components/Gradients'
import { Skeleton } from '../../../../../components/Skeleton'
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
  const color = `var(--${change >= 0 ? 'lima' : 'persimmon'})`

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
      <ResponsiveContainer height={35} className={styles.chart}>
        <AreaChart data={data}>
          <defs>
            <Gradients />
          </defs>
          <Area
            dataKey={metric}
            type='monotone'
            strokeWidth={2}
            stroke={color}
            fill={`url(#total${change >= 0 ? 'Up' : 'Down'})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Template

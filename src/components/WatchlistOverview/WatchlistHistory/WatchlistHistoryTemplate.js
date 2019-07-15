import React from 'react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import Loader from '@santiment-network/ui/Loader/Loader'
import Tooltip from '@santiment-network/ui/Tooltip'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import Range from '../Range'
import PercentChanges from '../../PercentChanges'
import Gradients from '../Gradients'
import styles from './WatchlistHistoryTemplate.module.scss'

const WatchlistHistoryTemplate = ({
  stats = [],
  label,
  metric,
  change,
  value,
  period,
  changeRange,
  isLoading,
  combinedInterval
}) => {
  const color = `var(--${change >= 0 ? 'lima' : 'persimmon'})`

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.top}>
          <Range label={label} range={period} changeRange={changeRange} />
          <Tooltip
            className={styles.tooltip}
            position='top'
            trigger={
              <Icon
                type='question-round-small'
                className={styles.description}
              />
            }
          >
            <Panel
              padding
            >{`Calculated as average values for ${combinedInterval}. You can change period by pressing button`}</Panel>
          </Tooltip>
        </div>
        <div className={styles.bottom}>
          <span className={styles.value}>$ {value}</span>
          {isLoading && <Loader className={styles.loader} />}
          {!isLoading && (
            <PercentChanges changes={change} className={styles.change} />
          )}
        </div>
      </div>
      {!isLoading && (
        <ResponsiveContainer height={35} className={styles.chart}>
          <AreaChart data={stats}>
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
      )}
    </div>
  )
}

export default WatchlistHistoryTemplate

import React from 'react'
import cx from 'classnames'
import { Button } from '@santiment-network/ui'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import PercentChanges from '../PercentChanges'
import ItemLoader from '../Loader/ItemLoader'
import Gradients from './Gradients'
import styles from './ListInfoWidgetItem.module.scss'

const ListInfoWidgetItem = ({
  stats = [],
  label,
  metric,
  change,
  value,
  interval,
  changeRange,
  isLoading
}) => {
  const color = `var(--${change >= 0 ? 'lima' : 'persimmon'})`

  return (
    <div className={cx(styles.wrapper)}>
      <div>
        <div className={styles.top}>
          <h3 className={styles.label}>{label}</h3>
          <Button
            fluid
            variant='flat'
            isActive
            className={styles.button}
            onClick={changeRange}
          >
            {interval}
          </Button>
        </div>
        <div className={styles.bottom}>
          <span className={styles.value}>$ {value}</span>
          {!isLoading && (
            <PercentChanges changes={change} className={styles.change} />
          )}
          {isLoading && <ItemLoader className={styles.loader} />}
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
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default ListInfoWidgetItem

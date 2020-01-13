import React from 'react'
import cx from 'classnames'
import { tooltipLabelFormatter, tooltipValueFormatter } from '../Charts'
import styles from './CommonChartTooltip.module.scss'

const ChartTooltip = ({
  valueFormatter = tooltipValueFormatter,
  labelFormatter = tooltipLabelFormatter,
  className,
  active,
  payload: initialPayload = [],
  label,
  hideItem,
  withLabel = true
}) => {
  const payload = hideItem
    ? initialPayload.filter(({ dataKey }) => !hideItem(dataKey))
    : initialPayload

  return (
    active &&
    payload &&
    payload.length > 0 && (
      <div className={cx(styles.details, className)}>
        {withLabel && (
          <div className={styles.title}>{labelFormatter(label)}</div>
        )}
        <div className={styles.content}>
          {payload.map(({ dataKey, value, color, name, formatter }) => (
            <div
              key={dataKey}
              style={{ '--color': color }}
              className={styles.metric}
            >
              {valueFormatter({ value, key: dataKey, formatter, payload })}
              <span className={styles.name}>{name || dataKey}</span>
            </div>
          ))}
        </div>
      </div>
    )
  )
}

export const renderLegend = ({ payload: items, labelFormatter }) => {
  return (
    <div className={styles.legend}>
      {items.map(item => {
        const {
          payload: { color, fill, opacity, dataKey }
        } = item

        return (
          <div
            key={dataKey}
            style={{ '--color': color || fill }}
            opacity={opacity}
            className={cx(styles.metric, styles.label)}
          >
            {labelFormatter(dataKey)}
          </div>
        )
      })}
    </div>
  )
}

export default ChartTooltip

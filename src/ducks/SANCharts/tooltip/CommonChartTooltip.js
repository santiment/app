import React from 'react'
import cx from 'classnames'
import { tooltipLabelFormatter, tooltipValueFormatter } from '../utils'
import { TooltipSetting } from '../../dataHub/tooltipSettings'
import styles from './CommonChartTooltip.module.scss'

const ChartTooltip = ({
  valueFormatter = tooltipValueFormatter,
  labelFormatter = tooltipLabelFormatter,
  className,
  active,
  payload: initialPayload = [],
  label,
  hideItem,
  withLabel = true,
  events,
  metrics
}) => {
  const payload = hideItem
    ? initialPayload.filter(({ dataKey }) => !hideItem(dataKey))
    : initialPayload

  if (events && events[label]) {
    payload.push(...events[label])
  }

  return (
    active &&
    payload &&
    payload.length > 0 && (
      <div className={cx(styles.details, className)}>
        {withLabel && (
          <div className={styles.title}>{labelFormatter(label)}</div>
        )}
        <div className={styles.content}>
          {payload.map(
            ({ key, dataKey = key, value, color, name, formatter }) => {
              const foundedSettings = TooltipSetting[key] || {}
              return (
                <div
                  key={dataKey}
                  style={{ '--color': color }}
                  className={styles.metric}
                >
                  <span className={styles.value}>
                    {valueFormatter({
                      value,
                      key: dataKey,
                      formatter: foundedSettings.formatter || formatter,
                      payload
                    })}
                  </span>
                  <span className={styles.name}>
                    {foundedSettings.label || name || dataKey}
                  </span>
                </div>
              )
            }
          )}
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

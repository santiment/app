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
  showValueLabel = true,
  events
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
          <div className={styles.title}>{labelFormatter(label, payload)}</div>
        )}
        <div className={styles.content}>
          {payload.map((p, index) => {
            const {
              key,
              dataKey = key,
              value,
              name,
              formatter,
              payload: innerPayload
            } = p

            // // for compability with tree maps [GarageInc|14.07.2020]
            let { color } = p
            if (!color && innerPayload) {
              color = innerPayload.color
            }

            const foundedSettings = TooltipSetting[key] || {}
            return (
              <div
                key={dataKey || index}
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
                {showValueLabel && (
                  <span className={styles.name}>
                    {foundedSettings.label || name || dataKey}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  )
}

export const renderLegend = ({ payload: items, labelFormatter }) => {
  return (
    <div className={styles.legend}>
      {items.map((item, index) => {
        const {
          payload: { color, fill, opacity, dataKey }
        } = item

        return (
          <div
            key={dataKey || index}
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

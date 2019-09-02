import React from 'react'
import cx from 'classnames'
import { tooltipLabelFormatter } from '../Charts'
import { formatTokensCount } from '../../../utils/formatting'
import styles from './CommonChartTooltip.module.scss'

const ChartTooltip = ({
  valueFormatter = formatTokensCount,
  labelFormatter = tooltipLabelFormatter,
  className,
  active,
  payload,
  label,
  hideItem
}) => {
  return (
    active &&
    payload &&
    payload.length > 0 && (
      <>
        <div className={cx(styles.details, className)}>
          <div className={styles.detailsTitle}>{labelFormatter(label)}</div>
          <div className={styles.detailsContent}>
            {payload.map(({ dataKey, value, color }) => {
              if (hideItem && hideItem(dataKey)) {
                return null
              }

              return (
                <div
                  key={dataKey}
                  style={{ '--color': color }}
                  className={styles.detailsMetric}
                >
                  {valueFormatter(value, dataKey, payload)}
                  <span className={styles.detailsName}>{dataKey}</span>
                </div>
              )
            })}
          </div>
        </div>
      </>
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
            className={cx(styles.detailsMetric, styles.legendLabel)}
          >
            {labelFormatter(dataKey)}
          </div>
        )
      })}
    </div>
  )
}

export default ChartTooltip

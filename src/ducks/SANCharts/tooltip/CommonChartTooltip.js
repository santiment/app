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
  label
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
              return (
                <div
                  key={dataKey}
                  style={{ '--color': color }}
                  className={styles.detailsMetric}
                >
                  {valueFormatter(value, dataKey)}
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

export default ChartTooltip

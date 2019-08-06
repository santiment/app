import React from 'react'
import cx from 'classnames'
import { formatNumber } from '../../utils/formatting'
import { getDateFormats, getTimeFormats } from '../../utils/dates'
import styles from './CustomTooltip.module.scss'

const getTooltipDate = time => {
  const date = new Date(time)
  const { MMMM, DD } = getDateFormats(date)
  const { HH, mm } = getTimeFormats(date)

  return `${HH}:${mm}, ${MMMM} ${DD}.`
}

const getShortMetricName = name => {
  if (name === 'Daily Active Addresses') return 'DAA'
  if (name === 'Development Activity') return 'Dev.act'
  if (name === 'Social Volume') return 'Soc.vol'
  return name
}

const formatTooltipValue = (isPrice, value) =>
  isPrice ? formatNumber(value, { currency: 'USD' }) : value.toFixed(2)

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div className={cx('custom-tooltip', styles.tooltip)}>
        {payload[0] && (
          <span className={styles.tooltipLabel}>
            {getTooltipDate(payload[0].payload.datetime)}
          </span>
        )}
        {payload.map(({ name, value, stroke, fill }) => {
          return (
            <span
              key={name}
              className={cx('label', styles.tooltipLabel)}
              style={{ color: stroke || fill }}
            >
              {`${getShortMetricName(name)} ${formatTooltipValue(
                name === 'Price',
                value
              )}`}
            </span>
          )
        })}
      </div>
    )
  }

  return ''
}

export default CustomTooltip

import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import AdvancedCalendarPopup from './Popup'
import { getDateFormats } from '../../utils/dates'
import styles from './index.module.scss'

const getDateLabel = date => {
  const { DD, MM, YY } = getDateFormats(date)
  return `${DD}.${MM}.${YY}`
}

const checkSameDates = (from, to) =>
  from.getDate() === to.getDate() &&
  from.getMonth() === to.getMonth() &&
  from.getFullYear() === to.getFullYear()

export default ({ className, ...props }) => {
  const { from, to } = props

  const label = checkSameDates(from, to)
    ? getDateLabel(from)
    : `${getDateLabel(from)} - ${getDateLabel(to)}`

  return (
    <AdvancedCalendarPopup
      {...props}
      trigger={
        <Button border className={cx(styles.btn, className)} classes={styles}>
          {label}
          <Icon type='arrow-down' className={styles.arrow} />
        </Button>
      }
    />
  )
}

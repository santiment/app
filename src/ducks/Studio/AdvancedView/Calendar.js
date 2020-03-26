import React from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Calendar from '../../../components/Calendar/Calendar'
import { getDateFormats } from '../../../utils/dates'
import styles from './Calendar.module.scss'

const getDateLabel = date => {
  const { DD, MMM, YY } = getDateFormats(date)
  return `${DD} ${MMM} ${YY}`
}

const checkSameDates = ([from, to]) =>
  !to ||
  (from.getDate() === to.getDate() &&
    from.getMonth() === to.getMonth() &&
    from.getFullYear() === to.getFullYear())

const AdvancedViewCalendar = ({ dates, className, ...rest }) => {
  const label = checkSameDates(dates)
    ? getDateLabel(dates[0])
    : `${getDateLabel(dates[0])} - ${getDateLabel(dates[1])}`

  return (
    <ContextMenu
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
      trigger={
        <Button border classes={styles} className={cx(styles.btn, className)}>
          {label}
          <Icon type='calendar' className={styles.icon} />
        </Button>
      }
    >
      <Calendar value={dates} {...rest} />
    </ContextMenu>
  )
}

AdvancedViewCalendar.defaultProps = {
  dates: [new Date()]
}

export default AdvancedViewCalendar

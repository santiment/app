import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import AdvancedCalendarPopup from './Popup'
import Input from './Input'
import { getDateFormats } from '../../utils/dates'
import styles from './index.module.scss'

const getDateLabel = date => {
  const { DD, MM, YY } = getDateFormats(date)
  return `${DD}/${MM}/${YY}`
}

const checkSameDates = (from, to) =>
  from.getDate() === to.getDate() &&
  from.getMonth() === to.getMonth() &&
  from.getFullYear() === to.getFullYear()

const Trigger = ({
  from,
  to,
  isActive,
  className,
  forwardedRef,
  onClick,
  onCalendarChange
}) => {
  return (
    <div
      className={cx(styles.wrapper, isActive && styles.active, className)}
      onClick={onClick}
      ref={forwardedRef}
    >
      <Input
        value={
          checkSameDates(from, to)
            ? getDateLabel(from)
            : `${getDateLabel(from)} - ${getDateLabel(to)}`
        }
        onCalendarChange={onCalendarChange}
      />
      <Icon type='arrow-down' className={styles.arrow} />
    </div>
  )
}

export default ({ className, ...props }) => {
  return (
    <AdvancedCalendarPopup
      {...props}
      trigger={<Trigger {...props} className={className} />}
    />
  )
}

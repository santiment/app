import React from 'react'
import cx from 'classnames'
import LibCalendar from 'react-calendar'
import styles from './Calendar.module.scss'
import Icon from '@santiment-network/ui/Icon'

const Calendar = ({ className, isDesktop = true, ...props }) => {
  return (
    <LibCalendar
      className={cx(styles.wrapper, className)}
      prevLabel={!isDesktop ? <Icon type='arrow-left' width={8} height={14} /> : undefined}
      nextLabel={!isDesktop ? <Icon type='arrow-right' width={8} height={14} /> : undefined}
      tileClassName={styles.tile}
      {...props}
    />
  )
}

export default Calendar

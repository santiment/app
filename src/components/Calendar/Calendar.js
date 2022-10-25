import React from 'react'
import cx from 'classnames'
import LibCalendar from 'react-calendar'
import Icon from '@santiment-network/ui/Icon'
import styles from './Calendar.module.scss'

const Calendar = ({ className, isDesktop = true, ...props }) => {
  return (
    <LibCalendar
      className={cx(styles.wrapper, className)}
      prevLabel={isDesktop ? undefined : <Icon type='arrow-left' width={8} height={14} />}
      nextLabel={isDesktop ? undefined : <Icon type='arrow-right' width={8} height={14} />}
      tileClassName={styles.tile}
      {...props}
    />
  )
}

export default Calendar

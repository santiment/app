import React, { useState } from 'react'
import cx from 'classnames'
import Dialog from '@santiment-network/ui/Dialog'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Calendar from '../../../components/Calendar/Calendar'
import { getDateFormats } from '../../../utils/dates'
import styles from './Calendar.module.scss'

const getDateLabel = (date, isFullDate) => {
  const { DD, MMM, YY, MMMM, YYYY } = getDateFormats(date)

  if (isFullDate) return `${DD} ${MMMM}, ${YYYY}`

  return `${DD} ${MMM} ${YY}`
}

const checkSameDates = ([from, to]) =>
  !to ||
  (from.getDate() === to.getDate() &&
    from.getMonth() === to.getMonth() &&
    from.getFullYear() === to.getFullYear())

const AdvancedViewCalendar = ({ dates, isFullDate, className, isDesktop = true, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false)

  const label = checkSameDates(dates)
    ? getDateLabel(dates[0], isFullDate)
    : `${getDateLabel(dates[0])} - ${getDateLabel(dates[1])}`

  const trigger = isFullDate ? (
    <Button border classes={styles} className={cx(styles.btn, className)}>
      <Icon type='calendar' className={styles.leftIcon} />
      {label}
    </Button>
  ) : (
    <Button border classes={styles} className={cx(styles.btn, className)}>
      {label}
      <Icon type='calendar' className={styles.icon} />
    </Button>
  )

  if (!isDesktop) {
    return (
      <Dialog
        title='Choose a date'
        passOpenStateAs='isActive'
        trigger={trigger}
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        classes={{
          dialog: styles.dialog,
          title: cx(styles.dialogTitle, 'row v-center body-2 txt-m'),
        }}
      >
        <Calendar value={dates} isDesktop={isDesktop} {...rest} />
        <button
          className={cx(styles.apply, 'btn-1 row hv-center body-2')}
          onClick={() => setIsOpen(false)}
        >
          Apply
        </button>
      </Dialog>
    )
  }

  return (
    <ContextMenu passOpenStateAs='isActive' position='bottom' align='end' trigger={trigger}>
      <Calendar value={dates} {...rest} />
    </ContextMenu>
  )
}

AdvancedViewCalendar.defaultProps = {
  dates: [new Date()],
}

export default AdvancedViewCalendar

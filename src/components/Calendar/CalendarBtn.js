import React from 'react'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Calendar from './Calendar'
import { getDateFormats } from '../../utils/dates'
import styles from './CalendarBtn.module.scss'

const getDateLabel = date => {
  const { DD, MM, YY } = getDateFormats(date)
  return `${DD}.${MM}.${YY}`
}

const CalendarBtn = ({ onChange, value = [new Date(), new Date()] }) => {
  const fromDate = getDateLabel(value[0])
  const toDate = getDateLabel(value[1])

  return (
    <ContextMenu
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
      trigger={
        <Button border classes={styles} className={styles.btn}>
          {fromDate} - {toDate}{' '}
          <Icon type='arrow-down' className={styles.icon} />
        </Button>
      }
    >
      <Calendar onChange={onChange} value={value} selectRange />
    </ContextMenu>
  )
}

CalendarBtn.defaultProps = {
  onChange: () => {}
}

export default CalendarBtn

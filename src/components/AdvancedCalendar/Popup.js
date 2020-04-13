import React from 'react'
import cx from 'classnames'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import Calendar from '../Calendar/Calendar'
import { getDateFormats } from '../../utils/dates'
import styles from './index.module.scss'

const getDateLabel = date => {
  const { DD, MM, YY } = getDateFormats(date)
  return `${DD}.${MM}.${YY}`
}

const CalendarBtn = ({
  onChange,
  className,
  trigger,
  value = [new Date(), new Date()],
  ...props
}) => {
  const fromDate = getDateLabel(value[0])
  const toDate = getDateLabel(value[1])

  return (
    <ContextMenu
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
      trigger={trigger}
    >
      <Panel variant='modal' className={styles.wrapper}>
        <Calendar
          onChange={onChange}
          value={value}
          selectRange
          {...props}
          className={styles.calendar}
        />
        <div className={styles.right}>
          <Button variant='ghost' fluid className={cx(styles.btn, className)}>
            All time
          </Button>
          <Button variant='ghost' fluid className={cx(styles.btn, className)}>
            Today
          </Button>
          <Button variant='ghost' fluid className={cx(styles.btn, className)}>
            Last week
          </Button>
          <Button variant='ghost' fluid className={cx(styles.btn, className)}>
            Last month
          </Button>
          <Button variant='ghost' fluid className={cx(styles.btn, className)}>
            Last 3 months
          </Button>
          <Button variant='ghost' fluid className={cx(styles.btn, className)}>
            Last 6 months
          </Button>
          <Button variant='ghost' fluid className={cx(styles.btn, className)}>
            Last year
          </Button>
        </div>
      </Panel>
    </ContextMenu>
  )
}

CalendarBtn.defaultProps = {
  onChange: () => {}
}

export default CalendarBtn

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

export default ({ date = new Date(), className, ...rest }) => {
  return (
    <ContextMenu
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
      trigger={
        <Button border classes={styles} className={cx(styles.btn, className)}>
          {getDateLabel(date)}
          <Icon type='calendar' className={styles.icon} />
        </Button>
      }
    >
      <Calendar value={date} {...rest} />
    </ContextMenu>
  )
}

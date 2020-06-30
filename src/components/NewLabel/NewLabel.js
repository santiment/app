import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { addDays, addMinutes, dateDifferenceInWords } from '../../utils/dates'
import DarkTooltip from '../Tooltip/DarkTooltip'
import styles from './NewLabel.module.scss'

const offset = new Date().getTimezoneOffset()
const NOW_WITH_OFFSET = addMinutes(new Date(), offset)
const NOW = new Date()

window.dateDifferenceInWords = dateDifferenceInWords

const showNewLabel = ({ date, limitDays = 7, checkingTime }) => {
  if (!date) {
    return false
  }
  return addDays(date, limitDays).getTime() > checkingTime.getTime()
}

const NewLabel = ({ date, className, withOffset = true }) => {
  const checkingTime = withOffset ? NOW_WITH_OFFSET : NOW

  if (!showNewLabel({ date, checkingTime })) {
    return null
  }

  return (
    <DarkTooltip
      position='top'
      align='start'
      on='hover'
      className={styles.tooltip}
      trigger={
        <Label
          className={cx(styles.label, className)}
          accent='jungle-green'
          variant='fill'
        >
          NEW
        </Label>
      }
    >
      Created{' '}
      {dateDifferenceInWords({
        from: new Date(date),
        to: checkingTime,
        format: 'd'
      })}
    </DarkTooltip>
  )
}

export default NewLabel

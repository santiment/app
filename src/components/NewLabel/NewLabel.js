import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { addDays, addMinutes, dateDifferenceInWords } from '../../utils/dates'
import DarkTooltip from '../Tooltip/DarkTooltip'
import styles from './NewLabel.module.scss'

const currentTimezoneOffset = new Date().getTimezoneOffset()
const NOW = addMinutes(new Date(), currentTimezoneOffset)

window.dateDifferenceInWords = dateDifferenceInWords

const showNewLabel = (date, limitDays = 7) => {
  return date && addDays(date, limitDays).getTime() > NOW.getTime()
}

const NewLabel = ({ date, className }) => {
  if (!showNewLabel(date)) {
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
      {dateDifferenceInWords({ from: new Date(date), to: NOW, format: 'd' })}
    </DarkTooltip>
  )
}

export default NewLabel

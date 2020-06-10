import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import { addDays, dateDifferenceInWords } from '../../utils/dates'
import DarkTooltip from '../Tooltip/DarkTooltip'
import styles from './NewLabel.module.scss'

const NOW = new Date()

window.dateDifferenceInWords = dateDifferenceInWords

const showNewLabel = (date, limitDays = 7) => {
  if (!date) {
    return false
  }

  return addDays(date, limitDays).getTime() > NOW.getTime()
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

import React from 'react'
import cx from 'classnames'
import {
  dateDifferenceInWordsString,
  getAmPm,
  getDateFormats,
  getTimeFormats,
  make12Hours
} from '../../../../utils/dates'
import { TODAY, YESTERDAY } from '../FeedList/dates'
import styles from './FeedCardDate.module.scss'

const makeDateLabel = date => {
  switch (date.toLocaleDateString()) {
    case TODAY: {
      return dateDifferenceInWordsString(date)
    }
    case YESTERDAY: {
      const { H, mm } = getTimeFormats(date)
      return `Yesterday, ${make12Hours(H)}:${mm}${getAmPm(H)}`
    }
    default: {
      const { DD, MM, YYYY } = getDateFormats(date)
      const { H, mm } = getTimeFormats(date)
      return `${DD}-${MM}-${YYYY}, ${make12Hours(H)}:${mm}${getAmPm(H)}`
    }
  }
}

const FeedCardDate = ({ date, className }) => {
  return (
    <div className={cx(styles.date, className)}>
      {makeDateLabel(new Date(date))}
    </div>
  )
}

export default FeedCardDate

import React from 'react'
import {
  dateDifferenceInWordsString,
  getAmPm,
  getDateFormats,
  getTimeFormats
} from '../../../../utils/dates'
import { TODAY, YESTERDAY } from '../FeedList/FeedList'
import styles from './FeedCardDate.module.scss'

const makeDateLabel = date => {
  switch (date.toLocaleDateString()) {
    case TODAY: {
      return dateDifferenceInWordsString(date)
    }
    case YESTERDAY: {
      const { H, mm } = getTimeFormats(date)
      return `Yesterday, ${H}:${mm}${getAmPm(H)}`
    }
    default: {
      const { DD, MM, YYYY } = getDateFormats(date)
      const { H, mm } = getTimeFormats(date)
      return `${DD}-${MM}-${YYYY}, ${H}:${mm}${getAmPm(H)}`
    }
  }
}

const FeedCardDate = ({ date }) => {
  return <div className={styles.date}>{makeDateLabel(new Date(date))}</div>
}

export default FeedCardDate

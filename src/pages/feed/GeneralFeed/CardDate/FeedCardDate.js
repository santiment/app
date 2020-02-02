import React from 'react'
import { dateDifferenceInWordsString } from '../../../../utils/dates'
import styles from './FeedCardDate.module.scss'

const FeedCardDate = ({ date }) => {
  return <div className={styles.date}>{dateDifferenceInWordsString(date)}</div>
}

export default FeedCardDate

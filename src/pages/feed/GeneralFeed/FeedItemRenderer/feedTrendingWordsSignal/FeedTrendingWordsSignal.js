import React from 'react'
import styles from './FeedTrendingWordsSignal.module.scss'

const FeedTrendingWordsSignal = ({ trigger, user_trigger_data }) => {
  const { description } = trigger
  const { chart_url } = user_trigger_data

  return (
    <div>
      <div className={styles.description}>{description}</div>

      <img src={chart_url} alt='Backtesting chart' />
    </div>
  )
}

export default FeedTrendingWordsSignal

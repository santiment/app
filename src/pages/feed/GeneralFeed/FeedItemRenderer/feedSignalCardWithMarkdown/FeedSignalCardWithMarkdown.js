import React from 'react'
import styles from './FeedSignalCardWithMarkdown.module.scss'

const FeedSignalCardWithMarkdown = ({ trigger, user_trigger_data }) => {
  const { description } = trigger
  const { chart_url } = user_trigger_data

  return (
    <>
      <div className={styles.description}>{description}</div>

      <img src={chart_url} alt='Backtesting chart' />
    </>
  )
}

export default FeedSignalCardWithMarkdown

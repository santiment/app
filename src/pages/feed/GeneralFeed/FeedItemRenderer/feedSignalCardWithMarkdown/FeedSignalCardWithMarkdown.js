import React from 'react'
import styles from './FeedSignalCardWithMarkdown.module.scss'
import { Link } from 'react-router-dom'

export const MoreInfo = ({ slug }) => {
  return (
    slug && (
      <Link to={'/projects/' + slug} className={styles.more}>
        More info
      </Link>
    )
  )
}

const FeedSignalCardWithMarkdown = ({ trigger, user_trigger_data }) => {
  const { description } = trigger
  const { chart_url, project_slug } = user_trigger_data

  return (
    <>
      <div className={styles.description}>{description}</div>

      <MoreInfo slug={project_slug} />

      <img src={chart_url} alt='Backtesting chart' className={styles.img} />
    </>
  )
}

export default FeedSignalCardWithMarkdown

import React from 'react'
import styles from './FeedSignalCardWithMarkdown.module.scss'
import { Link } from 'react-router-dom'
import { TRENDING_WORDS } from '../../../../../ducks/Signals/utils/constants'

export const MoreInfo = ({ slug, type }) => {
  if (!slug) {
    return null
  }

  const link = type === TRENDING_WORDS ? '/labs/trends' : '/projects/' + slug

  return (
    <Link to={link} className={styles.more}>
      More info
    </Link>
  )
}

const FeedSignalCardWithMarkdown = ({ trigger, user_trigger_data }) => {
  const { description } = trigger
  const { project_slug, trending_words } = user_trigger_data

  return (
    <>
      <div className={styles.description}>{description}</div>

      <MoreInfo slug={project_slug} type={trending_words} />
    </>
  )
}

export default FeedSignalCardWithMarkdown

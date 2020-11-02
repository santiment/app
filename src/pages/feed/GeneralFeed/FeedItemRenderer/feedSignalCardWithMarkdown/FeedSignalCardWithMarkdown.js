import React from 'react'
import { Link } from 'react-router-dom'
import { TRENDING_WORDS } from '../../../../../ducks/Signals/utils/constants'
import ScreenerTriggerDescription from '../../../../../components/ScreenerTriggerDescription/ScreenerTriggerDescription'
import styles from './FeedSignalCardWithMarkdown.module.scss'

export const getLink = ({ type, slug }) => {
  return type === TRENDING_WORDS ? '/labs/trends' : '/projects/' + slug
}

export const MoreInfo = ({ slug, type }) => {
  if (!slug) {
    return null
  }

  const link = getLink({ type, slug })

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
    <div className={styles.card}>
      <div className={styles.description}>{description}</div>

      <ScreenerTriggerDescription trigger={trigger} data={user_trigger_data} />

      <MoreInfo slug={project_slug} type={trending_words} />
    </div>
  )
}

export default FeedSignalCardWithMarkdown

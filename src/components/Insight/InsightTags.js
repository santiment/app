import React from 'react'
import { Link } from 'react-router-dom'
import { noTrendTagsFilter } from './utils'
import styles from './InsightCard.module.scss'

const InsightTags = ({ tags = [] }) => {
  return tags.filter(noTrendTagsFilter).map(({ name }) => {
    return (
      <Link to={`/insights/tags/${name}`} key={name} className={styles.tag}>
        {name}
      </Link>
    )
  })
}

export default InsightTags

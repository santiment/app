import React from 'react'
import { Link } from 'react-router-dom'
import styles from './InsightCard.module.scss'

const InsightTags = ({ tags = [] }) => {
  return tags.map(({ name }) => {
    return (
      <Link to={`/insights/tags/${name}`} key={name} className={styles.tag}>
        {name}
      </Link>
    )
  })
}

export default InsightTags

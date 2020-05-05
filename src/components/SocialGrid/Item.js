import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Item.module.scss'

const Item = ({ topic, onTopicClick }) => (
  <article className={styles.wrapper}>
    <Link to={`/labs/trends/explore/${topic}`} className={styles.text}>
      {topic}
    </Link>
  </article>
)

export default Item

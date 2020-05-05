import React from 'react'
import { Link } from 'react-router-dom'
import Chart from './Chart'
import styles from './Item.module.scss'

const Item = ({ topic, onTopicClick }) => (
  <article className={styles.wrapper}>
    <Link to={`/labs/trends/explore/${topic}`} className={styles.text}>
      {topic}
    </Link>
    <Chart topic={topic} />
  </article>
)

export default Item

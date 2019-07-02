import React from 'react'
import NewsCard from './NewsCard'
import styles from './News.module.scss'

const News = ({ data = [] }) => {
  return (
    <div className={styles.items}>
      {data.map((item, idx) => (
        <NewsCard key={idx} {...item} />
      ))}
    </div>
  )
}

export default News

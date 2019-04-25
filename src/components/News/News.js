import React from 'react'
import NewsCard from './NewsCard'
import styles from './News.module.scss'

const News = ({ news }) => {
  return (
    <div className={styles.items}>
      {news &&
        news.map(item => (
          <NewsCard
            key={`${item.title} ${item.description}`}
            className={styles.item}
            {...item}
          />
        ))}
    </div>
  )
}

export default News

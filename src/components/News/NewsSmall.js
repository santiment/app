import React from 'react'
import NewsSmallCard from './NewsSmallCard'

const NewsSmall = ({ data = [] }) => {
  return (
    <div>
      {data.map((item, idx) => (
        <NewsSmallCard key={idx} {...item} />
      ))}
    </div>
  )
}

export default NewsSmall

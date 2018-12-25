import React from 'react'
// import ReactWordCloud from 'react-wordcloud'
import TagCloud from 'react-tag-cloud'
import styles from './WordCloud.module.scss'

const defaultWords = [
  { word: 'money', value: 74 },
  { word: 'crypto', value: 46 },
  { word: 'bank', value: 25 },
  { word: 'block', value: 7 },
  { word: 'project', value: 6 },
  { word: 'ico', value: 5 },
  { word: 'hidden', value: 4 },
  { word: 'blockchain', value: 3 },
  { word: 'coins', value: 2 },
  { word: 'stable', value: 1 },
  { word: 'nodes', value: 0 },
  { word: 'liquidity', value: 5 }
]

const getIndex = index => {
  switch (index) {
    case 0:
      return styles.text_big
    case 1:
    case 2:
      return styles.text_medium
    default:
      return ''
  }
}

const WordCloud = ({ words = defaultWords }) => {
  const sortedWords = words
    .slice()
    .sort(({ value: valueA }, { value: valueB }) => (valueA < valueB ? 1 : -1))

  return (
    <div className={styles.wrapper}>
      <TagCloud style={{ width: '95%', height: '85%', padding: 10 }}>
        {sortedWords.map(({ word }, index) => (
          <div className={`${styles.text} ${getIndex(index)}`}>{word}</div>
        ))}
      </TagCloud>
    </div>
  )
}

export default WordCloud

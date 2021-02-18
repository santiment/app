import React from 'react'
import TagCloud from 'react-tag-cloud'
import { Link } from 'react-router-dom'
import { formatNumber } from '../../utils/formatting'
import styles from './WordCloud.module.scss'

const BIG_LIMIT = 3
const MEDIUM_LIMIT = 9

const WORD_BIG = {
  color: 'var(--dodger-blue)',
  fontSize: 18,
  fontWeight: 600
}

const WORD_MEDIUM = {
  color: 'var(--rhino)',
  fontSize: 16
}

const WORD_SMALL = {
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--casper)'
}

const getWordStyles = (index, bigLimit, mediumLimit) => {
  if (index < bigLimit) {
    return WORD_BIG
  }

  if (index < mediumLimit) {
    return WORD_MEDIUM
  }

  return WORD_SMALL
}

const WordCloudContent = ({
  cloud,
  showBadge = true,
  bigLimit = BIG_LIMIT,
  mediumLimit = MEDIUM_LIMIT,
  padding = 15
}) => {
  return (
    <TagCloud
      style={{ width: '100%', height: '100%', padding: padding, marginTop: 0 }}
    >
      {cloud.map(({ word, score }, index) => (
        <Link
          key={word}
          to={`/labs/trends/explore/${word}`}
          style={getWordStyles(index, bigLimit, mediumLimit)}
          className={styles.text}
        >
          {word}
          {showBadge && index < bigLimit && (
            <div className={styles.score}>
              {formatNumber(score, { maximumFractionDigits: 2 })}
            </div>
          )}
        </Link>
      ))}
    </TagCloud>
  )
}

export default WordCloudContent

import React from 'react'
import TagCloud from 'react-tag-cloud'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { formatNumber } from '../../utils/formatting'
import styles from './WordCloud.module.scss'

const BIG_LIMIT = 3
const MEDIUM_LIMIT = 9

const WORD_BIG = {
  color: 'var(--dodger-blue)',
  fontSize: 18,
  fontWeight: 600,
}

const WORD_MEDIUM = {
  color: 'var(--rhino)',
  fontSize: 16,
}

const WORD_SMALL = {
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--casper)',
}

const getWordStyles = (index, bigLimit, mediumLimit, fixedFont) => {
  if (index < bigLimit) {
    if (fixedFont) return { color: WORD_BIG.color, ...fixedFont }

    return WORD_BIG
  }

  if (index < mediumLimit) {
    if (fixedFont) return { color: WORD_MEDIUM.color, ...fixedFont }

    return WORD_MEDIUM
  }

  if (fixedFont) return { color: WORD_SMALL.color, ...fixedFont }

  return WORD_SMALL
}

const WordCloudContent = React.memo(
  ({
    cloud,
    showBadge = true,
    bigLimit = BIG_LIMIT,
    mediumLimit = MEDIUM_LIMIT,
    padding = 15,
    fixedFont,
    textClassName,
  }) => {
    return (
      <TagCloud
        style={{
          width: '100%',
          height: '100%',
          padding: padding,
          marginTop: 0,
        }}
      >
        {cloud.map(({ word, score }, index) => (
          <Link
            key={word}
            to={`/labs/trends/explore/${word}`}
            style={getWordStyles(index, bigLimit, mediumLimit, fixedFont)}
            className={cx(styles.text, textClassName)}
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
  },
)

export default WordCloudContent

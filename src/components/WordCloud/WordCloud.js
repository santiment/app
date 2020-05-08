import React from 'react'
import TagCloud from 'react-tag-cloud'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import HelpPopup from './../../components/HelpPopup/HelpPopup'
import WidgetTrend from '../Widget/WidgetTrend'
import { WORD_CLOUD_QUERY } from './wordCloudGQL.js'
import { formatNumber } from '../../utils/formatting'
import { getTimeIntervalFromToday } from '../../utils/dates'
import styles from './WordCloud.module.scss'
import stylesTooltip from '../../components/HelpPopup/HelpPopup.module.scss'

const BIG_LIMIT = 3

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

const getWordStyles = index => {
  if (index < BIG_LIMIT) {
    return WORD_BIG
  }

  if (index < 9) {
    return WORD_MEDIUM
  }

  return WORD_SMALL
}

export const WordCloud = ({
  word: searchWord,
  data: { wordContext: cloud = [], loading: isLoading, error } = {},
  className = '',
  ...rest
}) => {
  return (
    <WidgetTrend
      className={className}
      trendWord={searchWord}
      description={
        <>
          <span className={styles.heading}>Social context</span>
          <HelpPopup>
            <h4 className={stylesTooltip.title}>Social context</h4>
            These words are often used alongside the main keyword on crypto
            social media. Larger words are found more frequently in comments
            that also include the main keyword.
          </HelpPopup>
        </>
      }
      isLoading={isLoading}
      error={error}
      hasData={cloud.length > 0}
      {...rest}
    >
      <TagCloud
        style={{ width: '100%', height: '100%', padding: 15, marginTop: 0 }}
      >
        {cloud.map(({ word, score }, index) => (
          <Link
            key={word}
            to={`/labs/trends/explore/${word}`}
            style={getWordStyles(index)}
            className={styles.text}
          >
            {word}
            {index < BIG_LIMIT && (
              <div className={styles.score}>
                {formatNumber(score, { maximumFractionDigits: 2 })}
              </div>
            )}
          </Link>
        ))}
      </TagCloud>
    </WidgetTrend>
  )
}

export default React.memo(
  graphql(WORD_CLOUD_QUERY, {
    skip: ({ word }) => !word,
    options: ({ word, size = 25, from, to }) => {
      let fromIso = from
      let toIso = to
      if (!from) {
        const { from, to } = getTimeIntervalFromToday(-1, 'd')
        fromIso = from.toISOString()
        toIso = to.toISOString()
      }
      return {
        variables: {
          from: fromIso,
          to: toIso,
          size,
          word
        }
      }
    }
  })(WordCloud)
)

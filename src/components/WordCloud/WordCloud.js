import React from 'react'
import TagCloud from 'react-tag-cloud'
import { graphql } from 'react-apollo'
import HelpPopupWordCloud from './HelpPopupWordCloud'
import WidgetTrend from '../Widget/WidgetTrend'
import { WORD_CLOUD_QUERY } from './wordCloudGQL.js'
import { getTimeIntervalFromToday } from '../../utils/dates'
import styles from './WordCloud.module.scss'

const WORD_BIG = {
  color: 'var(--dodger-blue)',
  fontSize: 20,
  fontWeight: 800
}

const WORD_MEDIUM = {
  color: 'var(--mirage)',
  fontSize: 16
}

const WORD_SMALL = {
  fontSize: 10
}

const getWordStyles = index => {
  if (index < 3) {
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
          <span className={styles.heading}>top connected words</span>
          <HelpPopupWordCloud />
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
        {cloud.map(({ word }, index) => (
          <div key={word} style={getWordStyles(index)} className={styles.text}>
            {word}
          </div>
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

import React, { Fragment } from 'react'
import TagCloud from 'react-tag-cloud'
import { graphql } from 'react-apollo'
import HelpPopupWordCloud from './HelpPopupWordCloud'
import WidgetTrend from '../Widget/WidgetTrend'
import { wordCloudGQL as WORD_CLOUD_QUERY } from './wordCloudGQL.js'
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
  className = ''
}) => {
  return (
    <WidgetTrend
      className={className}
      trendWord={searchWord}
      description={
        <Fragment>
          social context
          <HelpPopupWordCloud />
        </Fragment>
      }
      isLoading={isLoading}
      error={error}
      hasData={cloud.length > 0}
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
    options: ({ word }) => {
      const { from, to } = getTimeIntervalFromToday(-3, 'd')
      return {
        variables: {
          from: from.toISOString(),
          to: to.toISOString(),
          size: 25,
          word
        }
      }
    }
  })(WordCloud)
)

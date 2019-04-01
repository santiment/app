import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import TagCloud from 'react-tag-cloud'
import HelpPopupWordCloud from './HelpPopupWordCloud'
import WidgetTrend from '../Widget/WidgetTrend'
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
  cloud = [],
  searchWord,
  isLoading,
  error,
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

const mapStateToProps = (state, ownProps) => ({
  cloud: state.wordCloud.cloud || ownProps.cloud,
  isLoading: state.wordCloud.isLoading,
  error: state.wordCloud.error,
  searchWord: state.wordCloud.word
})

export default connect(mapStateToProps)(WordCloud)

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import TagCloud from 'react-tag-cloud'
import HelpPopupWordCloud from './HelpPopupWordCloud'
import WidgetTrend from '../Widget/WidgetTrend'
import styles from './WordCloud.module.scss'

const getWordStyles = index => {
  if (index < 3) {
    return styles.text_big
  }

  if (index < 9) {
    return styles.text_medium
  }
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
        style={{ width: '95%', height: '85%', padding: 10, marginTop: 0 }}
      >
        {cloud.map(({ word }, index) => (
          <div key={word} className={cx(styles.text, getWordStyles(index))}>
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import TagCloud from 'react-tag-cloud'
import { FadeIn } from 'animate-components'
import HelpPopupWordCloud from './HelpPopupWordCloud'
import styles from './WordCloud.module.scss'

const WORD_BIG = {
  color: '#7a859e',
  fontSize: 28
}

const WORD_MEDIUM = {
  color: '#7a859e',
  fontSize: 20
}

const WORD_SMALL = {
  fontSize: 12
}

const getWordStyles = index => {
  switch (index) {
    case 0:
      return WORD_BIG
    case 1:
    case 2:
      return WORD_MEDIUM
    default:
      return WORD_SMALL
  }
}

class WordCloud extends Component {
  render () {
    const { cloud = [], searchWord } = this.props
    if (this.props.isLoading) {
      return (
        <div className={styles.wrapper + ' ' + styles.WordCloudLoading}>
          <FadeIn duration='2s' timingFunction='ease-out'>
            <h3>Loading...</h3>
          </FadeIn>
        </div>
      )
    }

    if (this.props.error) {
      return (
        <div className={styles.wrapper + ' ' + styles.WordCloudLoading}>
          <FadeIn duration='2s' timingFunction='ease-out'>
            <h3>We don't find anything...</h3>
          </FadeIn>
        </div>
      )
    }

    if (cloud.length === 0) {
      return (
        <div className={styles.wrapper + ' ' + styles.WordCloudLoading}>
          <FadeIn duration='2s' timingFunction='ease-out'>
            <h3>Choose any word below to see its social context</h3>
          </FadeIn>
        </div>
      )
    }

    return (
      <div className={styles.wrapper}>
        <small className={styles.hint}>
          <strong>{searchWord}</strong> social context <HelpPopupWordCloud />
        </small>
        <TagCloud
          style={{ width: '95%', height: '85%', padding: 10, marginTop: 0 }}
        >
          {cloud.map(({ word }, index) => (
            <div
              key={word}
              style={getWordStyles(index)}
              className={`${styles.text}`}
            >
              {word}
            </div>
          ))}
        </TagCloud>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cloud: state.wordCloud.cloud || ownProps.cloud,
  isLoading: state.wordCloud.isLoading,
  error: state.wordCloud.error,
  searchWord: state.wordCloud.word
})

export default compose(connect(mapStateToProps))(WordCloud)

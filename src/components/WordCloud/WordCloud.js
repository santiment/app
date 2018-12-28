import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import TagCloud from 'react-tag-cloud'
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
  shouldComponentUpdate (nextProps) {
    return !nextProps.isLoading
  }

  render () {
    const { cloud } = this.props

    return (
      <div className={styles.wrapper}>
        <TagCloud style={{ width: '95%', height: '85%', padding: 10 }}>
          {cloud.map(({ word }, index) => (
            <div style={getWordStyles(index)} className={`${styles.text}`}>
              {word}
            </div>
          ))}
        </TagCloud>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cloud: state.wordCloud.cloud,
  isLoading: state.wordCloud.isLoading
})

export default compose(connect(mapStateToProps))(WordCloud)

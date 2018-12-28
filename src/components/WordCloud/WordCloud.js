import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import TagCloud from 'react-tag-cloud'
import { graphql } from 'react-apollo'

import moment from 'moment'
import { wordCloudGQL } from './wordCloudGQL.js'
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
      // return styles.text_big
      return WORD_BIG
    case 1:
    case 2:
      return WORD_MEDIUM
    // return styles.text_medium
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

// const WordCloud = ({ data: { wordContext = defaultWords, loading } }) => {
//   // const sortedWords = words
//   //   .slice()
//   //   .sort(({ score: scoreA }, { score: scoreB }) => (scoreA < scoreB ? 1 : -1))

// }

const mapStateToProps = state => ({
  cloud: state.wordCloud.cloud,
  isLoading: state.wordCloud.isLoading
})

// export default connect(mapStateToProps)(WordCloud)

export default compose(
  connect(mapStateToProps)
  // graphql(wordCloudGQL, {
  //   options: ({ context = 'crypto' }) => {
  //     // @OPTIMIZATION(vanguard): refactor to Epic
  //     return {
  //       variables: {
  //         word: context,
  //         to: moment().toISOString(),
  //         from: moment()
  //           .subtract(3, 'd') // @NOTE(vanguard) query fails, if the value is more in past
  //           .toISOString(),
  //         size: 25
  //       }
  //     }
  //   }
  // })
)(WordCloud)

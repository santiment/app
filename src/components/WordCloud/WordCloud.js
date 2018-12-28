import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import TagCloud from 'react-tag-cloud'
import { graphql } from 'react-apollo'

import moment from 'moment'
import { wordCloudGQL } from './wordCloudGQL.js'
import styles from './WordCloud.module.scss'

const defaultWords = [
  { word: 'word', score: 74 },
  { word: 'context', score: 74 },
  { word: 'cloud', score: 73 },
  { word: 'money', score: 72 },
  { word: 'crypto', score: 46 },
  { word: 'bank', score: 25 },
  { word: 'block', score: 7 },
  { word: 'project', score: 6 },
  { word: 'ico', score: 5 },
  { word: 'hidden', score: 4 },
  { word: 'blockchain', score: 3 },
  { word: 'coins', score: 2 },
  { word: 'stable', score: 1 },
  { word: 'nodes', score: 0 },
  { word: 'liquidity', score: 5 }
]

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
  shouldComponentUpdate ({ data: { loading } }) {
    return loading
  }

  render () {
    const {
      data: { wordContext = defaultWords, loading }
    } = this.props

    return (
      <div className={styles.wrapper}>
        <TagCloud style={{ width: '95%', height: '85%', padding: 10 }}>
          {wordContext.map(({ word }, index) => (
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
  context: state.hypedTrends.context
})

// export default connect(mapStateToProps)(WordCloud)

export default compose(
  connect(mapStateToProps),
  graphql(wordCloudGQL, {
    options: ({ context = 'crypto' }) => {
      // @OPTIMIZATION(vanguard): refactor to Epic
      return {
        variables: {
          word: context,
          to: moment().toISOString(),
          from: moment()
            .subtract(3, 'days') // @NOTE(vanguard) query fails, if the value is more in past
            .toISOString(),
          size: 25
        }
      }
    }
  })
)(WordCloud)

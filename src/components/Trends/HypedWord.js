import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../WordCloud/actions'
import { TRENDS_HYPED_WORD_SELECTED } from './actions'
import styles from './HypedWord.module.scss'

const HypedWord = ({
  word,
  score,
  fetchContext,
  selectHypedWord,
  isSelected = false
}) => (
  <Link
    className={cx(styles.HypedWord, isSelected && styles.selected)}
    to={`/trends/explore/${word}`}
    onMouseEnter={() => {
      selectHypedWord(word)
      fetchContext(word)
    }}
    onMouseLeave={() => selectHypedWord()}
  >
    <div>
      <div className={styles.word}>{word}</div>
      <div className={styles.score}>{Math.round(score)}</div>
    </div>
    <svg
      className={styles.arrow}
      width='8'
      height='14'
      viewBox='0 0 8 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L7.35355 6.64645C7.54882 6.84171 7.54882 7.15829 7.35355 7.35355L1.35355 13.3536C1.15829 13.5488 0.841709 13.5488 0.646447 13.3536C0.451184 13.1583 0.451184 12.8417 0.646447 12.6464L6.29289 7L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z'
        fill='#5275FF'
      />
    </svg>
  </Link>
)

const mapDispatchToProps = dispatch => ({
  fetchContext: payload => {
    dispatch({
      type: actions.WORDCLOUD_CONTEXT_FETCH,
      payload
    })
  },
  selectHypedWord: (selected = null) => {
    dispatch({
      type: TRENDS_HYPED_WORD_SELECTED,
      payload: { selected }
    })
  }
})

export default connect(
  null,
  mapDispatchToProps
)(HypedWord)

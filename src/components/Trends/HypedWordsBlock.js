import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Panel } from '@santiment-network/ui'
import HypedWord from './HypedWord'
import styles from './HypedWords.module.scss'

const compare = (a, b) => a.score - b.score

const header = ({ latest, compiled }) => {
  if (latest) {
    return <h4>Current trends</h4>
  }
  return <h4>Compiled {moment(compiled).format('YYYY-MM-DD HH:mm')}</h4>
}

const HypedWords = ({ trends, compiled, latest, selected }) => (
  <div className={styles.HypedWords}>
    {header({ latest, compiled })}
    <Panel className={styles.HypedWordsBlock}>
      {trends &&
        trends
          .sort(compare)
          .reverse()
          .map((trend, index) => (
            <HypedWord
              key={index}
              {...trend}
              latest={latest}
              isSelected={selected === trend.word}
            />
          ))}
    </Panel>
  </div>
)

const mapStateToProps = ({ hypedTrends }) => {
  return {
    selected: hypedTrends.selected
  }
}

export default connect(mapStateToProps)(HypedWords)

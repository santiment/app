import React from 'react'
import cx from 'classnames'
import moment from 'moment'
import HypedWord from './HypedWord'
import styles from './HypedWords.module.scss'

const compare = (a, b) => a.score - b.score

const header = ({latest, compiled}) => {
  if (latest) {
    return <h4>Current trends</h4>
  }
  return <h4>Compiled {moment(compiled).format('YYYY-MM-DD HH:mm')}</h4>
}

const HypedWords = ({ trends, compiled, latest }) => (
  <div className={styles.HypedWords}>
    {header({latest, compiled})}
    <div className={styles.HypedWordsBlock}>
      {trends &&
        trends
          .sort(compare)
          .reverse()
          .map((trend, index) => (
            <HypedWord key={index} {...trend} latest={latest} />
          ))}
    </div>
  </div>
)

export default HypedWords

import React from 'react'
import { Link } from 'react-router-dom'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './TrendingCardWords.module.scss'

const toRenderedWord = word => ({
  word
})

const PRESAVED_WORDS = [
  toRenderedWord('vechain'),
  toRenderedWord('binance'),
  toRenderedWord('crypto'),
  toRenderedWord('moon'),
  toRenderedWord('ethereum'),
  toRenderedWord('ico')
]
const MAX_WORDS_COUNT = 10

const getExpectedCount = settings => {
  if (settings && settings.operation && settings.operation.size) {
    return settings.operation.size
  }

  return MAX_WORDS_COUNT
}

const getWords = (triggerWords, activityPayload) => {
  if (triggerWords) {
    return Array.isArray(triggerWords)
      ? triggerWords.map(toRenderedWord)
      : [toRenderedWord(triggerWords)]
  }

  if (activityPayload) {
    try {
      const spliced = activityPayload.split('\n').splice(5, 10)

      return spliced.reduce((acc, item) => {
        if (item) {
          const splitted = item.split('|')
          acc.push({
            word: splitted[0].trim(),
            score: splitted[1].trim()
          })
        }

        return acc
      }, [])
    } catch (e) {
      console.error(e)
      return PRESAVED_WORDS
    }
  }

  return PRESAVED_WORDS
}

const TrendingCardWords = ({
  settings,
  settings: { target },
  activityPayload
}) => {
  const words = getWords(target.word, activityPayload)
  const showingWords = words.slice(0, 6)

  const moreCount = getExpectedCount(settings) - showingWords.length
  return (
    <div className={styles.words}>
      {showingWords.map((item, index) => {
        const { word, score } = item

        return (
          <Tooltip
            key={index}
            position='top'
            align='center'
            trigger={
              <a className={styles.word} href={`/labs/trends/explore/${word}`}>
                <div className={styles.wordIndex}>{index + 1}</div>
                {word}
              </a>
            }
          >
            {score ? (
              <div className={styles.tooltip}>
                <div className={styles.scoreTitle}>Score:</div> {score}
              </div>
            ) : (
              ''
            )}
          </Tooltip>
        )
      })}

      {moreCount && (
        <Link className={styles.more} to={`/labs/trends`}>
          +{moreCount} more
        </Link>
      )}
    </div>
  )
}

export default TrendingCardWords

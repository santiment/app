import React from 'react'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './TrendingCardWords.module.scss'

const toRenderedWord = word => ({
  word
})

const getWords = (triggerWords, activityPayload) => {
  if (triggerWords) {
    return Array.isArray(triggerWords)
      ? triggerWords.map(toRenderedWord)
      : [toRenderedWord(triggerWords)]
  }

  if (activityPayload) {
    try {
      const spliced = activityPayload.split('\n').splice(3, 10)
      return spliced.reduce((acc, item) => {
        if (item) {
          const splitted = item.split('|')
          if (splitted && splitted.length === 2) {
            acc.push({
              word: splitted[0].trim(),
              score: splitted[1].trim()
            })
          }
        }

        return acc
      }, [])
    } catch (e) {
      console.error(e)
      return []
    }
  }

  return []
}

const TrendingCardWords = ({ settings: { target }, activityPayload }) => {
  const words = getWords(target.word, activityPayload)

  if (!words || words.length === 0) {
    return null
  }

  return (
    <div className={styles.words}>
      {words.map((item, index) => {
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
    </div>
  )
}

export default TrendingCardWords

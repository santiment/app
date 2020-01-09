import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import isEqual from 'lodash.isequal'
import { DesktopOnly } from '../../Responsive'
import Panel from '@santiment-network/ui/Panel/Panel'
import Button from '@santiment-network/ui/Button'
import SignalCardHeader from './SignalCardHeader'
import { dateDifferenceInWordsString } from '../../../utils/dates'
import { createTrigger } from '../../../ducks/Signals/common/actions'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import externalStyles from './SignalCard.module.scss'
import styles from './TrendingWordsSignalCard.module.scss'

const PRESAVED_WORDS = [
  'vechain',
  'binance',
  'crypto',
  'moon',
  'ethereum',
  'ico'
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
    return triggerWords
  }

  if (activityPayload) {
    try {
      const spliced = activityPayload.split('\n').splice(5, 10)

      return spliced.reduce((acc, item) => {
        const firstWord = item.split('|')[0]

        if (item) {
          acc.push(firstWord.trim())
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

const TrendingWordsSignalCard = ({
  signal,
  className,
  date,
  activityPayload,
  createTrigger,
  isLoggedIn,
  isAuthor,
  isCreated
}) => {
  const {
    title,
    settings,
    settings: { target = {} },
    isPublic
  } = signal
  const words = getWords(target.word, activityPayload)
  const showingWords = words.slice(0, 6)

  const moreCount = getExpectedCount(settings) - showingWords.length

  const copySignal = () => {
    const newSignal = { ...signal }
    delete newSignal.id
    newSignal.isPublic = false
    createTrigger(newSignal)
  }

  return (
    <Panel padding className={cx(externalStyles.wrapper, className)}>
      <DesktopOnly>
        <SignalCardHeader
          isUserTheAuthor={false}
          isPublic={isPublic}
          signal={signal}
        />
      </DesktopOnly>

      <div className={externalStyles.wrapper__right}>
        <h2 className={externalStyles.title}>{title}</h2>

        <div className={styles.words}>
          {showingWords.map((word, index) => (
            <Link
              key={index}
              className={styles.word}
              to={`/labs/trends/explore/${word}`}
            >
              {word}
            </Link>
          ))}

          {moreCount && (
            <Link className={styles.more} to={`/labs/trends`}>
              +{moreCount} more
            </Link>
          )}
        </div>

        {date && (
          <div className={styles.fromDate}>
            {dateDifferenceInWordsString(date)}
          </div>
        )}

        {isLoggedIn && !isAuthor && !isCreated && (
          <div className={styles.bottom}>
            <Button onClick={copySignal} as='a' className={styles.copyBtn}>
              Copy signal
            </Button>
          </div>
        )}
      </div>
    </Panel>
  )
}

const mapDispatchToProps = dispatch => ({
  createTrigger: payload => {
    dispatch(createTrigger(payload))
  }
})

const mapStateToProps = (state, { creatorId, signal }) => {
  const isLoggedIn = checkIsLoggedIn(state)
  return {
    isAuthor:
      state &&
      state.user &&
      state.user.data &&
      +state.user.data.id === +creatorId,
    isLoggedIn: isLoggedIn,
    isCreated:
      !isLoggedIn ||
      (state &&
        state.signals.all &&
        state.signals.all.some(
          item =>
            item.title === signal.title &&
            isEqual(signal.settings.operation, item.settings.operation)
        ))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingWordsSignalCard)

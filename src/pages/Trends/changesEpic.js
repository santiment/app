import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import {
  TRENDS_HYPED_FETCH_SUCCESS,
  TREND_WORD_SCORE_CHANGE_FULFILLED,
  TREND_WORD_SCORE_CHANGE_FAILED,
  TREND_WORD_VOLUME_CHANGE_FULFILLED,
  TREND_WORD_VOLUME_CHANGE_FAILED
} from '../../components/Trends/actions'
import { SOCIAL_VOLUME_QUERY } from '../../components/SocialVolumeWidget/socialVolumeGQL'
import { mergeTimeseriesByKey } from '../../utils/utils'

const WORD_TREND_SCORE_QUERY = gql`
  query wordTrendScore($word: String!, $from: DateTime!, $to: DateTime!) {
    wordTrendScore(word: $word, source: ALL, from: $from, to: $to) {
      datetime
      score
    }
  }
`

const defaultMentionsCount = {
  mentionsCount: 0
}

export const wordTrendSocialVolumeEpic = (action$, store, { client }) =>
  action$.ofType(TRENDS_HYPED_FETCH_SUCCESS).mergeMap(({ payload }) => {
    // HACK(vanguard): wordTrendScore from/to does not work correctly
    // Can't fetch only needed time period, should fetch for all day
    const fromDate = new Date()
    fromDate.setHours(0, 0, 0, 0)
    fromDate.setDate(fromDate.getDate() - 2)
    const toDate = new Date()
    toDate.setHours(24, 0, 0, 0)

    const { items } = store.getState().hypedTrends
    const { topWords } = items[items.length - 1]

    const words = topWords.map(({ word }) => {
      return Observable.from(
        client.query({
          query: SOCIAL_VOLUME_QUERY,
          variables: {
            word,
            from: fromDate.toISOString(),
            to: toDate.toISOString()
          }
        })
      ).map(
        ({
          data: { telegram, reddit, discord, professional_traders_chat: ptc }
        }) => {
          const [
            oldValue = defaultMentionsCount,
            newValue = defaultMentionsCount
          ] = mergeTimeseriesByKey({
            timeseries: [
              telegram.chartData,
              reddit.chartData,
              discord.chartData,
              ptc.chartData
            ],
            mergeData: (longestTSData, timeserieData) => {
              return {
                mentionsCount:
                  longestTSData.mentionsCount + timeserieData.mentionsCount,
                datetime: longestTSData.datetime
              }
            }
          }).slice(-2)

          return {
            [word]: [oldValue.mentionsCount, newValue.mentionsCount]
          }
        }
      )
    })

    return Observable.forkJoin(...words)
      .flatMap(result => {
        return Observable.of({
          type: TREND_WORD_VOLUME_CHANGE_FULFILLED,
          payload: result.reduce((acc, value) => {
            Object.assign(acc, value)
            return acc
          }, {})
        })
      })
      .catch(handleErrorAndTriggerAction(TREND_WORD_VOLUME_CHANGE_FAILED))
  })

export const wordTrendScoreEpic = (action$, store, { client }) =>
  action$.ofType(TRENDS_HYPED_FETCH_SUCCESS).mergeMap(({ payload }) => {
    // HACK(vanguard): wordTrendScore from/to does not work correctly
    // Can't fetch only needed time period, should fetch for all day
    const fromDate = new Date()
    fromDate.setHours(0, 0, 0, 0)
    fromDate.setDate(fromDate.getDate() - 2)
    const toDate = new Date()
    toDate.setHours(24, 0, 0, 0)

    const { items } = store.getState().hypedTrends
    const { topWords } = items[items.length - 1]

    const words = topWords.map(({ word }) => {
      return Observable.from(
        client.query({
          query: WORD_TREND_SCORE_QUERY,
          variables: {
            word,
            from: fromDate,
            to: toDate
          }
        })
      ).map(({ data: { wordTrendScore } }) => {
        const sorted = wordTrendScore.sort(
          ({ datetime: aDate }, { datetime: bDate }) =>
            new Date(aDate) < new Date(bDate) ? 1 : -1
        )
        const [{ score: scoreNew }, { score: scoreOld }] = sorted
        return {
          [word]: [parseInt(scoreOld, 10), parseInt(scoreNew, 10)]
        }
      })
    })

    return Observable.forkJoin(...words)
      .flatMap(result => {
        return Observable.of({
          type: TREND_WORD_SCORE_CHANGE_FULFILLED,
          payload: result.reduce((acc, value) => {
            Object.assign(acc, value)
            return acc
          }, {})
        })
      })
      .catch(handleErrorAndTriggerAction(TREND_WORD_SCORE_CHANGE_FAILED))
  })

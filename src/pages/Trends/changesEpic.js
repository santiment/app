import { Observable } from 'rxjs'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import {
  TRENDS_HYPED_FETCH_SUCCESS,
  TREND_WORD_VOLUME_CHANGE_FULFILLED,
  TREND_WORD_VOLUME_CHANGE_FAILED
} from '../../components/Trends/actions'
import { SOCIAL_VOLUME_QUERY } from '../../components/Trends/socialVolumeGQL'
import { mergeTimeseriesByKey } from '../../utils/utils'
import { getTimeIntervalFromToday } from '../../utils/dates'

const defaultMentionsCount = {
  mentionsCount: 0
}

export const wordTrendSocialVolumeEpic = (action$, store, { client }) =>
  action$
    .ofType(TRENDS_HYPED_FETCH_SUCCESS)
    .filter(({ payload: { onlyTrends } }) => !onlyTrends)
    .mergeMap(({ payload }) => {
      // HACK(vanguard): wordTrendScore from/to does not work correctly
      // Can't fetch only needed time period, should fetch for all day
      const { from, to } = getTimeIntervalFromToday(-2, 'd')

      const { items } = store.getState().hypedTrends
      const { topWords = [] } = items[items.length - 1] || {}

      const words = topWords.map(({ word }) => {
        return Observable.from(
          client.query({
            query: SOCIAL_VOLUME_QUERY,
            variables: {
              word,
              from: from.toISOString(),
              to: to.toISOString()
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

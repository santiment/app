import { Observable } from 'rxjs'
import * as actions from './actions'
import { SOCIAL_VOLUME_QUERY } from './socialVolumeGQL'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { mergeTimeseriesByKey } from '../../utils/utils'
import { getTimeIntervalFromToday } from '../../utils/dates'

export const fetchSocialVolumeEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SOCIALVOLUME_DATA_FETCH)
    .debounceTime(200)
    .switchMap(({ payload: trendWord }) => {
      if (store.getState().socialVolume.trendWord === trendWord) {
        return Observable.of({
          type: actions.SOCIALVOLUME_DATA_FETCH_CANCEL,
          payload: 'New trendWord is same as the last trendWord'
        })
      }

      const isFetchingTotalSocialVolume =
        trendWord === actions.TOTAL_SOCIALVOLUME_SECRET

      const { from, to } = getTimeIntervalFromToday(-1, 'm')

      return Observable.fromPromise(
        client.query({
          query: SOCIAL_VOLUME_QUERY,
          variables: {
            word: isFetchingTotalSocialVolume ? '*' : trendWord,
            to: to.toISOString(),
            from: from.toISOString()
          }
        })
      )
        .switchMap(
          ({
            data: { discord, reddit, telegram, professional_traders_chat }
          }) => {
            return Observable.of({
              type: actions.SOCIALVOLUME_DATA_FETCH_SUCCESS,
              payload: {
                trendWord: isFetchingTotalSocialVolume ? 'Total' : trendWord,
                data: mergeTimeseriesByKey({
                  key: 'datetime',
                  timeseries: [
                    discord.chartData,
                    reddit.chartData,
                    telegram.chartData,
                    professional_traders_chat.chartData
                  ],
                  mergeData: (longestTSData, timeserieData) => {
                    return {
                      mentionsCount:
                        longestTSData.mentionsCount +
                        timeserieData.mentionsCount,
                      datetime: longestTSData.datetime
                    }
                  }
                })
              }
            })
          }
        )
        .catch(
          handleErrorAndTriggerAction(actions.SOCIALVOLUME_DATA_FETCH_FAILED)
        )
    })

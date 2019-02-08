import { Observable } from 'rxjs'
import moment from 'moment'
import * as actions from './actions'
import { socialVolumeGQL } from './socialVolumeGQL'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { mergeTimeseriesByKey } from '../../utils/utils'

export const fetchSocialVolumeEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SOCIALVOLUME_DATA_FETCH)
    .switchMap(({ payload: trendWord }) => {
      if (store.getState().socialVolume.trendWord === trendWord) {
        return Observable.of({
          type: actions.SOCIALVOLUME_DATA_FETCH_CANCEL,
          payload: 'New trendWord is same as the last trendWord'
        })
      }

      const isFetchingTotalSocialVolume =
        trendWord === actions.TOTAL_SOCIALVOLUME_SECRET

      return Observable.fromPromise(
        client.query({
          query: socialVolumeGQL,
          variables: {
            word: isFetchingTotalSocialVolume ? '*' : trendWord,
            to: moment().toISOString(),
            from: moment()
              .subtract(1, 'months')
              .toISOString()
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

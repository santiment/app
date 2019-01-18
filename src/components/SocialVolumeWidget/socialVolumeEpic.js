import { Observable } from 'rxjs'
import moment from 'moment'
import * as actions from './actions'
import { socialVolumeGQL, totalSocialVolumeGQL } from './socialVolumeGQL'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { mergeTimeseriesByKey } from '../../utils/utils'

export const fetchSocialVolumeEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.SOCIALVOLUME_DATA_FETCH)
    .switchMap(({ payload: slug }) => {
      if (store.getState().socialVolume.slug === slug) {
        return Observable.of({
          type: actions.SOCIALVOLUME_DATA_FETCH_CANCEL,
          payload: 'New slug is same as the last slug'
        })
      }

      if (slug === '__TOTAL_SOCIAL_VOLUME__') {
        return Observable.fromPromise(
          client.query({
            query: totalSocialVolumeGQL,
            variables: {
              to: moment().toISOString(),
              from: moment()
                .subtract(1, 'months')
                .toISOString()
            }
          })
        ).switchMap(
          ({
            data: { discord, reddit, telegram, professional_traders_chat }
          }) => {
            console.log(
              discord.chartData[0],
              reddit.chartData[0],
              telegram.chartData[0],
              professional_traders_chat.chartData[0]
            )
            console.log(
              mergeTimeseriesByKey({
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
                      longestTSData.mentionsCount + timeserieData.mentionsCount,
                    datetime: longestTSData.datetime
                  }
                }
              })[0]
            )
          }
        )
      }

      return Observable.fromPromise(
        client.query({
          query: socialVolumeGQL,
          variables: {
            slug,
            socialVolumeType: 'PROFESSIONAL_TRADERS_CHAT_OVERVIEW',
            to: moment().toISOString(),
            from: moment()
              .subtract(1, 'months') // @NOTE(vanguard) query fails, if the value is more in past
              .toISOString()
          }
        })
      )
        .mergeMap(({ data: { socialVolume } }) => {
          return Observable.of({
            type: actions.SOCIALVOLUME_DATA_FETCH_SUCCESS,
            payload: {
              slug,
              data: socialVolume,
              isLoading: false,
              error: false
            }
          })
        })
        .catch(
          handleErrorAndTriggerAction(actions.SOCIALVOLUME_DATA_FETCH_FAILED)
        )
    })

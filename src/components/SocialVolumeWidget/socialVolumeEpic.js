import { Observable } from 'rxjs'
import moment from 'moment'
import * as actions from './actions'
import {
  socialVolumeGQL,
  totalSocialVolumeGQL,
  wordTrendScoreGQL,
  allProjetsGQL
} from './socialVolumeGQL'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { mergeTimeseriesByKey } from '../../utils/utils'

let tickerSlugs

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

      if (trendWord === '__TOTAL_SOCIAL_VOLUME__') {
        if (!tickerSlugs) {
          client
            .query({ query: allProjetsGQL })
            .then(({ data: { allProjects } }) => {
              tickerSlugs = allProjects
            })
        }

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
        )
          .switchMap(
            ({
              data: { discord, reddit, telegram, professional_traders_chat }
            }) => {
              return Observable.of({
                type: actions.SOCIALVOLUME_DATA_FETCH_SUCCESS,
                payload: {
                  trendWord: 'Total',
                  isScoreOverTime: false,
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
      }

      const requestSlug = trendWord.toLowerCase()
      const requestTicker = trendWord.toUpperCase()
      const { slug: foundSlug } = tickerSlugs
        ? tickerSlugs.find(
          ({ ticker: projTicker, slug: projSlug }) =>
            requestSlug === projSlug || requestTicker === projTicker
        ) || {}
        : {}

      return !foundSlug
        ? Observable.fromPromise(
          client.query({
            query: wordTrendScoreGQL,
            variables: {
              word: trendWord,
              to: moment().toISOString(),
              from: moment()
                .subtract(1, 'months')
                .toISOString()
            }
          })
        )
          .switchMap(({ data: { wordTrendScore } }) => {
            return Observable.of({
              type: actions.SOCIALVOLUME_DATA_FETCH_SUCCESS,
              payload: {
                trendWord,
                data: wordTrendScore.sort(
                  ({ datetime: aDatetime }, { datetime: bDatetime }) =>
                    moment(aDatetime).isAfter(moment(bDatetime)) ? 1 : -1
                ),
                isScoreOverTime: true
              }
            })
          })
          .catch(
            handleErrorAndTriggerAction(
              actions.SOCIALVOLUME_DATA_FETCH_FAILED
            )
          )
        : Observable.fromPromise(
          client.query({
            query: socialVolumeGQL,
            variables: {
              slug: foundSlug,
              to: moment().toISOString(),
              from: moment()
                .subtract(1, 'months')
                .toISOString()
            }
          })
        )
          .switchMap(
            ({
              data: {
                telegram_discussion,
                telegram_chats,
                discord,
                professional_traders_chat
              }
            }) => {
              return Observable.of({
                type: actions.SOCIALVOLUME_DATA_FETCH_SUCCESS,
                payload: {
                  trendWord,
                  isScoreOverTime: false,
                  data: mergeTimeseriesByKey({
                    key: 'datetime',
                    timeseries: [
                      telegram_discussion,
                      telegram_chats,
                      discord,
                      professional_traders_chat
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
            handleErrorAndTriggerAction(
              actions.SOCIALVOLUME_DATA_FETCH_FAILED
            )
          )
    })

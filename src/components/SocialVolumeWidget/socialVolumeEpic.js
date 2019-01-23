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

const scoreOverDatetime = [
  {
    datetime: '2018-11-27T00:00:00Z',
    mentionsCount: 2716
  },
  {
    datetime: '2018-11-28T00:00:00Z',
    mentionsCount: 3751
  },
  {
    datetime: '2018-11-29T00:00:00Z',
    mentionsCount: 2296
  },
  {
    datetime: '2018-11-30T00:00:00Z',
    mentionsCount: 1895
  },
  {
    datetime: '2018-12-01T00:00:00Z',
    mentionsCount: 1546
  },
  {
    datetime: '2018-12-02T00:00:00Z',
    mentionsCount: 1321
  },
  {
    datetime: '2018-12-03T00:00:00Z',
    mentionsCount: 1804
  },
  {
    datetime: '2018-12-04T00:00:00Z',
    mentionsCount: 1946
  },
  {
    datetime: '2018-12-05T00:00:00Z',
    mentionsCount: 2159
  },
  {
    datetime: '2018-12-06T00:00:00Z',
    mentionsCount: 2846
  },
  {
    datetime: '2018-12-07T00:00:00Z',
    mentionsCount: 4369
  },
  {
    datetime: '2018-12-08T00:00:00Z',
    mentionsCount: 2373
  },
  {
    datetime: '2018-12-09T00:00:00Z',
    mentionsCount: 2075
  },
  {
    datetime: '2018-12-10T00:00:00Z',
    mentionsCount: 2307
  },
  {
    datetime: '2018-12-11T00:00:00Z',
    mentionsCount: 1965
  },
  {
    datetime: '2018-12-12T00:00:00Z',
    mentionsCount: 1343
  },
  {
    datetime: '2018-12-13T00:00:00Z',
    mentionsCount: 1907
  },
  {
    datetime: '2018-12-14T00:00:00Z',
    mentionsCount: 2351
  },
  {
    datetime: '2018-12-15T00:00:00Z',
    mentionsCount: 1640
  },
  {
    datetime: '2018-12-16T00:00:00Z',
    mentionsCount: 1248
  },
  {
    datetime: '2018-12-17T00:00:00Z',
    mentionsCount: 2246
  },
  {
    datetime: '2018-12-18T00:00:00Z',
    mentionsCount: 1790
  },
  {
    datetime: '2018-12-19T00:00:00Z',
    mentionsCount: 2214
  },
  {
    datetime: '2018-12-20T00:00:00Z',
    mentionsCount: 2066
  },
  {
    datetime: '2018-12-21T00:00:00Z',
    mentionsCount: 1697
  },
  {
    datetime: '2018-12-22T00:00:00Z',
    mentionsCount: 1442
  },
  {
    datetime: '2018-12-23T00:00:00Z',
    mentionsCount: 1435
  },
  {
    datetime: '2018-12-24T00:00:00Z',
    mentionsCount: 1519
  },
  {
    datetime: '2018-12-25T00:00:00Z',
    mentionsCount: 1670
  }
]

let tickerSlugs

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
        ).switchMap(
          ({
            data: { discord, reddit, telegram, professional_traders_chat }
          }) => {
            console.log(
              discord.chartData[0].mentionsCount +
                reddit.chartData[0].mentionsCount +
                telegram.chartData[0].mentionsCount +
                professional_traders_chat.chartData[0].mentionsCount
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

            return Observable.of({
              type: actions.SOCIALVOLUME_DATA_FETCH_SUCCESS,
              payload: {
                slug: 'Total',
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
      }

      const requestSlug = slug.toLowerCase()
      const requestTicker = slug.toUpperCase()
      const { slug: foundSlug } =
        tickerSlugs.find(
          ({ ticker: projTicker, slug: projSlug }) =>
            requestSlug === projSlug || requestTicker === projTicker
        ) || {}

      return !foundSlug
        ? Observable.fromPromise(
          client.query({
            query: wordTrendScoreGQL,
            variables: {
              word: slug,
              to: moment().toISOString(),
              from: moment()
                .subtract(1, 'months')
                .toISOString()
            }
          })
        ).switchMap(({ data: { wordTrendScore } }) => {
          return Observable.of({
            type: actions.SOCIALVOLUME_DATA_FETCH_SUCCESS,
            payload: {
              slug,
              data: wordTrendScore.sort(
                ({ datetime: aDatetime }, { datetime: bDatetime }) =>
                  moment(aDatetime).isAfter(moment(bDatetime)) ? 1 : -1
              ),
              isScoreOverTime: true
            }
          })
        })
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
          .mergeMap(
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
                  slug,
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

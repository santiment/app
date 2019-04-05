import { Observable } from 'rxjs'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import { TRENDS_HYPED_FETCH_SUCCESS } from '../../components/Trends/actions'
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../components/Insight/insightsGQL'
import { binarySearch } from './utils'

const oneDayTimestamp = 1000 * 60 * 60 * 24

const getInsightTrendTagByDate = date =>
  `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-trending-words`

const tickerCheckFn = (target, { ticker }) => target === ticker
const tickerMoveFn = (target, { ticker }) => target < ticker
const slugCheckFn = (target, { slug }) => target === slug
const slugMoveFn = (target, { slug }) => target < slug

let projectsSortedByTicker
let projectsSortedBySlug
let projectsSortedByName

const basicSort = (a, b) => {
  if (a > b) {
    return 1
  }
  if (a < b) {
    return -1
  }
  return 0
}

export const testEpic = action$ =>
  action$
    .ofType('[trends] HYPED_FETCH_TICKERS_SLUGS_SUCCESS')
    .take(1)
    .switchMap(({ payload: { allAssets } }) => {
      const { length } = allAssets
      const tempAssets = allAssets.slice()

      for (let i = 0; i < length; i++) {
        const { ticker, slug, name } = tempAssets[i]
        tempAssets[i].ticker = ticker.toUpperCase()
        tempAssets[i].slug = slug.toUpperCase()
        tempAssets[i].name = name.toUpperCase()
      }

      projectsSortedByTicker = tempAssets.slice()
      projectsSortedBySlug = tempAssets.slice()

      projectsSortedByTicker.sort(({ ticker: aTicker }, { ticker: bTicker }) =>
        basicSort(aTicker, bTicker)
      )
      projectsSortedBySlug.sort(({ slug: aSlug }, { slug: bSlug }) =>
        basicSort(aSlug, bSlug)
      )

      console.log({
        projectsSortedByTicker,
        projectsSortedBySlug,
        projectsSortedByName
      })

      return Observable.of({
        type: 'TICK_READY'
      })
    })

export const connectedWordsEpic = (action$, store, { client }) =>
  action$
    .ofType('[trends] HYPED_FETCH_SUCCESS')
    .take(1)
    .switchMap(({ payload: { items } }) => {
      // HACK(vanguard): wordTrendScore from/to does not work correctly
      // Can't fetch only needed time period, should fetch for all day
      const dates = []

      for (let i = 0; i < 3; i++) {
        dates.push(
          client.query({
            query: ALL_INSIGHTS_BY_TAG_QUERY,
            variables: {
              tag: getInsightTrendTagByDate(
                new Date(Date.now() - oneDayTimestamp * i)
              )
            }
          })
        )
      }

      const words = [
        ...new Set(
          items.reduce((acc, { topWords }) => {
            return acc.concat(topWords.map(({ word }) => word.toUpperCase()))
          }, [])
        )
      ]

      const TrendTicker = {}
      const TickerTrend = {}

      return Observable.forkJoin(...dates)
        .flatMap(result => {
          const connections = {}

          for (const {
            data: { allInsightsByTag }
          } of result) {
            if (allInsightsByTag.length < 1) continue

            for (const { tags } of allInsightsByTag) {
              const filteredTags = tags.filter(
                ({ name }) => !name.endsWith('-trending-words')
              )
              const { length } = filteredTags
              if (length < 1) continue

              for (let i = 0; i < length; i++) {
                const { name: tag } = filteredTags[i]
                const inter = filteredTags.slice(0, i)
                const rightOffset = i - (length - 1)

                if (rightOffset !== 0) {
                  inter.push(...filteredTags.slice(rightOffset))
                }

                const connection = connections[tag]
                if (connection) {
                  connection.push(...inter)
                } else {
                  connections[tag] = inter

                  if (words.includes(tag)) {
                    TrendTicker[tag] = tag
                    TickerTrend[tag] = tag
                  }
                }
              }
            }
          }

          const unfoundTrends = words.filter(word => !TrendTicker[word])

          unfoundTrends.forEach(trend => {
            const { item: { ticker } = {} } = binarySearch({
              array: projectsSortedByTicker,
              target: trend,
              checkFn: tickerCheckFn,
              moveFn: tickerMoveFn
            })
            let foundTicker = ticker

            if (!foundTicker) {
              const { item: { ticker: ticker1 } = {} } = binarySearch({
                array: projectsSortedBySlug,
                target: trend,
                checkFn: slugCheckFn,
                moveFn: slugMoveFn
              })
              foundTicker = ticker1
            }

            if (!foundTicker) {
              const { ticker: ticker2 } =
                projectsSortedByTicker.find(({ name }) =>
                  name.includes(trend)
                ) || {}

              foundTicker = ticker2
            }

            if (foundTicker) {
              TrendTicker[trend] = foundTicker
              TickerTrend[foundTicker] = trend
            }
          })

          const connectedTrends = Object.keys(TickerTrend).reduce(
            (acc, ticker) => {
              const con = connections[ticker]

              if (con) {
                acc[TickerTrend[ticker]] = con.reduce((accum, value) => {
                  const a = TickerTrend[value]
                  if (a) {
                    accum.push(a)
                  }
                  return accum
                }, [])
              }

              return acc
            },
            {}
          )

          console.log({
            words,
            connections,
            TrendTicker,
            TickerTrend,
            connectedTrends
          })
          return Observable.of({
            type: '[trends] CONNECTED_WORDS_FULFILLED',
            payload: []
          })
        })
        .catch(handleErrorAndTriggerAction('changes failed'))
    })

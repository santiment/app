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
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../components/Insight/insightsGQL'
import { mergeTimeseriesByKey } from '../../utils/utils'
import { getTimeIntervalFromToday } from '../../utils/dates'

const oneDayTimestamp = 1000 * 60 * 60 * 24

const getInsightTrendTagByDate = date =>
  `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-trending-words`

let projectsSortedByTicker
let projectsSortedBySlug
let projectsSortedByName

const binarySearch = (list, value) => {
  // initial values for start, middle and end
  let start = 0
  let stop = list.length - 1
  let middle = Math.floor((start + stop) / 2)

  // While the middle is not what we're looking for and the list does not have a single item
  while (list[middle] !== value && start < stop) {
    if (value < list[middle]) {
      stop = middle - 1
    } else {
      start = middle + 1
    }

    // recalculate middle on every iteration
    middle = Math.floor((start + stop) / 2)
  }

  // if the current middle item is what we're looking for return it's index, else return -1
  return list[middle] !== value ? -1 : middle
}

const tickerCheckFn = (target, { ticker }) => target === ticker
const tickerMoveFn = (target, { ticker }) => target < ticker
const slugCheckFn = (target, { slug }) => target === slug
const slugMoveFn = (target, { slug }) => target < slug

const myBinary = ({
  moveFn = (target, item) => target < item,
  checkFn = (target, item) => target === item,
  array = [],
  target = ''
}) => {
  let start = 0
  let stop = array.length - 1
  let middle = Math.floor(stop / 2)
  let item = array[middle]

  while (start < stop) {
    if (checkFn(target, item)) {
      break
    }

    if (moveFn(target, item)) {
      stop = middle - 1
    } else {
      start = middle + 1
    }

    middle = Math.floor((start + stop) / 2)
    item = array[middle]
  }

  return {
    item: checkFn(target, item) ? item : undefined,
    index: middle
  }
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

      projectsSortedByTicker.sort(
        ({ ticker: aTicker }, { ticker: bTicker }) => {
          if (aTicker > bTicker) {
            return 1
          }
          if (aTicker < bTicker) {
            return -1
          }
          return 0
        }
      )

      projectsSortedBySlug.sort(({ slug: aTicker }, { slug: bTicker }) => {
        if (aTicker > bTicker) {
          return 1
        }
        if (aTicker < bTicker) {
          return -1
        }
        return 0
      })
      /* projectsSortedBySlug.sort() */
      /* projectsSortedByName.sort() */

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
                  }
                }
              }
            }
          }

          const unfoundTrends = words.filter(word => !TrendTicker[word])

          unfoundTrends.forEach(trend => {
            const { item: { ticker } = {} } = myBinary({
              array: projectsSortedByTicker,
              target: trend,
              checkFn: tickerCheckFn,
              moveFn: tickerMoveFn
            })
            let foundTicker = ticker

            if (!foundTicker) {
              const { item: { ticker: ticker1 } = {} } = myBinary({
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

            if (foundTicker) TrendTicker[trend] = foundTicker
          })

          console.log({ words, connections, TrendTicker })
          return Observable.of({
            type: '[trends] CONNECTED_WORDS_FULFILLED',
            payload: []
          })
        })
        .catch(handleErrorAndTriggerAction('changes failed'))
    })

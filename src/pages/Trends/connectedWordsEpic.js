import { Observable } from 'rxjs'
import { handleErrorAndTriggerAction } from '../../epics/utils'
import {
  TRENDS_HYPED_FETCH_SUCCESS,
  TRENDS_HYPED_FETCH_TICKERS_SLUGS_SUCCESS,
  TRENDS_CONNECTED_WORDS_SUCCESS,
  TRENDS_CONNECTED_WORDS_FAILED,
  TRENDS_CONNECTED_WORDS_OPTIMIZATION_SUCCESS
} from '../../components/Trends/actions'
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../components/Insight/insightsGQL'
import { binarySearch } from './utils'
import { simpleSortStrings } from '../../utils/sortMethods'

const oneDayTimestamp = 1000 * 60 * 60 * 24

const getInsightTrendTagByDate = date =>
  `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-trending-words`

const tickerCheckClb = (target, { ticker }) => target === ticker
const tickerMoveClb = (target, { ticker }) => target < ticker
const slugCheckClb = (target, { slug }) => target === slug
const slugMoveClb = (target, { slug }) => target < slug

let projectsSortedByTicker
let projectsSortedBySlug

const mapWordToProjectsTicker = word => {
  const { value: { ticker: ticker1 } = {} } = binarySearch({
    array: projectsSortedByTicker,
    target: word,
    checkClb: tickerCheckClb,
    moveClb: tickerMoveClb
  })

  if (ticker1) {
    return ticker1
  }

  const { value: { ticker: ticker2 } = {} } = binarySearch({
    array: projectsSortedBySlug,
    target: word,
    checkClb: slugCheckClb,
    moveClb: slugMoveClb
  })

  if (ticker2) {
    return ticker2
  }

  const { ticker: ticker3 } =
    projectsSortedByTicker.find(({ name }) => name.includes(word)) || {}

  return ticker3
}

export const connectedWordsOptimizationEpic = action$ =>
  action$
    .ofType(TRENDS_HYPED_FETCH_TICKERS_SLUGS_SUCCESS)
    .take(1)
    .switchMap(({ payload: { allAssets } }) => {
      const { length } = allAssets
      const tempAssets = allAssets.slice()

      for (let i = 0; i < length; i++) {
        const { ticker, slug, name } = tempAssets[i]
        const asset = tempAssets[i]
        asset.ticker = ticker.toUpperCase()
        asset.slug = slug.toUpperCase()
        asset.name = name.toUpperCase()
      }

      projectsSortedByTicker = tempAssets.slice()
      projectsSortedBySlug = tempAssets.slice()

      projectsSortedByTicker.sort(({ ticker: aTicker }, { ticker: bTicker }) =>
        simpleSortStrings(aTicker, bTicker)
      )
      projectsSortedBySlug.sort(({ slug: aSlug }, { slug: bSlug }) =>
        simpleSortStrings(aSlug, bSlug)
      )

      return Observable.of({
        type: TRENDS_CONNECTED_WORDS_OPTIMIZATION_SUCCESS
      })
    })

export const connectedWordsEpic = (action$, store, { client }) =>
  Observable.concat(
    action$.ofType(TRENDS_HYPED_FETCH_SUCCESS),
    action$.ofType(TRENDS_CONNECTED_WORDS_OPTIMIZATION_SUCCESS)
  )
    .take(1)
    .switchMap(({ payload: { items } }) => {
      const insightQueries = []
      for (let i = 0; i < 3; i++) {
        insightQueries.push(
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

      const trendingWords = [
        ...new Set(
          items.reduce((acc, { topWords }) => {
            return acc.concat(topWords.map(({ word }) => word.toUpperCase()))
          }, [])
        )
      ]

      const TrendToTag = {}
      const TagToTrend = {}

      return Observable.forkJoin(...insightQueries)
        .flatMap(result => {
          const tagsGraph = {}

          // [START] Looping over requests
          for (const {
            data: { allInsightsByTag }
          } of result) {
            if (allInsightsByTag.length < 1) continue

            // [START] Looping over request's insights
            for (const { tags } of allInsightsByTag) {
              const filteredTags = tags
                .filter(({ name }) => !name.endsWith('-trending-words'))
                .map(({ name }) => name.toUpperCase())
              const { length: filteredTagsLength } = filteredTags

              if (filteredTagsLength < 1) continue

              // [START] Looping over insight's tags
              for (let i = 0; i < filteredTagsLength; i++) {
                const tag = filteredTags[i]
                const connectedTags = filteredTags.slice(0, i)
                const rightOffset = i - (filteredTagsLength - 1)

                if (rightOffset !== 0) {
                  connectedTags.push(...filteredTags.slice(rightOffset))
                }

                const tagConnections = tagsGraph[tag]

                if (tagConnections) {
                  tagConnections.push(...connectedTags)
                  tagsGraph[tag] = [...new Set(tagConnections)]
                } else {
                  tagsGraph[tag] = connectedTags

                  if (trendingWords.includes(tag)) {
                    TrendToTag[tag] = tag
                    TagToTrend[tag] = [tag]
                  }
                }
              } // [END] Looping over insight's tags
            } // [END] Looping over request's insights
          } // [END] Looping over requests

          const unmappedTrendingWords = trendingWords.filter(
            word => !TrendToTag[word]
          )

          unmappedTrendingWords.forEach(trend => {
            const foundTicker = mapWordToProjectsTicker(trend)
            if (foundTicker) {
              TrendToTag[trend] = foundTicker

              const trendSynonyms = TagToTrend[foundTicker]
              if (trendSynonyms) {
                trendSynonyms.push(trend)
              } else {
                TagToTrend[foundTicker] = [trend]
              }
            }
          })

          const connectedTrends = Object.keys(TrendToTag).reduce(
            (connectedTrendsAcc, trend) => {
              const tag = TrendToTag[trend]
              const tagConnections = tagsGraph[tag]

              if (tagConnections) {
                const trendConnections = tagConnections.reduce(
                  (trendConnectionsAcc, connectedTag) => {
                    const connectedTrend = TagToTrend[connectedTag]

                    if (connectedTrend) {
                      trendConnectionsAcc.push(...connectedTrend)
                    }
                    return trendConnectionsAcc
                  },
                  []
                )

                const trendSynonyms = TagToTrend[tag]
                if (trendSynonyms.length > 1) {
                  // NOTE(vanguard): maybe just to push without checking and filtering? It's okay if one of connected words will be the same as the key
                  trendConnections.push(
                    ...trendSynonyms.filter(synonym => synonym !== trend)
                  )
                }

                connectedTrendsAcc[trend] = trendConnections
              } else if (TagToTrend[tag].length > 1) {
                connectedTrendsAcc[trend] = TagToTrend[tag].filter(
                  synonym => synonym !== trend
                )
              }

              return connectedTrendsAcc
            },
            {}
          )

          return Observable.of({
            type: TRENDS_CONNECTED_WORDS_SUCCESS,
            payload: connectedTrends
          })
        })
        .catch(handleErrorAndTriggerAction(TRENDS_CONNECTED_WORDS_FAILED))
    })

import { Observable } from 'rxjs'
import { RECENT_ASSET_QUERY } from '../ducks/Watchlists/gql/allProjectsGQL'
import { WATCHLIST_QUERY } from '../queries/WatchlistGQL'
import { getRecentAssets, getRecentWatchlists } from '../utils/recent'
import { handleErrorAndTriggerAction } from './utils'
import * as actions from './../actions/types'

export const fetchRecentAssets = (action$, store, { client }) =>
  action$
    .ofType(actions.RECENT_ASSETS_FETCH)
    .mergeMap(() => {
      const assets = getRecentAssets()
        .filter(Boolean)
        .map(slug =>
          Observable.from(
            client.query({
              query: RECENT_ASSET_QUERY,
              variables: { slug }
            })
          )
        )

      return Observable.forkJoin(...assets).flatMap(res => {
        return Observable.of({
          type: actions.RECENT_ASSETS_FETCH_SUCCESS,
          payload: res.map(({ data: { projectBySlug } }) => projectBySlug)
        })
      })
    })
    .catch(handleErrorAndTriggerAction(actions.RECENT_ASSETS_FETCH_FAILED))

export const fetchRecentWatchlists = (action$, store, { client }) =>
  action$
    .ofType(actions.RECENT_WATCHLISTS_FETCH)
    .mergeMap(() => {
      const assets = getRecentWatchlists()
        .filter(Boolean)
        .map(id =>
          Observable.from(
            client.query({
              query: WATCHLIST_QUERY,
              variables: {
                id
              }
            })
          )
        )

      return Observable.forkJoin(...assets).flatMap(res => {
        return Observable.of({
          type: actions.RECENT_WATCHLISTS_FETCH_SUCCESS,
          payload: res
            .map(({ data: { watchlist } }) => watchlist)
            .filter(Boolean)
        })
      })
    })
    .catch(handleErrorAndTriggerAction(actions.RECENT_WATCHLISTS_FETCH_FAILED))

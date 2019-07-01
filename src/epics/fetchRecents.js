import { Observable } from 'rxjs'
import { projectBySlugGQL } from './../pages/Projects/allProjectsGQL'
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
              query: projectBySlugGQL,
              variables: {
                slug
              }
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

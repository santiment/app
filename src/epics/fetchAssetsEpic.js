import * as Sentry from '@sentry/react'
import { Observable } from 'rxjs'
import { WATCHLIST_WITH_TRENDS_AND_SETTINGS_QUERY } from '../queries/WatchlistGQL.js'
import * as actions from './../actions/types'
import { PROJECT } from '../ducks/Watchlists/utils'
import { ERC20_PROJECTS_QUERY } from '../ducks/Watchlists/gql/allProjectsGQL'

const handleError = error => {
  Sentry.captureException(error)
  return Observable.of({ type: actions.ASSETS_FETCH_FAILED, payload: error })
}

const pickProjectsType = type => {
  switch (type) {
    case 'erc20':
      return { projects: 'allErc20Projects', gql: ERC20_PROJECTS_QUERY }
    default: {
      return undefined
    }
  }
}

const extractTablePayload = (store, { watchlist, projects }) => {
  if (watchlist) {
    const { isPublic, user, listItems, stats, isMonitored } = watchlist

    return {
      isMonitored,
      items: listItems.map(asset => asset.project),
      trendingAssets: stats.trendingProjects,
      projectsCount: stats.projectsCount,
      isCurrentUserTheAuthor: store.getState().user.data.id === user.id,
      isPublicWatchlist: isPublic
    }
  }

  if (projects) {
    return {
      items: projects,
      projectsCount: projects.length
    }
  }
}

export const fetchAssetsFromListEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.ASSETS_FETCH)
    .filter(({ payload: { type } }) => {
      return (
        type === PROJECT ||
        type === 'list' ||
        type === 'list#shared' ||
        pickProjectsType(type)
      )
    })
    .mergeMap(({ payload: { list, filters, type } }) => {
      const picked = pickProjectsType(type)
      const query = picked
        ? picked.gql
        : WATCHLIST_WITH_TRENDS_AND_SETTINGS_QUERY

      return Observable.from(
        client.watchQuery({
          query: query,
          variables: { id: list.id, filters, minVolume: 0 },
          context: { isRetriable: true },
          fetchPolicy: 'network-only'
        })
      )
        .concatMap(({ data }) => {
          const watchlist = data.watchlist
          if (!(data.watchlist || data.projects)) {
            return Observable.of({
              type: actions.ASSETS_FETCH_SUCCESS,
              payload: {}
            })
          }

          const { settings, id } = watchlist || {}
          const { watchlistsSettings } = store.getState().watchlistUi

          const payload = extractTablePayload(store, data)

          if (settings && !watchlistsSettings[id]) {
            const { tableColumns = {}, pageSize } = settings
            return Observable.from([
              { type: actions.ASSETS_FETCH_SUCCESS, payload },
              {
                type: actions.WATCHLIST_SETTINGS_SAVE_SUCCESS,
                payload: {
                  key: id,
                  hiddenColumns: tableColumns.hiddenColumns,
                  sorting: tableColumns.sorting,
                  pageSize
                }
              }
            ])
          }
          return Observable.of({ type: actions.ASSETS_FETCH_SUCCESS, payload })
        })
        .catch(handleError)
    })

export const fetchAssetsFromListWithEditEpic = action$ =>
  action$
    .ofType(actions.ASSETS_FETCH_SUCCESS)
    .filter(({ payload: { isCurrentUserTheAuthor } }) => isCurrentUserTheAuthor)
    .switchMap(() =>
      action$
        .ofType(actions.USER_EDIT_ASSETS_IN_LIST_SUCCESS)
        .filter(
          ({ payload: { assetsListId, currentId } }) =>
            assetsListId === currentId
        )
        .mergeMap(({ payload: { assetsListId } }) =>
          Observable.of({
            type: actions.ASSETS_FETCH,
            payload: { type: 'list', list: { id: assetsListId } }
          })
        )
    )

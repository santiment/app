import * as Sentry from '@sentry/react'
import { Observable } from 'rxjs'
import {
  ERC20_PROJECTS_QUERY,
  allProjects50GQL,
  allProjectsGQL
} from './../ducks/Watchlists/gql/allProjectsGQL'
import { WATCHLIST_WITH_TRENDS_AND_SETTINGS_QUERY } from '../queries/WatchlistGQL.js'
import * as actions from './../actions/types'

const handleError = error => {
  Sentry.captureException(error)
  return Observable.of({ type: actions.ASSETS_FETCH_FAILED, payload: error })
}

const fetchAssets$ = ({ type = 'all', client, filters = {} }) =>
  Observable.from(
    client.query({
      query: pickProjectsType(type).gql,
      variables: {
        minVolume: filters.minVolume ? filters.minVolume : 0,
        page: filters.page,
        pageSize: filters.pageSize
      },
      context: { isRetriable: true }
    })
  )

const pickProjectsType = type => {
  switch (type) {
    case 'all':
      return { projects: 'allProjects', gql: allProjects50GQL }
    case 'restAll':
      return { projects: 'allProjects', gql: allProjectsGQL }
    case 'erc20':
      return { projects: 'allErc20Projects', gql: ERC20_PROJECTS_QUERY }
    default:
      return { projects: 'allProjects', gql: allProjectsGQL }
  }
}

const mapDataToAssets = ({
  type,
  filters = {},
  data: { loading, error, data }
}) => {
  const items = !error ? data[pickProjectsType(type).projects] : []
  const isEmpty = items.length === 0
  return {
    isLoading: loading,
    isEmpty,
    filters,
    items,
    error,
    isPublicWatchlist: true
  }
}

export const fetchAssetsEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.ASSETS_FETCH)
    .filter(
      ({ payload: { type } }) => type !== 'list' && type !== 'list#shared'
    )
    .mergeMap(({ payload: { type, filters } }) =>
      fetchAssets$({ type, client, filters })
        .exhaustMap(data =>
          Observable.of({
            type: actions.ASSETS_FETCH_SUCCESS,
            payload: {
              ...mapDataToAssets({ type, data, filters }),
              first50: type === 'all'
            }
          })
        )
        .catch(handleError)
    )

export const fetchRestAllAssetsEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.ASSETS_FETCH_SUCCESS)
    .filter(({ payload: { first50 } }) => !!first50)
    .mergeMap(({ payload: { type, filters } }) =>
      fetchAssets$({ type: 'restAll', client, filters })
        .exhaustMap(data =>
          Observable.of({
            type: actions.ASSETS_FETCH_SUCCESS,
            payload: mapDataToAssets({ type, data, filters })
          })
        )
        .catch(handleError)
    )

export const fetchAssetsFromListEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.ASSETS_FETCH)
    .filter(
      ({ payload: { type } }) => type === 'list' || type === 'list#shared'
    )
    .mergeMap(({ payload: { list, filters } }) => {
      return Observable.from(
        client.watchQuery({
          query: WATCHLIST_WITH_TRENDS_AND_SETTINGS_QUERY,
          variables: { id: list.id, filters },
          context: { isRetriable: true },
          fetchPolicy: 'network-only'
        })
      )
        .concatMap(({ data }) => {
          const watchlist = data.watchlist

          if (!watchlist) {
            return Observable.of({
              type: actions.ASSETS_FETCH_SUCCESS,
              payload: {}
            })
          }

          const {
            isPublic,
            user,
            settings,
            listItems,
            stats,
            id,
            isMonitored
          } = watchlist
          const { watchlistsSettings } = store.getState().watchlistUi
          const payload = {
            isMonitored,
            items: listItems.map(asset => asset.project),
            trendingAssets: stats.trendingProjects,
            projectsCount: stats.projectsCount,
            isCurrentUserTheAuthor: store.getState().user.data.id === user.id,
            isPublicWatchlist: isPublic
          }

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

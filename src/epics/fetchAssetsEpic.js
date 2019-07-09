import Raven from 'raven-js'
import { Observable } from 'rxjs'
import {
  allErc20ProjectsGQL,
  allProjects50GQL,
  allProjectsGQL,
  currenciesGQL
} from './../pages/Projects/allProjectsGQL'
import {
  PROJECTS_BY_FUNCTION_BIG_QUERY,
  WATCHLIST_QUERY
} from '../queries/WatchlistGQL.js'
import * as actions from './../actions/types'

const handleError = error => {
  Raven.captureException(error)
  return Observable.of({ type: actions.ASSETS_FETCH_FAILED, payload: error })
}

const fetchAssets$ = ({ type = 'all', client, filters = {} }) =>
  Observable.from(
    client.query({
      query: pickProjectsType(type).gql,
      variables: { minVolume: filters.minVolume ? filters.minVolume : 0 },
      context: { isRetriable: true }
    })
  )

const pickProjectsType = type => {
  switch (type) {
    case 'all':
      return { projects: 'allProjects', gql: allProjects50GQL }
    case 'restAll':
      return { projects: 'allProjects', gql: allProjectsGQL }
    case 'currency':
      return { projects: 'allCurrencyProjects', gql: currenciesGQL }
    case 'erc20':
      return { projects: 'allErc20Projects', gql: allErc20ProjectsGQL }
    default:
      return { projects: 'allProjects', gql: allProjectsGQL }
  }
}

const mapDataToAssets = ({ type, data: { loading, error, data } }) => {
  const items = !error ? data[pickProjectsType(type).projects] : []
  const isEmpty = items.length === 0
  return { isLoading: loading, isEmpty, items, error, isPublicWatchlist: true }
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
              ...mapDataToAssets({ type, data }),
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
            payload: mapDataToAssets({ type, data })
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
    .mergeMap(({ payload: { list } }) => {
      return Observable.from(
        client.watchQuery({
          query: list.function
            ? PROJECTS_BY_FUNCTION_BIG_QUERY
            : WATCHLIST_QUERY,
          variables: list.function
            ? { function: list.function }
            : { id: list.id },
          context: { isRetriable: true },
          fetchPolicy: 'network-only'
        })
      ).concatMap(({ data }) => {
        const { watchlist } = data
        if (!watchlist && !list.function) {
          return Observable.of({
            type: actions.ASSETS_FETCH_SUCCESS,
            payload: {
              items: [],
              isCurrentUserTheAuthor: false,
              isLoading: false,
              error: false,
              isPublicWatchlist: false
            }
          })
        }

        const { allProjectsByFunction } = data

        const items = list.function
          ? allProjectsByFunction
          : watchlist.listItems.map(asset => asset.project)
        const isCurrentUserTheAuthor =
          !list.function && store.getState().user.data.id === watchlist.user.id

        return Observable.of({
          type: actions.ASSETS_FETCH_SUCCESS,
          payload: {
            items,
            isCurrentUserTheAuthor,
            isLoading: false,
            error: false,
            isPublicWatchlist: list.function || watchlist.isPublic
          }
        }).catch(handleError)
      })
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

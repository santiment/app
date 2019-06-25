import Raven from 'raven-js'
import { Observable } from 'rxjs'
import {
  allErc20ProjectsGQL,
  allProjects50GQL,
  allProjectsGQL,
  currenciesGQL,
  projectBySlugGQL
} from './../pages/Projects/allProjectsGQL'
import {
  projectsByFunctionGQL,
  publicWatchlistGQL,
  WATCHLIST_QUERY
} from './../components/WatchlistPopup/WatchlistGQL.js'
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
  return { isLoading: loading, isEmpty, items, error }
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
    .filter(({ payload: { type } }) => type === 'list')
    .mergeMap(({ payload: { list } }) => {
      console.log('list: ', list)
      return Observable.from(
        client.query({
          query: WATCHLIST_QUERY,
          variables: { id: list.id },
          context: { isRetriable: true }
        })
      ).concatMap(({ data: { watchlist } }) => {
        console.log(watchlist)
        if (!watchlist) {
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

        const { listItems = [], user: { id } = {}, isPublic } = watchlist
        const items = listItems.map(asset => asset.project)
        const isCurrentUserTheAuthor = store.getState().user.data.id === id

        return Observable.of({
          type: actions.ASSETS_FETCH_SUCCESS,
          payload: {
            items,
            isCurrentUserTheAuthor,
            isLoading: false,
            error: false,
            isPublicWatchlist: isPublic
          }
        }).catch(handleError)
      })
    })

export const fetchAssetsFromListWithEditEpic = action$ =>
  action$
    .ofType(actions.ASSETS_FETCH_SUCCESS)
    .filter(
      ({ payload: { isCurrentUserTheAuthor } }) =>
        isCurrentUserTheAuthor === true
    )
    .switchMap(() =>
      action$
        .ofType(actions.USER_EDIT_ASSETS_IN_LIST_SUCCESS)
        .mergeMap(({ payload: { assetsListId } }) =>
          Observable.of({
            type: actions.ASSETS_FETCH,
            payload: { type: 'list', list: { id: assetsListId } }
          })
        )
    )

export const fetchAssetsFromSharedListEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.ASSETS_FETCH)
    .filter(
      ({ payload: { type, list } }) => type === 'list#shared' && !list.function
    )
    .mergeMap(({ payload: { list } }) =>
      Observable.from(client.query({ query: publicWatchlistGQL })).concatMap(
        ({ data: { fetchAllPublicUserLists } }) => {
          const { listItems = [] } =
            fetchAllPublicUserLists.find(({ id }) => id === list.id) || {}
          const queries = listItems
            .map(asset => asset.project.slug)
            .filter(slug => !!slug)
            .map(slug =>
              client.query({
                query: projectBySlugGQL,
                variables: { slug },
                context: { isRetriable: true }
              })
            )

          if (listItems.length === 0) {
            return Observable.of({
              type: actions.ASSETS_FETCH_SUCCESS,
              payload: { items: [], isLoading: false, error: false }
            })
          }

          return Observable.forkJoin(queries)
            .mergeMap(data => {
              const items = data.map(project => project.data.projectBySlug)
              return Observable.of({
                type: actions.ASSETS_FETCH_SUCCESS,
                payload: { items, isLoading: false, error: false }
              })
            })
            .catch(handleError)
        }
      )
    )

export const fetchAssetsFromListWithFuncEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.ASSETS_FETCH)
    .filter(
      ({ payload: { type, list } }) => type === 'list#shared' && list.function
    )
    .mergeMap(({ payload: { list } }) =>
      Observable.from(
        client.query({
          query: projectsByFunctionGQL,
          variables: { function: list.function }
        })
      ).concatMap(({ data: { allProjectsByFunction = [] } }) => {
        const queries = allProjectsByFunction
          .filter(({ slug }) => !!slug)
          .map(({ slug }) =>
            client.query({
              query: projectBySlugGQL,
              variables: { slug },
              context: { isRetriable: true }
            })
          )

        if (allProjectsByFunction.length === 0) {
          return Observable.of({
            type: actions.ASSETS_FETCH_SUCCESS,
            payload: { items: [], isLoading: false, error: false }
          })
        }

        return Observable.forkJoin(queries)
          .mergeMap(data => {
            const items = data.map(project => project.data.projectBySlug)
            return Observable.of({
              type: actions.ASSETS_FETCH_SUCCESS,
              payload: { items, isLoading: false, error: false }
            })
          })
          .catch(handleError)
      })
    )

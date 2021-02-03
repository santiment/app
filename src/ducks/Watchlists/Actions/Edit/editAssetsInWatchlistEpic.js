import { Observable } from 'rxjs'
import * as actions from '../../../../actions/types'
import { handleErrorAndTriggerAction } from '../../../../epics/utils'
import { updateWatchlistGQL } from './updateWatchlistQGL'
import {
  ALL_WATCHLISTS_QUERY,
  PROJECTS_WATCHLIST_QUERY
} from '../../../../queries/WatchlistGQL'

export const editAssetsInWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_EDIT_ASSETS_IN_LIST)
    .mergeMap(({ payload: { assetsListId, currentId, listItems = [] } }) => {
      const normalizedListItems = listItems.map(val => ({
        project_id: +val.id
      }))
      const watchlistUpdate = client.mutate({
        mutation: updateWatchlistGQL,
        variables: { id: +assetsListId, listItems: normalizedListItems }
      })
      return Observable.from(watchlistUpdate)
        .mergeMap(() =>
          Observable.of({
            type: actions.USER_EDIT_ASSETS_IN_LIST_SUCCESS,
            payload: { listItems, assetsListId, currentId }
          })
        )
        .catch(
          handleErrorAndTriggerAction(actions.USER_EDIT_ASSETS_IN_LIST_FAILED)
        )
    })

export const addAssetToWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_ADD_ASSET_TO_LIST)
    .mergeMap(({ payload: { assetsListId, listItems = [], projectId } }) => {
      const normalizedList = listItems.map(val => ({ project_id: +val.id }))
      const newListItems = projectId
        ? [...normalizedList, { project_id: +projectId }]
        : normalizedList

      const watchlistUpdate = client.mutate({
        mutation: updateWatchlistGQL,
        variables: { id: +assetsListId, listItems: newListItems },
        update: (store, { data: { updateWatchlist } }) => {
          const data = store.readQuery({ query: PROJECTS_WATCHLIST_QUERY })
          const index = data.fetchWatchlists.findIndex(
            ({ id }) => id === updateWatchlist.id
          )
          data.fetchWatchlists[index] = updateWatchlist
          store.writeQuery({ query: PROJECTS_WATCHLIST_QUERY, data })
        }
      })
      return Observable.from(watchlistUpdate)
        .mergeMap(() =>
          Observable.of({
            type: actions.USER_ADD_ASSET_TO_LIST_SUCCESS,
            payload: { projectId, assetsListId }
          })
        )
        .catch(
          handleErrorAndTriggerAction(actions.USER_ADD_ASSET_TO_LIST_FAILED)
        )
    })

export const removeAssetFromWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_REMOVE_ASSET_FROM_LIST)
    .mergeMap(({ payload: { assetsListId, listItems = [], projectId } }) => {
      const newListItems = listItems
        .map(val => ({ project_id: +val.id }))
        .reduce(
          (acc, val) => (val.project_id !== +projectId ? [...acc, val] : acc),
          []
        )
      const mutationPromise = client.mutate({
        mutation: updateWatchlistGQL,
        variables: { listItems: newListItems, id: +assetsListId },
        update: (store, { data: { updateWatchlist } }) => {
          const data = store.readQuery({ query: ALL_WATCHLISTS_QUERY })
          const index = data.fetchWatchlists.findIndex(
            ({ id }) => id === updateWatchlist.id
          )
          data.fetchWatchlists[index] = updateWatchlist
          store.writeQuery({ query: ALL_WATCHLISTS_QUERY, data })
        }
      })
      return Observable.from(mutationPromise)
        .mergeMap(() =>
          Observable.of({
            type: actions.USER_REMOVED_ASSET_FROM_LIST_SUCCESS,
            payload: { projectId, assetsListId }
          })
        )
        .catch(
          handleErrorAndTriggerAction(
            actions.USER_REMOVED_ASSET_FROM_LIST_FAILED
          )
        )
    })

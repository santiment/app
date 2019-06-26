import Raven from 'raven-js'
import { Observable } from 'rxjs'
import { allWatchlistsGQL, watchlistGQL } from '../WatchlistPopup/WatchlistGQL'
import { updateUserListGQL } from './updateWatchlistQGL'
import * as actions from '../../actions/types'

export const editAssetsInWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_EDIT_ASSETS_IN_LIST)
    .mergeMap(({ payload: { assetsListId, listItems = [] } }) => {
      const normalizedListItems = listItems.map(val => ({
        project_id: +val.id
      }))
      const userListUpdate = client.mutate({
        mutation: updateUserListGQL,
        variables: { id: +assetsListId, listItems: normalizedListItems }
      })
      return Observable.from(userListUpdate)
        .mergeMap(() =>
          Observable.of({
            type: actions.USER_EDIT_ASSETS_IN_LIST_SUCCESS,
            payload: { listItems, assetsListId }
          })
        )
        .catch(error => {
          Raven.captureException(error)
          return Observable.of({
            type: actions.USER_EDIT_ASSETS_IN_LIST_FAILED,
            payload: error
          })
        })
    })

export const addAssetToWatchlistEpic = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_ADD_ASSET_TO_LIST)
    .mergeMap(({ payload: { assetsListId, listItems = [], projectId } }) => {
      const normalizedList = listItems.map(val => ({ project_id: +val.id }))
      const newListItems = projectId
        ? [...normalizedList, { project_id: +projectId }]
        : normalizedList

      const userListUpdate = client.mutate({
        mutation: updateUserListGQL,
        variables: { id: +assetsListId, listItems: newListItems },
        update: (store, { data: { updateUserList } }) => {
          const data = store.readQuery({ query: watchlistGQL })
          const index = data.fetchUserLists.findIndex(
            ({ id }) => id === updateUserList.id
          )
          data.fetchUserLists[index] = updateUserList
          store.writeQuery({ query: watchlistGQL, data })
        }
      })
      return Observable.from(userListUpdate)
        .mergeMap(() =>
          Observable.of({
            type: actions.USER_ADD_ASSET_TO_LIST_SUCCESS,
            payload: { projectId, assetsListId }
          })
        )
        .catch(error => {
          Raven.captureException(error)
          return Observable.of({
            type: actions.USER_ADD_ASSET_TO_LIST_FAILED,
            payload: error
          })
        })
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
        mutation: updateUserListGQL,
        variables: { listItems: newListItems, id: +assetsListId },
        update: (store, { data: { updateUserList } }) => {
          const data = store.readQuery({ query: allWatchlistsGQL })
          const index = data.fetchUserLists.findIndex(
            ({ id }) => id === updateUserList.id
          )
          data.fetchUserLists[index] = updateUserList
          store.writeQuery({ query: allWatchlistsGQL, data })
        }
      })
      return Observable.from(mutationPromise)
        .mergeMap(() =>
          Observable.of({
            type: actions.USER_REMOVED_ASSET_FROM_LIST_SUCCESS,
            payload: { projectId, assetsListId }
          })
        )
        .catch(error => {
          Raven.captureException(error)
          return Observable.of({
            type: actions.USER_REMOVED_ASSET_FROM_LIST_FAILED,
            payload: error
          })
        })
    })

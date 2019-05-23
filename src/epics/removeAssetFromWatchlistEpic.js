import Raven from 'raven-js'
import { Observable } from 'rxjs'
import { WatchlistGQL } from './../components/WatchlistPopup/WatchlistGQL'
import { updateUserListGQL } from './addAssetToWatchlistEpic'
import * as actions from './../actions/types'

const removeAssetFromWatchlist = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_REMOVE_ASSET_FROM_LIST)
    .mergeMap(({ payload: { assetsListId, listItems, projectId } }) => {
      const newListItems = listItems
        .map(val => ({ project_id: +val.project.id }))
        .reduce(
          (acc, val) => (val.project_id !== +projectId ? [...acc, val] : acc),
          []
        )
      const mutationPromise = client.mutate({
        mutation: updateUserListGQL,
        variables: { listItems: newListItems, id: +assetsListId },
        update: (store, { data: { updateUserList } }) => {
          const data = store.readQuery({ query: WatchlistGQL })
          const index = data.fetchUserLists.findIndex(
            ({ id }) => id === updateUserList.id
          )
          data.fetchUserLists[index] = updateUserList
          store.writeQuery({ query: WatchlistGQL, data })
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

export default removeAssetFromWatchlist
